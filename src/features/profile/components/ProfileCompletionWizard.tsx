import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../shared/hooks/redux";
import ProfileModal from "./profileModal/ProfileModal";
import { updateUserProfile } from "../thunk/profile.thunk";
import type { UpdateProfilePayload } from "../types/ProfileModal.types";
import { fetchSuccess } from "../../auth/authSlice";
import type { RootState } from "../../../store/store";

const WIZARD_DISMISSED_KEY = (userId: string) => `profile_wizard_dismissed_${userId}`;

export default function ProfileCompletionWizard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user || user.role === "admin") {
      setShowModal(false);
      return;
    }

    // Check if the user has already dismissed the wizard (persisted across refreshes)
    const alreadyDismissed = localStorage.getItem(WIZARD_DISMISSED_KEY(user._id));

    if (user.isProfileCompleted === false && !alreadyDismissed) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [user]);

  const handleClose = () => {
    if (user) {
      // Mark as dismissed so it doesn't reopen on refresh
      localStorage.setItem(WIZARD_DISMISSED_KEY(user._id), "true");
    }
    setShowModal(false);
  };

  const handleSubmit = async (payload: UpdateProfilePayload) => {
    try {
      const result = await dispatch(updateUserProfile(payload));

      if (updateUserProfile.fulfilled.match(result)) {
        // Mark as dismissed since profile was successfully completed
        if (user) {
          localStorage.setItem(WIZARD_DISMISSED_KEY(user._id), "true");
        }
        dispatch(fetchSuccess(result.payload));
      } else {
        throw new Error(result.error?.message || "Failed to update profile");
      }
    } catch (error) {
      throw error;
    }
  };

  if (!showModal || !user) return null;

  return (
    <ProfileModal
      isOpen={showModal}
      onClose={handleClose}
      role={user.role as "student" | "tutor" | "premiumTutor"}
      defaultValues={{
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        bio: user.role === "student" ? user.studentProfile?.bio : user.tutorProfile?.bio,
        skills: user.role === "student" ? user.studentProfile?.skills : user.tutorProfile?.skills,
        interests: user.role === "student" ? user.studentProfile?.interests : [],
        experience: user.role === "tutor" || user.role === "premiumTutor" ? user.tutorProfile?.experience : "",
      }}
      onSubmit={handleSubmit}
      mode="create"
    />
  );
}
