import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

interface NavbarContainerProps {
    children: React.ReactNode;
}

export default function NavbarContainer({ children }: NavbarContainerProps) {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;

        // Hide navbar if scrolling down and past 100px
        if (latest > previous && latest > 100) {
            setHidden(true);
        } else {
            setHidden(false); // Show when scrolling up
        }

        // Apply blur and shadow if scrolled past 20px
        if (latest > 20) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
                    : "bg-white py-3 md:py-4"
                } px-4 md:px-8 lg:px-12`}
        >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {children}
            </div>
        </motion.nav>
    );
}
