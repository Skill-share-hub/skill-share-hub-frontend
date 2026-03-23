import { BookOpen, Briefcase } from "lucide-react";

interface TutorProfileAboutProps {
    bio: string;
    skills: string[];
    experience?: string;
}

export default function TutorProfileAbout({ bio, skills, experience }: TutorProfileAboutProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Bio Section */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-green-600" />
                        About Me
                    </h3>
                    {bio ? (
                        <p className="text-gray-600 leading-relaxed font-medium break-words whitespace-pre-wrap">
                            {bio}
                        </p>
                    ) : (
                        <div className="p-6 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                            <p className="text-gray-400 italic font-medium">No bio provided yet.</p>
                        </div>
                    )}
                </div>

                {experience && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-green-600" />
                            Professional Experience
                        </h3>
                        <p className="text-gray-600 leading-relaxed font-medium break-words whitespace-pre-wrap">
                            {experience}
                        </p>
                    </div>
                )}
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    Expertise & Skills
                </h3>

                {skills && skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2.5">
                        {skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-4 py-1.5 bg-green-50 text-green-700 font-semibold text-sm rounded-lg border border-green-100 transition-colors hover:bg-green-100 hover:text-green-800"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                        <p className="text-gray-400 italic font-medium">No skills added.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
