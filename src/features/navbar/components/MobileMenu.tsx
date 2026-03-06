import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { useAppDispatch } from "../../../shared/hooks/redux";
import { setUserLogout } from "../../auth/authSlice";
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

    const handleLogout = () => {
        dispatch(setUserLogout());
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-sm md:hidden overflow-hidden origin-top"
                >
                    <div className="p-6 flex flex-col gap-4">
                        <NavLinks user={user} isMobile={true} onMobileClick={onClose} />

                        <AuthButtons user={user} isMobile={true} />

                        {user && (
                            <>
                                <div className="h-px bg-gray-100 my-2"></div>
                                <Link onClick={onClose} to="/profile" className="flex items-center gap-3 text-gray-700 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 px-2 rounded">
                                    <User className="w-5 h-5" /> Profile
                                </Link>
                                <Link onClick={onClose} to="/settings" className="flex items-center gap-3 text-gray-700 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 px-2 rounded">
                                    <Settings className="w-5 h-5" /> Settings
                                </Link>
                                <button onClick={handleLogout} className="flex items-center gap-3 text-red-600 text-left py-2 focus:outline-none focus:ring-2 focus:ring-green-600 px-2 rounded">
                                    <LogOut className="w-5 h-5" /> Logout
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
