import { BadgeCheck, Calendar, Mail, Award } from "lucide-react";

interface TutorProfileHeaderProps {
    name: string;
    avatarUrl?: string;
    email: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    setShowModal:(value: boolean) => void
}

export default function TutorProfileHeader({
    name,
    avatarUrl,
    email,
    role,
    isVerified,
    createdAt,
    setShowModal
}: TutorProfileHeaderProps) {

    const joinDate = new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
            {/* Cover subtle gradient */}
            <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500 w-full relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:flex sm:items-end sm:space-x-8 -mt-16">
                {/* Avatar */}
                <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg bg-gray-100 flex-shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=" + name})` }}>
                    {isVerified && (
                        <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-sm">
                            <BadgeCheck className="w-6 h-6 text-emerald-500" />
                        </div>
                    )}
                </div>

                {/* Profile Info */}
                <div className="mt-6 sm:mt-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full capitalize border border-green-100 uppercase tracking-wider">
                                {role.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-3 text-sm text-gray-600 font-medium">
                            <div className="flex items-center gap-1.5">
                                <Mail className="w-4 h-4 text-gray-400" />
                                {email}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                Joined {joinDate}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-amber-500" />
                                Top Educator
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-0">
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
