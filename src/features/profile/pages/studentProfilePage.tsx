import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import FullScreenLoader from "../../../shared/components/FullScreenLoader";
import ProfileModal from "../components/profileModal/ProfileModal";
import StudentProfileHeader from "../components/student/Studentprofileheader";
import StudentProfileStats from "../components/student/StudentProfileStats";
import StudentProfileAbout from "../components/student/StudentProfileAbout";
import StudentProfileCourses from "../components/student/StudentProfileCourses";
import { fetchSuccess } from "../../auth/authSlice";
import { fetchUserProfile, updateUserProfile } from "../thunk/profile.thunk";
import type { UpdateProfilePayload } from "../types/ProfileModal.types";

export default function StudentProfilePage() {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.profile);
  
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleSubmit = async (payload: UpdateProfilePayload) => {
    const result = await dispatch(updateUserProfile(payload));

    if (updateUserProfile.fulfilled.match(result)) {
      dispatch(fetchSuccess(result.payload));
      setShowModal(false);
    } else {
      throw new Error(result.error?.message || "Failed to update profile");
    }
  };

  if (loading) return <FullScreenLoader />;
console.log("userData",profile)
  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
        <p className="text-gray-500">We couldn't load your profile data.</p>
      </div>
    );
  }

  const studentProfile = profile.studentProfile || {
    bio: "",
    skills: [],
    interests: [],
  };

  // These would come from enrolled courses data in a real app
  // Pass actual enrolled course data here when available
  const enrolledCourses = []; // e.g. from profile.enrolledCourses or a separate selector

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full min-h-screen bg-gray-50">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">My Profile</h1>

      {/* Edit Profile Modal */}
      <ProfileModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        role={profile.role as "student" | "tutor" | "premiumTutor"}
        defaultValues={{
          name: profile.name,
          email: profile.email,
          avatarUrl: profile.avatarUrl,
          bio: profile.studentProfile?.bio,
          skills: profile.studentProfile?.skills,
          interests: profile.studentProfile?.interests,
        }}
        onSubmit={handleSubmit}
        mode="edit"
      />

      {/* Header */}
      <StudentProfileHeader
        name={profile.name}
        avatarUrl={profile.avatarUrl}
        email={profile.email}
        role={profile.role}
        isVerified={profile.isVerified}
        createdAt={profile.createdAt?.toString() || new Date().toISOString()}
        setShowModal={setShowModal}
      />

      {/* Stats */}
      <StudentProfileStats
        enrolledCourses={enrolledCourses.length}
        completedCourses={0}   // Replace with real data
        hoursLearned={0}       // Replace with real data
        streak={0}             // Replace with real data
      />

      {/* About, Skills, Interests */}
      <StudentProfileAbout
        bio={studentProfile.bio}
        skills={studentProfile.skills}
        interests={studentProfile.interests}
      />

      {/* Enrolled Courses */}
      <StudentProfileCourses courses={enrolledCourses} />
    </div>
  );
}