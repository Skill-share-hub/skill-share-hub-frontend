import { Star, Coins, TrendingUp, Users } from "lucide-react";

interface TutorProfileStatsProps {
    totalCreditsEarned: number;
    ratingsAverage: number;
    reviewCount: number;
    earningsTotal: number;
}

export default function TutorProfileStats({
    totalCreditsEarned,
    ratingsAverage,
    reviewCount,
    earningsTotal,
}: TutorProfileStatsProps) {
    const stats = [
        {
            title: "Average Rating",
            value: ratingsAverage.toFixed(1),
            icon: <Star className="w-5 h-5 text-amber-500" />,
            bgColor: "bg-amber-50",
            description: "Based on all student reviews"
        },
        {
            title: "Total Reviews",
            value: reviewCount.toLocaleString(),
            icon: <Users className="w-5 h-5 text-blue-500" />,
            bgColor: "bg-blue-50",
            description: "Active student feedback"
        },
        {
            title: "Credits Earned",
            value: totalCreditsEarned.toLocaleString(),
            icon: <Coins className="w-5 h-5 text-emerald-500" />,
            bgColor: "bg-emerald-50",
            description: "From credit-based student enrollments"
        },
        {
            title: "Lifetime Earnings",
            value: `$${earningsTotal.toLocaleString()}`,
            icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
            bgColor: "bg-purple-50",
            description: "Total revenue from paid courses"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                    <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                        {/* Minimal line chart representation or indicator */}
                        <div className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                            +12%
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-400 mt-2 font-medium">{stat.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
