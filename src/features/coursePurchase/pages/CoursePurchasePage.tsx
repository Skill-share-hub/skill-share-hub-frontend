import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { 
  setPaymentMethod,
  setPurchaseSuccess,
  closeSuccessModal,
  resetPurchaseState,
  createPaymentOrder,
  verifyRazorpayPayment,
  purchaseWithCreditsOnly
} from "../redux/purchaseSlice";
import { fetchWalletBalance } from "../../wallet/walletSlice";
import { checkAuth } from "../../auth/authSlice";
import { courseService } from "../../courses/services/courseService";
import { getProfile } from "../../profile/api/profile.api";
import CourseSummaryCard from "../components/CourseSummaryCard";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import PurchaseSummaryPanel from "../components/PurchaseSummaryPanel";
import { loadRazorpayScript } from "../../../shared/utils/razorpay";
import PurchaseSuccessModal from "../components/PurchaseSuccessModal";

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
  const { 
    selectedPaymentMethod, 
    loading: purchaseSliceLoading, 
    paymentStatus,
    showSuccessModal,
    purchasedCourse
  } = useAppSelector((state) => state.purchase);
  
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [isProcessing, setIsProcessing] = useState(false);

  // Load Initial Data
  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) return;
      try {
        setInitialLoading(true);
        const [courseRes, profileRes] = await Promise.all([
          courseService.fetchCourseById(courseId),
          getProfile()
        ]);
        
        setCurrentCourse(courseRes.data);
        setProfile(profileRes);
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

  // Local Calculations
  const coursePrice = useMemo(() => {
    if (!currentCourse) return 0;
    return currentCourse.courseType === "credit" ? (currentCourse.creditCost || 0) : (currentCourse.price || 0);
  }, [currentCourse]);

  const userCredits = profile?.userCreditBalance || 0;

  const creditsApplied = useMemo(() => {
    if (selectedPaymentMethod === "payment") return 0;
    return Math.min(coursePrice, userCredits);
  }, [selectedPaymentMethod, coursePrice, userCredits]);

  const paymentAmount = useMemo(() => {
    return Math.max(0, coursePrice - creditsApplied);
  }, [coursePrice, creditsApplied]);

  const paymentRequired = paymentAmount > 0;

  const handleRazorpayCheckout = async (orderId: string, amount: number) => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      setIsProcessing(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: amount * 100,
      currency: "INR",
      name: "Skill Share Hub",
      description: `Purchase for ${currentCourse?.title}`,
      order_id: orderId,
      handler: async function (response: any) {
        try {
          await dispatch(verifyRazorpayPayment({
            courseId: courseId!,
            creditsUsed: creditsApplied,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })).unwrap();
          
          // SUCCESS! Pack Metadata for Redux Bill
          const metadata = {
            ...currentCourse,
            price: coursePrice,
            creditsUsed: creditsApplied,
            totalPaid: creditsApplied,
            prevBalance: userCredits,
            deducted: creditsApplied,
            remaining: Math.max(0, userCredits - creditsApplied)
          };
          dispatch(setPurchaseSuccess(metadata));
          
          dispatch(fetchWalletBalance());
          (dispatch as any)(checkAuth());
        } catch (err: any) {
          toast.error(err || "Payment verification failed.");
        } finally {
          setIsProcessing(false);
        }
      },
      prefill: {
        name: profile?.name || "",
        email: profile?.email || "",
      },
      theme: { color: "#047857" },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleContinue = useCallback(async () => {
    if (!courseId) return;
    setIsProcessing(true);

    if (!paymentRequired) {
      // 100% Credit Only Purchase
      try {
        await dispatch(purchaseWithCreditsOnly(courseId)).unwrap();
        
        // SUCCESS! Pack Metadata for Redux Bill
        const metadata = {
          ...currentCourse,
          price: coursePrice,
          creditsUsed: creditsApplied,
          totalPaid: creditsApplied,
          prevBalance: userCredits,
          deducted: creditsApplied,
          remaining: Math.max(0, userCredits - creditsApplied)
        };
        dispatch(setPurchaseSuccess(metadata));

        dispatch(fetchWalletBalance());
        (dispatch as any)(checkAuth());
      } catch (err: any) {
        toast.error(err || "Failed to purchase with credits.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Razorpay Flow
      try {
        const orderData = await dispatch(createPaymentOrder(courseId)).unwrap();
        handleRazorpayCheckout(orderData.orderId, orderData.amount);
      } catch (err: any) {
        toast.error(err || "Failed to initialize payment.");
        setIsProcessing(false);
      }
    }
  }, [courseId, paymentRequired, creditsApplied, dispatch, currentCourse, profile, coursePrice, userCredits]);

  const canAffordWithCredits = useMemo(() => {
    if (selectedPaymentMethod === "credit" && currentCourse?.courseType === "credit") {
        return (profile?.userCreditBalance || 0) >= coursePrice;
    }
    return true; 
  }, [coursePrice, selectedPaymentMethod, currentCourse, profile]);

  const continueDisabled = useMemo(() => {
     if (selectedPaymentMethod === "credit" && !canAffordWithCredits) return true;
     return paymentStatus === "processing" || isProcessing;
  }, [selectedPaymentMethod, canAffordWithCredits, paymentStatus, isProcessing]);

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
          
          <div className="lg:col-span-8 flex flex-col">
            <CourseSummaryCard course={currentCourse} />
            <PaymentMethodSelector 
              selectedMethod={selectedPaymentMethod}
              onSelectMethod={(method) => dispatch(setPaymentMethod(method))}
              courseType={currentCourse.courseType as "paid" | "credit"}
              userCredits={profile?.userCreditBalance || 0}
              coursePrice={coursePrice}
              creditsApplied={creditsApplied}
              paymentAmount={paymentAmount}
              canAffordWithCredits={canAffordWithCredits}
            />
          </div>

          <div className="lg:col-span-4 relative">
             <PurchaseSummaryPanel 
               summary={{
                 coursePrice,
                 creditsApplied,
                 paymentAmount,
                 paymentRequired
               } as any}
               loading={purchaseSliceLoading || isProcessing}
               onContinue={handleContinue}
               continueDisabled={continueDisabled}
               buttonLabel={
                 !paymentRequired 
                 ? "Complete Purchase" 
                 : "Continue to Payment"
               }
             />
          </div>
        </div>
      </div>

      <PurchaseSuccessModal 
        isOpen={showSuccessModal}
        course={purchasedCourse}
        onStartNow={() => {
          dispatch(closeSuccessModal());
          navigate(`/my-activity/${courseId}`);
        }}
        onLater={() => {
          dispatch(closeSuccessModal());
          navigate(`/my-activity`);
        }}
        onClose={() => dispatch(closeSuccessModal())}
      />
    </div>
  );
};

export default CoursePurchasePage;
