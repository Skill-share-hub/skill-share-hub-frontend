import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { useAppSelector } from "../../shared/hooks/redux";

type ProfileForm = {
  fullName: string;
  bio: string;
  experience: string;
};

export default function ProfileSetup() {
  const navigate = useNavigate();
  const role = useAppSelector((state) => state.user.role);

  const [form, setForm] = useState<ProfileForm>({
    fullName: "",
    bio: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If no role → user not authenticated
  if (!role) {
    navigate("/login");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await api.post("/users/profile", form);

      navigate("/dashboard");
    } catch (err) {
      setError("Profile update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold mb-2 text-center">
          Complete Your Profile
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Help others know more about you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#145537]"
            required
          />

          <textarea
            name="bio"
            placeholder="Short Bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#145537]"
            required
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g. 3 years in React)"
            value={form.experience}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#145537]"
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#145537] hover:bg-[#0f3f2a] active:scale-95"
            }`}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

          {role === "tutor" && (
            <button
              type="button"
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:underline text-center"
            >
              Skip for now
            </button>
          )}

        </form>
      </div>
    </div>
  );
}