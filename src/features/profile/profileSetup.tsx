import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { useAppSelector } from "../../shared/hooks/redux";
import { useAppDispatch } from "../../shared/hooks/redux";
import { checkAuth } from "../profile/userSlice";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    fullName: "",
    bio: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return <Navigate to="/login" replace />;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/users/profile", form);
      await dispatch(checkAuth());
      navigate("/dashboard");
    } catch {
      setError("Profile update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-2">
          Complete Your Profile
        </h1>

        <p className="text-gray-500 text-sm text-center mb-6">
          Help others know more about you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <textarea
              name="bio"
              placeholder="Short Bio"
              value={form.bio}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
            />
          </div>

          <div>
            <input
              name="experience"
              placeholder="Experience"
              value={form.experience}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 active:scale-95"
            }`}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

          {user.role === "tutor" && (
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full text-sm text-gray-500 hover:underline text-center"
            >
              Skip for now
            </button>
          )}

        </form>
      </div>
    </div>
  );
}