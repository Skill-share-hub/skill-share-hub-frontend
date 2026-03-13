import {
    FaLinkedinIn,
    FaXTwitter,
    FaInstagram,
    FaYoutube,
    FaGraduationCap,
} from "react-icons/fa6";

export default function Footer() {
    const year = new Date().getFullYear();

    const links = {
        Company: ["About Us", "Careers", "Blog", "Contact Us"],
        Learning: ["Browse Courses", "Categories", "Learning Paths", "Certifications"],
        Support: ["Help Center", "FAQ", "Report an Issue", "Contact Support"],
        Legal: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Refund Policy"],
    };

    const socials = [
        { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
        { icon: <FaXTwitter />, href: "#", label: "Twitter / X" },
        { icon: <FaInstagram />, href: "#", label: "Instagram" },
        { icon: <FaYoutube />, href: "#", label: "YouTube" },
    ];

    return (
        <footer className="bg-gray-950 text-gray-400 mt-16 border-t border-gray-800">

            {/* Top section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-14 pb-10 grid grid-cols-1 md:grid-cols-5 gap-10">

                {/* Brand col */}
                <div className="md:col-span-1 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-white">
                        <FaGraduationCap className="text-emerald-500 text-2xl" />
                        <span className="text-lg font-semibold tracking-tight">
                            SkillShare<span className="text-emerald-500">Hub</span>
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-500">
                        Learn practical skills from real people. Grow your career with community-driven education.
                    </p>
                </div>

                {/* Link columns */}
                {Object.entries(links).map(([section, items]) => (
                    <div key={section}>
                        <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
                            {section}
                        </h3>
                        <ul className="space-y-2.5">
                            {items.map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-500 hover:text-emerald-400 transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>

            {/* Divider */}
            <div className="border-t border-gray-800" />

            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

                <p className="text-xs text-gray-600">
                    © {year} SkillShare Hub. All rights reserved.
                </p>

                <div className="flex items-center gap-3">
                    {socials.map(({ icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 text-gray-500 hover:border-emerald-500 hover:text-emerald-400 transition-all duration-200 text-sm"
                        >
                            {icon}
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    );
}