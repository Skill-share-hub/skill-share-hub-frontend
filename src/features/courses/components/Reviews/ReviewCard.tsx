import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import type { CourseReview } from '../../types/course.types';
import ReportModal from '../../../reports/components/ReportModal';
import { reportService } from '../../../reports/services/reportService';

interface ReviewCardProps {
  review: CourseReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [hasReportedReview, setHasReportedReview] = useState(false);

  const handleReportClick = async () => {
    if (hasReportedReview) {
      toast('You have already reported this', { icon: '✔' });
      return;
    }
    
    try {
      const isReported = await reportService.checkReviewReport(review._id);
      if (isReported) {
        setHasReportedReview(true);
        toast('You have already reported this', { icon: '✔' });
        return;
      }
    } catch (error) {
      console.error(error);
    }
    
    setIsReportModalOpen(true);
  };

  return (
    <div className="flex gap-3 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-2 rounded-xl">
      {/* Avatar */}
      <img
        src={review.userId.avatarUrl || `https://ui-avatars.com/api/?name=${review.userId.name}&background=047857&color=fff`}
        alt={review.userId.name}
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        
        {/* Top row */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800 truncate pr-2">{review.userId.name}</p>
          <span className="text-xs text-gray-400 shrink-0">{format(new Date(review.createdAt), 'MMM dd, yyyy')}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mt-0.5 text-yellow-500">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={12}
              className={`${star <= review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-200'} shrink-0`}
            />
          ))}
        </div>

        {/* Review text */}
        <p className="text-sm text-gray-600 mt-1.5 line-clamp-2 md:line-clamp-3 leading-relaxed">
          {review.reviewText}
        </p>

        {/* Actions */}
        <div className="flex gap-4 mt-2.5 text-xs text-gray-500">
          {isHelpful ? (
            <span className="font-medium text-emerald-600 transition-all">Helpful!</span>
          ) : (
            <button
              onClick={() => setIsHelpful(true)}
              className="hover:text-emerald-600 transition-colors font-medium"
            >
              Helpful
            </button>
          )}

          <button
            onClick={handleReportClick}
            className={`font-medium transition-colors flex items-center gap-1 ${
              hasReportedReview ? 'text-gray-400 cursor-not-allowed' : 'hover:text-red-500'
            }`}
          >
            {hasReportedReview ? <CheckCircle2 size={12} /> : null}
            {hasReportedReview ? 'Reported' : 'Report'}
          </button>
        </div>
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        type="review"
        targetId={review._id}
        courseId={review.courseId}
        onSuccess={() => setHasReportedReview(true)}
      />
    </div>
  );
};

export default ReviewCard;
