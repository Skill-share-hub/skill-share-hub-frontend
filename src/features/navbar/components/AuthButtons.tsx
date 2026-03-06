import { Link } from "react-router-dom";
import { Bookmark, Bell } from "lucide-react";
import type { User } from "../../../shared/types/user.Type";

interface AuthButtonsProps {
    user: User | null;
    isMobile?: boolean;
}

export default function AuthButtons({ user, isMobile = false }: AuthButtonsProps) {
    if (!user) {
        return (
            <Link
                to="/login"
                className={`${isMobile ? "mt-2 px-6 py-3 w-full text-center block" : "px-6 py-2.5"} bg-[#145537] hover:bg-green-800/80 text-white font-medium rounded-full shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2`}
                aria-label="Get Started with SkillShare Hub"
            >
                Get Started
            </Link>
        );
    }

    if (isMobile) {
        return (
            <div className="flex gap-4 my-2">
                <button
                    className="flex-1 flex justify-center py-2 bg-gray-50 hover:bg-green-50 rounded-lg text-gray-500 hover:text-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-600"
                    aria-label="Saved Items"
                >
                    <Bookmark className="w-5 h-5" />
                </button>
                <button
                    className="flex-1 flex justify-center py-2 bg-gray-50 hover:bg-green-50 rounded-lg text-gray-500 hover:text-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-600"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 lg:gap-4">
            <button
                className="p-2 text-gray-500 hover:text-green-600 transition bg-gray-50 hover:bg-green-50 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                aria-label="Saved Items"
            >
                <Bookmark className="w-5 h-5" />
            </button>
            <button
                className="p-2 text-gray-500 hover:text-green-600 transition bg-gray-50 hover:bg-green-50 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5" />
            </button>

        </div>
    );
}
