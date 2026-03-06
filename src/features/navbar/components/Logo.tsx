import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link
            to="/"
            className="text-2xl font-bold text-green-700 tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded"
            aria-label="SkillShare Hub Home"
        >
            SkillShare Hub
        </Link>
    );
}
