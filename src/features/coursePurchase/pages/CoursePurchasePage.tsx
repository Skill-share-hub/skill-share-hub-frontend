import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { 
  fetchPurchaseSummary, 
  setPaymentMethod,
  resetPurchaseState,
  createPaymentOrder,
  verifyRazorpayPayment,
  purchaseWithCreditsOnly
} from "../redux/purchaseSlice";
import { fetchWalletBalance } from "../../wallet/walletSlice";
import { courseService } from "../../courses/services/courseService";
import { getProfie } from "../../profile/api/profile.api";
import CourseSummaryCard from "../components/CourseSummaryCard";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import PurchaseSummaryPanel from "../components/PurchaseSummaryPanel";
import { loadRazorpayScript } from "../../../shared/utils/razorpay";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CoursePurchasePage: React.FC = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Selectors
  const { summary, selectedPaymentMethod, loading, paymentStatus } = useAppSelector((state) => state.purchase);
  
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load Initial Data
  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) return;
      try {
        setInitialLoading(true);
        const [courseRes, profileRes] = await Promise.all([
          courseService.fetchCourseById(courseId),
          getProfie()
        ]);
        setCurrentCourse(courseRes.data);
        setProfile(profileRes); // The API unwraps it returning user directly
      } catch (err) {
        toast.error("Failed to load checkout details");
        navigate("/courses");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();

    // Cleanup
    return () => {
      dispatch(resetPurchaseState());
    };
  }, [dispatch, courseId, navigate]);

  // Handle Summary Re-calculation on Payment Method Change
  useEffect(() => {
    if (courseId && currentCourse) {
      dispatch(fetchPurchaseSummary({ courseId, paymentMethod: selectedPaymentMethod }));
    }
  }, [dispatch, courseId, selectedPaymentMethod, currentCourse]);

  const handleRazorpayCheckout = async (orderId: string, amount: number) => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: amount * 100, // paise
      currency: "INR",
      name: "Skill Share Hub",
      description: `Purchase for ${currentCourse?.title}`,
      order_id: orderId,
      handler: async function (response: any) {
        try {
          await dispatch(verifyRazorpayPayment({
            courseId: courseId!,
            creditsUsed: summary?.creditsApplied || 0,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })).unwrap();
          
          dispatch(fetchWalletBalance());
          toast.success("Payment successful! You are now enrolled.");
          navigate(`/course-overview/${courseId}`);
        } catch (err: any) {
          toast.error(err || "Payment verification failed.");
        }
      },
      prefill: {
        name: profile?.name || "",
        email: profile?.email || "",
      },
      theme: { color: "#047857" } // emerald-700
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      toast.error(response.error.description || "Payment failed.");
    });
    paymentObject.open();
  };

  const handleContinue = useCallback(async () => {
    if (!courseId) return;

    if (!summary?.paymentRequired) {
      // 100% Credit Only Purchase
      try {
        await dispatch(purchaseWithCreditsOnly(courseId)).unwrap();
        dispatch(fetchWalletBalance());
        toast.success("Successfully enrolled using credits!");
        navigate(`/course-overview/${courseId}`);
      } catch (err: any) {
        toast.error(err || "Failed to purchase with credits.");
      }
    } else {
      // Razorpay Checkout Flow (Direct Payment or Mixed)
      try {
        const orderData = await dispatch(createPaymentOrder(courseId)).unwrap();
        handleRazorpayCheckout(orderData.orderId, orderData.amount);
      } catch (err: any) {
        toast.error(err || "Failed to initialize payment.");
      }
    }
  }, [courseId, summary, dispatch, navigate, currentCourse, profile]);

  const canAffordWithCredits = useMemo(() => {
    if (!summary) return true;
    if (selectedPaymentMethod === "credit" && currentCourse?.courseType === "credit") {
        return (profile?.userCreditBalance || 0) >= summary.creditsApplied;
    }
    return true; // Other methods either process Razorpay or don't hard-require full credit balance match
  }, [summary, selectedPaymentMethod, currentCourse, profile]);

  const continueDisabled = useMemo(() => {
     if (selectedPaymentMethod === "credit" && !canAffordWithCredits) return true;
     return paymentStatus === "processing";
  }, [selectedPaymentMethod, canAffordWithCredits, paymentStatus]);

  if (initialLoading || !currentCourse) {
    return (
      <div className="flex justify-center flex-col items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-emerald-800 font-semibold">Preparing secure checkout...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - 70% */}
          <div className="lg:col-span-8 flex flex-col">
            <CourseSummaryCard course={currentCourse} />
            <PaymentMethodSelector 
              selectedMethod={selectedPaymentMethod}
              onSelectMethod={(method) => dispatch(setPaymentMethod(method))}
              courseType={currentCourse.courseType as "paid" | "credit"}
              userCredits={profile?.userCreditBalance || 0}
              coursePrice={summary?.coursePrice || 0}
              creditsApplied={summary?.creditsApplied || 0}
              paymentAmount={summary?.paymentAmount || 0}
              canAffordWithCredits={canAffordWithCredits}
            />
          </div>

          {/* Right Column - 30% */}
          <div className="lg:col-span-4 relative">
             <PurchaseSummaryPanel 
               summary={summary}
               loading={loading}
               onContinue={handleContinue}
               continueDisabled={continueDisabled}
               buttonLabel={
                 !summary?.paymentRequired 
                 ? "Complete Purchase" 
                 : "Continue to Payment"
               }
             />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CoursePurchasePage;
