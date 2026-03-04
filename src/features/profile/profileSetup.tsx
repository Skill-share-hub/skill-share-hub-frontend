
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { useAppSelector, useAppDispatch } from "../../shared/hooks/redux";
import { checkAuth } from "../profile/userSlice";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [form, setForm] = useState({
    role: "",
    fullName: "",
    bio: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);
    setError(null);

    try {
      const payload: Record<string, unknown> = {
        name: form.fullName,
        role: form.role,
      };

      if (form.role === "student") {
        payload.studentProfile = {
          bio: form.bio,
          skills: [],
        };
      }

      if (form.role === "tutor") {
        payload.tutorProfile = {
          bio: form.bio,
          experience: form.experience,
          skills: [],
        };
      }

      await api.put("/users/profile", payload);

      await dispatch(checkAuth());

      navigate("/dashboard");
    } catch {
      setError("Profile update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if(!user){
    navigate('/login');
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-64 bg-green-700"></div>

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 text-center">

        {/* Avatar */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
            <span className="text-4xl font-bold text-green-700">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
        </div>

        <div className="mt-20">
          <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
          <p className="text-gray-500 mt-2 capitalize">{user?.role}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, role: "student" }))
                }
                className={`p-6 rounded-2xl border text-center transition transform hover:scale-105 ${
                  form.role === "student"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <div className="text-3xl mb-2">🚸</div>
                <h3 className="font-semibold text-lg">Student</h3>
                <p className="text-sm text-gray-500">Learn new skills</p>
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, role: "tutor" }))
                }
                className={`p-6 rounded-2xl border text-center transition transform hover:scale-105 ${
                  form.role === "tutor"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <div className="text-3xl mb-2">🎓</div>
                <h3 className="font-semibold text-lg">Tutor</h3>
                <p className="text-sm text-gray-500">Teach & earn</p>
              </button>

            </div>

            {/* Full Name */}
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {/* Bio */}
            <textarea
              name="bio"
              placeholder="Short Bio"
              value={form.bio}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
            />

            {/* Experience (Tutor only) */}
            {form.role === "tutor" && (
              <input
                name="experience"
                placeholder="Teaching Experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            )}

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-full font-semibold text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-800"
                }`}
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>

              {form.role === "tutor" && (
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Skip for now
                </button>
              )}

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
