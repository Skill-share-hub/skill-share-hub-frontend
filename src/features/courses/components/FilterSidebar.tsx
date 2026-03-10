import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux';
import { setFilters, clearFilters } from '../slice/courseSlice';
import type { CourseFilters } from '../types/course.types';
import { SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Design',
  'Business',
  'AI & Machine Learning',
  'Marketing'
];

export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.courses.filters);

  const handleFilterChange = (key: keyof CourseFilters, value: any) => {
    dispatch(setFilters({ [key]: value }));
  };

  const hasActiveFilters = Object.values(filters).some(
    (val) => val !== undefined && val !== ''
  );

  return (
    <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sticky top-24 h-fit">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center font-semibold text-gray-900">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => dispatch(clearFilters())}
            className="flex items-center text-xs text-gray-500 hover:text-red-500 transition"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">

        {/* Category */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
            Category
          </h3>

          <div className="space-y-2 text-sm">

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={!filters.category}
                onChange={() => handleFilterChange('category', '')}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600"
              />
              <span className="ml-2 text-gray-700">All Categories</span>
            </label>

            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600"
                />
                <span className="ml-2 text-gray-700">{cat}</span>
              </label>
            ))}

          </div>
        </div>

        {/* Course Type */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
            Course Type
          </h3>

          <div className="space-y-2 text-sm">

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceType"
                checked={!filters.priceType}
                onChange={() => handleFilterChange('priceType', '')}
                className="w-4 h-4 text-green-600 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Any Type</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceType"
                value="paid"
                checked={filters.priceType === 'paid'}
                onChange={(e) => handleFilterChange('priceType', e.target.value)}
                className="w-4 h-4 text-green-600 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Paid</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priceType"
                value="credit"
                checked={filters.priceType === 'credit'}
                onChange={(e) => handleFilterChange('priceType', e.target.value)}
                className="w-4 h-4 text-purple-600 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Credit Based</span>
            </label>

          </div>
        </div>

        {/* Price Range */}
        {filters.priceType === 'paid' && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Price
            </h3>

            <select
              value={filters.priceRange || ''}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full text-sm rounded-md border-gray-300 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Any Price</option>
              <option value="0-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200+">Over $200</option>
            </select>
          </div>
        )}

        {/* Credit Range */}
        {filters.priceType === 'credit' && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Credits
            </h3>

            <select
              value={filters.creditRange || ''}
              onChange={(e) => handleFilterChange('creditRange', e.target.value)}
              className="w-full text-sm rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Any Credits</option>
              <option value="0-20">0 - 20 Credits</option>
              <option value="20-50">20 - 50 Credits</option>
              <option value="50+">50+ Credits</option>
            </select>
          </div>
        )}

        {/* Rating */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
            Rating
          </h3>

          <div className="space-y-2 text-sm">
            {[4.5, 4, 3.5, 3].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating.toString()}
                  checked={filters.rating === rating.toString()}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-4 h-4 text-green-600 border-gray-300"
                />
                <span className="ml-2 text-gray-700">{rating}+ stars</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}