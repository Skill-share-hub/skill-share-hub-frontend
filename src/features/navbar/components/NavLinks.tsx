import { NavLink } from "react-router-dom";
import type { User } from "../../../shared/types/user.Type";

interface NavLinksProps {
    user: User | null;
    isMobile?: boolean;
    onMobileClick?: () => void;
}

export default function NavLinks({ user, isMobile = false, onMobileClick }: NavLinksProps) {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);

        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            if (onMobileClick) onMobileClick();
        } else {
            window.location.href = `/${href}`;
        }
    };

    const getLinkClass = ({ isActive }: { isActive: boolean }) => {
        const baseClass = isMobile ? "block py-2 px-2 rounded focus:outline-none" : "px-2 pb-1 focus:outline-none transition-colors duration-200 mt-1";

        if (isActive) {
            return `${baseClass} text-green-600 font-medium ${!isMobile ? 'border-b-2 border-green-600' : ''}`;
        }
        return `${baseClass} text-gray-600 hover:text-green-500`;
    };

    return (
        <>
            {!user ? (
                <>
                    <a href="#hero" onClick={scrollToSection} className={getLinkClass({ isActive: false })}>Home</a>
                    <NavLink onClick={onMobileClick} to="/courses" className={getLinkClass}>Courses</NavLink>
                    <a href="#about" onClick={scrollToSection} className={getLinkClass({ isActive: false })}>About</a>
                    <a href="#contact" onClick={scrollToSection} className={getLinkClass({ isActive: false })}>Contact</a>
                </>
            ) : user.role === 'student' ? (
                <>
                    <NavLink onClick={onMobileClick} to="/dashboard" className={getLinkClass}>Dashboard</NavLink>
                    <NavLink onClick={onMobileClick} to="/courses" className={getLinkClass}>Courses</NavLink>
                    <NavLink onClick={onMobileClick} to="/my-activity" className={getLinkClass}>My Activity</NavLink>
                    <NavLink onClick={onMobileClick} to="/credit-management" className={getLinkClass}>Wallet</NavLink>
                </>
            ) : (user.role === 'tutor' || user.role === 'premiumTutor') ? (
                <>
                    <NavLink onClick={onMobileClick} to="/dashboard" className={getLinkClass}>Dashboard</NavLink>
                    <NavLink onClick={onMobileClick} to="/my-activity" className={getLinkClass}>My Activity</NavLink>
                    <NavLink onClick={onMobileClick} to="/credit-management" className={getLinkClass}>Wallet</NavLink>
                </>
            ) : user.role === 'admin' ? (
                <>
                    <NavLink onClick={onMobileClick} to="/admin" className={getLinkClass}>Dashboard</NavLink>
                    <NavLink onClick={onMobileClick} to="/users" className={getLinkClass}>Users</NavLink>
                    <NavLink onClick={onMobileClick} to="/reports" className={getLinkClass}>Reports</NavLink>
                </>
            ) : null}
        </>
    );
}
