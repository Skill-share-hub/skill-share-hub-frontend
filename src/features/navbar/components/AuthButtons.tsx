import { Link } from "react-router-dom";
import { Bookmark, Bell, Plus } from "lucide-react";
import type { User } from "../../../shared/types/user.Type";
import ProfileMenu from "./ProfileMenu";

interface AuthButtonsProps {
    user: User | null;
    isMobile?: boolean;
}

export default function AuthButtons({ user, isMobile = false }: AuthButtonsProps) {
    const currentCredits = (user as any)?.credits || 0;

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
            {(user.role === 'student' || user.role === 'tutor' || user.role === 'premiumTutor') && (
                <span className="text-gray-600 font-bold px-2 py-1 bg-green-50 rounded-lg whitespace-nowrap hidden lg:inline-block">Credits: {currentCredits}</span>
            )}

            {user.role === 'tutor' || user.role === 'premiumTutor' ? (
                <Link
                    to="/create-course"
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95"
                >
                    <Plus size={16} strokeWidth={3} />
                    <span className="hidden lg:inline">Create Course</span>
                </Link>
            ) : (
                <button
                    className="p-2 text-gray-500 hover:text-green-600 transition bg-gray-50 hover:bg-green-50 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                    aria-label="Saved Items"
                >
                    <Bookmark className="w-5 h-5" />
                </button>
            )}

            <button
                className="p-2 text-gray-500 hover:text-green-600 transition bg-gray-50 hover:bg-green-50 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 relative"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
            <ProfileMenu />
        </div>
    );
}
