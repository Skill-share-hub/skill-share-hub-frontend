import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../shared/hooks/redux";
import ProfileModal from "./profileModal/ProfileModal";
import { updateUserProfile } from "../thunk/profile.thunk";
import type { UpdateProfilePayload } from "../types/ProfileModal.types";
import { fetchSuccess } from "../../auth/authSlice";
import type { RootState } from "../../../store/store";

export default function ProfileCompletionWizard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal if user is logged in and profile is NOT completed
    // We also check for 'admin' role because admins usually don't need this modal
    if (user && user.role !== "admin" && user.isProfileCompleted === false) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [user]);

  const handleSubmit = async (payload: UpdateProfilePayload) => {
    const result = await dispatch(updateUserProfile(payload));
    
    if (updateUserProfile.fulfilled.match(result)) {
      // Update the auth user state with the returned user (which has isProfileCompleted: true)
      dispatch(fetchSuccess(result.payload));
      setShowModal(false);
    } else {
      // Let the modal handle the error display
      throw new Error(result.error.message || "Failed to update profile");
    }
  };

  if (!showModal || !user) return null;

  return (
    <ProfileModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      role={user.role as "student" | "tutor" | "premiumTutor"}
      defaultValues={{
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        bio: user.role === "student" ? user.studentProfile?.bio : user.tutorProfile?.bio,
        skills: user.role === "student" ? user.studentProfile?.skills : user.tutorProfile?.skills,
        experience: user.role === "tutor" || user.role === "premiumTutor" ? user.tutorProfile?.experience : "",
      }}
      onSubmit={handleSubmit}
      mode="create"
    />
  );
}
