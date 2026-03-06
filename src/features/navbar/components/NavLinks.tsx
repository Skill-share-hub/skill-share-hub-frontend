import { Link } from "react-router-dom";
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

    const linkBaseClass = isMobile
        ? "text-gray-600 hover:text-green-600 font-medium z-10 cursor-pointer block py-2 focus:outline-none focus:ring-2 focus:ring-green-600 px-2 rounded"
        : "hover:text-green-600 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 px-2 rounded";

    return (
        <>
            {!user ? (
                <>
                    <a href="#hero" onClick={scrollToSection} className={linkBaseClass}>Home</a>
                    <Link onClick={onMobileClick} to="/explore" className={linkBaseClass}>Explore</Link>
                    <a href="#about" onClick={scrollToSection} className={linkBaseClass}>About</a>
                    <a href="#contact" onClick={scrollToSection} className={linkBaseClass}>Contact</a>
                </>
            ) : (
                <>
                    <a href="#hero" onClick={scrollToSection} className={linkBaseClass}>Home</a>
                    <Link onClick={onMobileClick} to="/dashboard" className={linkBaseClass}>Courses</Link>
                    <Link onClick={onMobileClick} to="/activity" className={linkBaseClass}>My Activity</Link>
                </>
            )}
        </>
    );
}
