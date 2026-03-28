import React from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { setPage } from "../slice/application.slice";

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { meta, loading } = useAppSelector((s) => s.applications);
  const { page, totalPages, total, limit } = meta;

  if (totalPages <= 1 && total === 0) return null;

  const from = Math.min((page - 1) * limit + 1, total);
  const to = Math.min(page * limit, total);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between p-4 md:px-5 md:py-4 border-t border-dark-borderLight flex-wrap gap-3">
      <span className="text-xs text-dark-textMuted">
        Showing <span className="font-medium text-dark-textSecondary">{from}–{to}</span> of <span className="font-medium text-dark-textSecondary">{total}</span>
      </span>

      <div className="flex gap-1.5 items-center">
        <button
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1 || loading}
          className={`px-3 py-1.5 bg-transparent border border-dark-border rounded-lg text-dark-textDim text-xs min-w-[36px] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-dark-accentBlueBorder hover:text-dark-accentBlueText`}
        >
          Prev
        </button>

        <div className="flex gap-1">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => dispatch(setPage(p))}
              disabled={loading}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all min-w-[36px] ${
                p === page 
                  ? "bg-dark-accentBlueDark border border-dark-accentBlueBorder text-dark-accentBlueText" 
                  : "bg-transparent border border-dark-border text-dark-textDim hover:border-dark-accentBlueBorder hover:text-dark-accentBlueText"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page === totalPages || loading}
          className={`px-3 py-1.5 bg-transparent border border-dark-border rounded-lg text-dark-textDim text-xs min-w-[36px] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-dark-accentBlueBorder hover:text-dark-accentBlueText`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;