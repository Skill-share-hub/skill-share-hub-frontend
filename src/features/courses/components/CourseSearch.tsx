import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { setSearch } from "../slice/courseSlice";
import { useDebounce } from "use-debounce";

export default function CourseSearch() {
  const dispatch = useAppDispatch();
  const currentSearch = useAppSelector((state) => state.courses.search);

  const [localSearch, setLocalSearch] = useState(currentSearch);
  const [debouncedSearch] = useDebounce(localSearch, 400);

  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      dispatch(setSearch(debouncedSearch));
    }
  }, [debouncedSearch, dispatch, currentSearch]);

  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">

      {/* Search Icon */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Search courses, skills, tutors..."
        className="
        w-full
        pl-11 pr-10 py-3
        rounded-full
        border border-gray-200
        bg-white
        text-gray-900
        placeholder:text-gray-400
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-green-600
        focus:border-green-600
        transition
        "
      />

      {/* Clear Button */}
      {localSearch && (
        <button
          onClick={() => setLocalSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}