import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import TutorProfileHeader from "../components/TutorProfileHeader";
import TutorProfileStats from "../components/TutorProfileStats";
import TutorProfileAbout from "../components/TutorProfileAbout";
import FullScreenLoader from "../../../../shared/components/FullScreenLoader";
import { BookOpen } from "lucide-react";

export default function TutorProfilePage() {
    const { user, loading } = useSelector((state: RootState) => state.user);

    if (loading) return <FullScreenLoader />;

    if (!user || (!user.tutorProfile && user.role !== 'tutor' && user.role !== 'premiumTutor')) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
                <p className="text-gray-500">We couldn't load the tutor profile data.</p>
            </div>
        );
    }

   
    const profile = user.tutorProfile || {
        createdCourses: [],
        bio: "Passionate educator dedicated to sharing knowledge and building skills.",
        skills: [],
        totalCreditsEarned: 0,
        monetizationEligible: false,
        ratingsAverage: 0.0,
        reviewCount: 0,
        earningsTotal: 0
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full min-h-screen bg-gray-50">
            {/* Page Heading */}
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">My Profile</h1>

            {/* Header Section */}
            <TutorProfileHeader
                name={user.name}
                avatarUrl={user.avatarUrl}
                email={user.email}
                role={user.role}
                isVerified={user.isVerified}
                createdAt={user.createdAt || new Date().toISOString()}
            />

            {/* Stats Section */}
            <TutorProfileStats
                totalCreditsEarned={profile.totalCreditsEarned}
                ratingsAverage={profile.ratingsAverage}
                reviewCount={profile.reviewCount}
                earningsTotal={profile.earningsTotal}
            />

            {/* About & Skills Section */}
            <TutorProfileAbout
                bio={profile.bio}
                skills={profile.skills}
            />

            {/* Courses Section Placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-500" />
                        Created Courses
                    </h3>
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-semibold">
                        {profile.createdCourses?.length || 0} Total
                    </span>
                </div>

                {profile.createdCourses && profile.createdCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Render courses here when populated */}
                        <div className="text-gray-500 italic">Courses mapping goes here...</div>
                    </div>
                ) : (
                    <div className="py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                        <BookOpen className="w-12 h-12 text-gray-300 mb-4" />
                        <h4 className="text-lg font-bold text-gray-700 mb-1">No Courses Yet</h4>
                        <p className="text-sm text-gray-500 font-medium">You haven't published any courses on your profile.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
