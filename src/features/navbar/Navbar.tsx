import { useState } from "react";
import { useAppSelector } from "../../shared/hooks/redux";
import { Menu, X } from "lucide-react";
import NavbarContainer from "./components/NavbarContainer";
import Logo from "./components/Logo";
import NavLinks from "./components/NavLinks";
import AuthButtons from "./components/AuthButtons";
import MobileMenu from "./components/MobileMenu";

export default function Navbar() {
    const { user } = useAppSelector((state) => state.user);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <NavbarContainer>
            {/* Left: Logo */}
            <Logo />

            {/* Center: Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 font-medium">
                <NavLinks user={user} />
            </div>

            {/* Right: Desktop Actions */}
            <div className="hidden md:flex items-center">
                <AuthButtons user={user} />
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
                className="md:hidden p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600 rounded"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isMobileMenuOpen}
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu Dropdown */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                user={user}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </NavbarContainer>
    );
}
