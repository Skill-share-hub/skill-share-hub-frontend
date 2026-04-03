import React, { useEffect, useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import api from '../../../../shared/services/axios';
import handleError from '../../../../shared/services/handleError';
import type { CourseReview } from '../../types/course.types';
import ReviewCard from './ReviewCard';

interface ReviewListProps {
  courseId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ courseId }) => {
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/courses/${courseId}/reviews`);
        console.log("Reviews data:", data);
        if (data.success) {
          setReviews(data.data.reviews || []);
          setAvgRating(data.data.averageRating || 0);
          setTotalReviews(data.data.totalReviews || 0);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchReviews();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* 1. HEADER (TOP SUMMARY) */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-1.5 text-yellow-500">
          <Star size={20} className="fill-yellow-500" />
          <span className="text-xl font-bold text-gray-900">{avgRating.toFixed(1)}</span>
        </div>
        <span className="text-gray-500 text-sm">
          ({totalReviews} review{totalReviews !== 1 && 's'})
        </span>
      </div>

      {/* 2. REVIEW LIST */}
      {!reviews || reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-sm">
          No reviews yet. Be the first to review this course.
        </div>
      ) : (
        <div className="flex flex-col">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
