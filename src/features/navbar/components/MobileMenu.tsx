import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, LogOut, Coins } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { logoutUser } from "../../auth/authThunk";
import LogoutModal from "./LogoutModal";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import type { User as UserType } from "../../../shared/types/user.Type";

interface MobileMenuProps {
    isOpen: boolean;
    user: UserType | null;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, user, onClose }: MobileMenuProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { creditBalance } = useAppSelector(state => state.wallet);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutConfirm = () => {
        dispatch(logoutUser()).then(() => {
            setShowLogoutModal(false);
            onClose();
            navigate('/login');
        });
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-sm md:hidden overflow-hidden origin-top z-[40]"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            {/* User Info & Credits */}
                            {user && (
                                <div className="flex items-center justify-between bg-green-50/50 p-4 rounded-xl mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold overflow-hidden border border-green-200">
                                            {user.avatarUrl ? (
                                                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                user.name.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 leading-tight">{user.name}</p>
                                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                        </div>
                                    </div>
                                    <Link to="/wallet" onClick={onClose} className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-green-100">
                                        <Coins className="w-4 h-4 text-green-600" />
                                        <span className="font-bold text-gray-700">{creditBalance}</span>
                                    </Link>
                                </div>
                            )}

                            <NavLinks user={user} isMobile={true} onMobileClick={onClose} />

                            <AuthButtons user={user} isMobile={true} />

                            {user && (
                                <>
                                    <div className="h-px bg-gray-100 my-2"></div>
                                    
                                    {user.role === 'student' ? (
                                        <Link onClick={onClose} to="/student-profile" className="flex items-center gap-3 text-gray-700 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 px-2 rounded hover:bg-gray-50 transition-colors">
                                            <User className="w-5 h-5" /> Profile
                                        </Link>
                                    ) : (
                                        <Link onClick={onClose} to="/profile" className="flex items-center gap-3 text-gray-700 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 px-2 rounded hover:bg-gray-50 transition-colors">
                                            <User className="w-5 h-5" /> Profile
                                        </Link>
                                    )}

                                    <Link onClick={onClose} to="/settings" className="flex items-center gap-3 text-gray-700 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 px-2 rounded hover:bg-gray-50 transition-colors">
                                        <Settings className="w-5 h-5" /> Settings
                                    </Link>
                                    
                                    <button 
                                        onClick={() => setShowLogoutModal(true)} 
                                        className="flex items-center gap-3 text-red-600 text-left py-2 focus:outline-none focus:ring-2 focus:ring-green-600 px-2 rounded hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-5 h-5" /> Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <LogoutModal 
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogoutConfirm}
            />
        </>
    );
}
