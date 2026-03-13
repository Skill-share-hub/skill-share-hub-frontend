import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import TutorProfileHeader from "../components/tutor/TutorProfileHeader";
import TutorProfileStats from "../components/tutor/TutorProfileStats";
import TutorProfileAbout from "../components/tutor/TutorProfileAbout";
import FullScreenLoader from "../../../shared/components/FullScreenLoader";
import { BookOpen } from "lucide-react";
import ProfileModal from "../components/profileModal/ProfileModal";
import { useState } from "react";
import type { UpdateProfilePayload } from "../types/ProfileModal.types";
import { fetchSuccess } from "../../auth/authSlice";
import { updateUserProfile } from "../thunk/profile.thunk";

export default function TutorProfilePage() {
    const dispatch = useAppDispatch();
    const { user, loading } = useAppSelector((state) => state.user);
    const [showModal, setShowModal] = useState(false);
 const handleSubmit = async (payload: UpdateProfilePayload) => {
    const result = await dispatch(updateUserProfile(payload));
    
    if (updateUserProfile.fulfilled.match(result)) {
      // Update the auth user state with the returned user (which has isProfileCompleted: true)
      dispatch(fetchSuccess(result.payload));
      setShowModal(false);
    } else {
      // Let the modal handle the error display
      throw new Error(result.error?.message || "Failed to update profile");
    }
  };
    if (loading) return <FullScreenLoader />;

    if (!user || (!user.tutorProfile && user.role !== 'tutor' && user.role !== 'premiumTutor')) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
                <p className="text-gray-500">We couldn't load the tutor profile data.</p>
            </div>
        );
    }

    // Fallback structure matching the backend snippet provided
    const profile = user.tutorProfile || {
        createdCourses: [],
        bio: "Passionate educator dedicated to sharing knowledge and building skills.",
        skills: ["Web Development", "React", "Node.js"],
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

<ProfileModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      role={user.role as "student" | "tutor" | "premiumTutor"}
      defaultValues={{
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        bio: user.tutorProfile?.bio,
        skills: user.tutorProfile?.skills,
        experience: user.tutorProfile?.experience,
      }}
      onSubmit={handleSubmit}
      mode="edit"
    />

            {/* Header Section */}
            <TutorProfileHeader
                name={user.name}
                avatarUrl={user.avatarUrl}
                email={user.email}
                role={user.role}
                isVerified={user.isVerified}
                createdAt={user.createdAt || new Date().toISOString()}
                setShowModal={setShowModal}
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
