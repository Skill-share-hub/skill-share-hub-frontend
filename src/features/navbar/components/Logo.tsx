import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Logo() {
    return (
        <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-green-700 tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded"
            aria-label="SkillShare Hub Home"
        >
            <div className="p-1.5 bg-green-100 rounded-lg">
               <BookOpen className="w-6 h-6 text-green-700" />
            </div>
            SkillShare Hub
        </Link>
    );
}
