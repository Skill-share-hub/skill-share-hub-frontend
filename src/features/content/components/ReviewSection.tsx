import React, { useEffect, useState } from 'react';
import { Star, Send, Edit, Trash2, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { reviewService, type ReviewResponse } from '../../courses/services/reviewService';

interface ReviewSectionProps {
  courseId: string;
  isSidebar?: boolean;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ courseId, isSidebar }) => {
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const fetchUserReview = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getUserReview(courseId);
      if (data) {
        setReview(data);
        setRating(data.rating);
        setReviewText(data.reviewText);
      } else {
        setReview(null);
      }
    } catch (error) {
      console.error("Failed to fetch review", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReview();
  }, [courseId]);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      setSubmitting(true);
      if (review && isEditing) {
        const updated = await reviewService.updateReview(courseId, { rating, reviewText });
        setReview(updated);
        setIsEditing(false);
        toast.success("Review updated successfully");
      } else {
        const created = await reviewService.createReview({ courseId, rating, reviewText });
        setReview(created);
        toast.success("Review submitted successfully");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;

    try {
      setSubmitting(true);
      await reviewService.deleteReview(courseId);
      setReview(null);
      setRating(0);
      setReviewText("");
      setIsEditing(false);
      toast.success("Review deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
      </div>
    );
  }

  // View State: Already submitted and NOT editing
  if (review && !isEditing) {
    return (
      <div className={`items-center justify-center animate-in fade-in duration-500 ${isSidebar ? 'mt-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm' : 'mt-8 p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm'}`}>
        <div className={`flex flex-col justify-between gap-6 ${isSidebar ? 'gap-4' : 'md:flex-row md:items-center'}`}>
          <div className={`${isSidebar ? 'space-y-3' : 'space-y-4'}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-emerald-50 text-emerald-600 rounded-xl ${isSidebar ? 'p-1.5' : ''}`}>
                <CheckCircle2 size={isSidebar ? 18 : 24} />
              </div>
              <h3 className={`font-bold text-gray-900 ${isSidebar ? 'text-sm' : 'text-xl'}`}>
                {isSidebar ? 'Successfully Reviewed' : 'Your review has been submitted'}
              </h3>
            </div>

            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={isSidebar ? 14 : 20}
                  className={star <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}
                />
              ))}
              {!isSidebar && (
                <span className="ml-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Rated {review.rating} out of 5
                </span>
              )}
            </div>

            <p className={`text-gray-600 italic leading-relaxed bg-white/50 p-4 rounded-2xl border border-gray-100 ${isSidebar ? 'text-xs p-3' : 'max-w-2xl'}`}>
              "{review.reviewText}"
            </p>
          </div>

          <div className={`flex gap-3 ${isSidebar ? 'flex-row' : 'flex-row md:flex-col'}`}>
            <button
              onClick={() => setIsEditing(true)}
              className={`flex items-center justify-center gap-2 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg shadow-gray-200 ${isSidebar ? 'flex-1 py-2 text-xs rounded-xl' : 'flex-1 md:flex-none px-6 py-3'}`}
            >
              <Edit size={isSidebar ? 14 : 18} /> Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={submitting}
              className={`flex items-center justify-center gap-2 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all ${isSidebar ? 'flex-1 py-2 text-xs rounded-xl bg-gray-200 text-gray-600' : 'flex-1 md:flex-none px-6 py-3 bg-red-50 text-red-600'}`}
            >
              <Trash2 size={isSidebar ? 14 : 18} /> {submitting ? "..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Form State: New review or Editing
  return (
    <div className={`items-center justify-center shadow-sm animate-in slide-in-from-bottom-6 duration-500 ${isSidebar ? 'mt-4 p-5 bg-white border border-gray-200 rounded-3xl' : 'mt-8 p-8 bg-white border border-gray-200 rounded-[2.5rem]'}`}>
      <div className={`${isSidebar ? 'max-w-full' : 'max-w-3xl'}`}>
        <div className={`flex items-center gap-3 ${isSidebar ? 'mb-4' : 'mb-8'}`}>
          {!isSidebar && (
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <MessageSquare size={24} />
            </div>
          )}
          <div>
            <h3 className={`font-black text-gray-900 tracking-tight ${isSidebar ? 'text-base' : 'text-2xl'}`}>
              {isEditing ? "Edit Your Review" : "Rate this Course"}
            </h3>
            {!isSidebar && <p className="text-gray-500 font-medium italic">Your feedback helps thousands of students learn better.</p>}
          </div>
        </div>

        <div className={`space-y-6 ${isSidebar ? 'space-y-4' : ''}`}>
          {/* Star Selection */}
          <div className="space-y-3">
            <label className={`font-black text-gray-400 uppercase tracking-widest pl-1 ${isSidebar ? 'text-[10px]' : 'text-xs'}`}>Overall Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-90 hover:scale-110"
                >
                  <Star
                    size={isSidebar ? 24 : 36}
                    className={`transition-all duration-200 ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400 shadow-amber-200/50"
                        : "text-gray-200"
                    }`}
                  />
                </button>
              ))}
              {!isSidebar && rating > 0 && (
                <span className="ml-4 text-lg font-black text-amber-500 animate-in zoom-in duration-300">
                  {['Terrible', 'Bad', 'Average', 'Very Good', 'Amazing'][rating - 1]}
                </span>
              )}
            </div>
          </div>

          {/* Text Area */}
          <div className="space-y-3">
            <label className={`font-black text-gray-400 uppercase tracking-widest pl-1 ${isSidebar ? 'text-[10px]' : 'text-xs'}`}>Written Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What did you like? What could be improved?"
              className={`w-full bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 placeholder:text-gray-300 focus:bg-white focus:border-blue-500 outline-none transition-all resize-none shadow-inner ${isSidebar ? 'h-24 p-4 text-sm' : 'h-32 p-6 rounded-3xl'}`}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`flex items-center justify-center gap-2 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all hover:-translate-y-1 shadow-xl shadow-gray-200 disabled:opacity-50 disabled:translate-y-0 ${isSidebar ? 'flex-1 py-4 text-sm' : 'px-10 py-5'}`}
            >
              {submitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isEditing ? "Update" : "Submit"} <Send size={isSidebar ? 16 : 20} />
                </>
              )}
            </button>

            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setRating(review?.rating || 0);
                  setReviewText(review?.reviewText || "");
                }}
                className={`text-gray-400 font-bold hover:text-gray-600 transition-colors ${isSidebar ? 'text-xs px-2' : 'px-8 py-5'}`}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
