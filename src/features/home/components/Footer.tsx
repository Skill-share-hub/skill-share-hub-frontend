export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center text-gray-500 text-sm">
                &copy; {currentYear} SkillShare Hub. All rights reserved.
            </div>
        </footer>
    );
}
