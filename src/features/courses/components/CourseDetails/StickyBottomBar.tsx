import React from 'react';
import { Loader2 } from 'lucide-react';

interface StickyBottomBarProps {
  isEnrolled: boolean;
  isLoading: boolean;
  price: number;
  creditCost: number;
  courseType: 'credit' | 'paid';
  onEnroll: () => void;
}

const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ 
  isEnrolled, 
  isLoading, 
  price, 
  creditCost, 
  courseType, 
  onEnroll 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-50 lg:hidden flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-gray-900">
            {isEnrolled ? "Owned" : (courseType === 'credit' ? creditCost : `$${price || 49}`)}
          </span>
          {!isEnrolled && courseType === 'credit' && (
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest translate-y-[-2px]">Credits</span>
          )}
        </div>
        {!isEnrolled && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Enroll now</p>}
      </div>
      
      <button
        onClick={onEnroll}
        disabled={isLoading}
        className="px-10 h-12 bg-gray-900 text-white font-bold text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          isEnrolled ? "Access" : "Enroll"
        )}
      </button>
    </div>
  );
};

export default StickyBottomBar;
