import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { setUserLogout, switchRole } from "../../auth/authSlice";

export default function ProfileMenu() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        dispatch(setUserLogout());
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-200 transition focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="User Profile Menu"
            >
                <User className="w-5 h-5" />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50 origin-top-right transition-all"
                    role="menu"
                    aria-label="Profile actions"
                >
                    <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:bg-gray-50"
                        role="menuitem"
                        onClick={() => setIsOpen(false)}
                    >
                        <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:bg-gray-50"
                        role="menuitem"
                        onClick={() => setIsOpen(false)}
                    >
                        <Settings className="w-4 h-4" /> Settings
                    </Link>
                    {user?.role === 'student' && (
                        <button
                            onClick={() => {
                                dispatch(switchRole('tutor'));
                                setIsOpen(false);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:bg-gray-50 text-left"
                            role="menuitem"
                        >
                            <User className="w-4 h-4" /> Switch to Tutor
                        </button>
                    )}
                    {(user?.role === 'tutor' || user?.role === 'premiumTutor') && (
                        <button
                            onClick={() => {
                                dispatch(switchRole('student'));
                                setIsOpen(false);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:bg-gray-50 text-left"
                            role="menuitem"
                        >
                            <User className="w-4 h-4" /> Switch to Student
                        </button>
                    )}
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition focus:outline-none focus:bg-red-50 text-left"
                        role="menuitem"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            )}
        </div>
    );
}
