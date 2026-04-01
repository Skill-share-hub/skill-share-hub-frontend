import { useState } from "react";
import { Filter, ChevronDown, LayoutGrid } from "lucide-react";

interface CourseFilterProps {
    categoryFilter: string;
    setCategoryFilter: (val: string) => void;
    typeFilter: string;
    setTypeFilter: (val: "all" | "credit" | "paid") => void;
}

export default function CourseFilter({
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter
}: CourseFilterProps) {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    return (
        <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Category Dropdown */}
            <div className="relative w-full sm:w-auto">
                <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600/20 shadow-sm transition-all"
                >
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-gray-500" />
                        <span>{categoryFilter === 'all' ? 'All Categories' : categoryFilter}</span>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoryOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsCategoryOpen(false)}
                        ></div>
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2">
                            {(["all", "Web Development", "Design", "Marketing", "Data Science", "Business"]).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setCategoryFilter(cat)
                                        setIsCategoryOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${categoryFilter === cat
                                        ? "bg-green-50 text-green-700 font-semibold"
                                        : "text-gray-700 hover:bg-gray-50 font-medium"
                                        }`}
                                >
                                    {cat === 'all' ? 'All Categories' : cat}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Type Select */}
            <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as "all" | "credit" | "paid")}
                className="w-full sm:w-auto px-4 py-2 border-r-8 border-transparent rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/20 shadow-sm outline-none cursor-pointer"
            >
                <option value="all">All Types</option>
                <option value="credit">Free (Credit)</option>
                <option value="paid">Premium (Paid)</option>
            </select>

            <button className="p-2.5 hidden sm:block text-green-700 bg-green-50 border border-green-100 rounded-xl shadow-sm transition-all">
                <LayoutGrid size={18} />
            </button>
        </div>
    );
}
