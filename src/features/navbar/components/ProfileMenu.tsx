import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { setUserLogout } from "../../auth/authSlice";
import { switchRole } from "../../auth/authThunk";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import LogoutModal from "./LogoutModal";

export default function ProfileMenu() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);
    const [isOpen, setIsOpen] = useState(false);
    const [confirmRoleSwitch, setConfirmRoleSwitch] = useState<{
        isOpen: boolean;
        targetRole: 'student' | 'tutor' | null;
    }>({
        isOpen: false,
        targetRole: null,
    });
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogoutConfirm = () => {
        dispatch(logoutUser()).then(() => {
            setShowLogoutModal(false);
            navigate('/login');
        });
    };
    const handleSwitchRole = (role: 'student' | 'tutor') => {
        dispatch(switchRole({ role }));
        navigate('/dashboard');
        setIsOpen(false);
    };

    const triggerRoleSwitch = (role: 'student' | 'tutor') => {
        setConfirmRoleSwitch({ isOpen: true, targetRole: role });
        setIsOpen(false); // Close the menu when dialog opens
    };

    const handleConfirmSwitch = () => {
        if (confirmRoleSwitch.targetRole) {
            handleSwitchRole(confirmRoleSwitch.targetRole);
        }
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
                className="w-10 h-10 rounded-full border-2 border-transparent hover:border-green-200 bg-green-100/80 flex items-center justify-center text-green-700 hover:bg-green-200 transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 overflow-hidden shadow-sm shadow-green-900/5"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="User Profile Menu"
            >
                {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user?.name || "User avatar"} className="w-full h-full object-cover" />
                ) : user?.name ? (
                    <span className="font-bold text-sm select-none">
                        {user.name.charAt(0).toUpperCase()}
                    </span>
                ) : (
                    <User className="w-5 h-5" />
                )}
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50 origin-top-right transition-all"
                    role="menu"
                    aria-label="Profile actions"
                >
                    {(user?.role === 'student') && (
                        <Link
                            to="/student-profile"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:bg-gray-50"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="w-4 h-4" /> Profile
                        </Link>
                    )}
                    {(user?.role === 'tutor' || user?.role === 'premiumTutor') && (
                        <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:bg-gray-50"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="w-4 h-4" /> Profile
                        </Link>
                    )}
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
                                triggerRoleSwitch('tutor');
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
                                triggerRoleSwitch('student');
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
                            setIsOpen(false);
                            setShowLogoutModal(true);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition focus:outline-none focus:bg-red-50 text-left"
                        role="menuitem"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            )}

            <ConfirmDialog
                isOpen={confirmRoleSwitch.isOpen}
                onClose={() => setConfirmRoleSwitch({ ...confirmRoleSwitch, isOpen: false })}
                onConfirm={handleConfirmSwitch}
                title="Switch Account Role?"
                description={`Are you sure you want to switch to the ${confirmRoleSwitch.targetRole || 'selected'} dashboard? You can switch back at any time.`}
                confirmText={`Switch to ${confrmRoleSwitch.targetRole === 'tutor' ? 'Tutor' : 'Student'}`}
            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogoutConfirm}
            />
        </div>
    );
}
