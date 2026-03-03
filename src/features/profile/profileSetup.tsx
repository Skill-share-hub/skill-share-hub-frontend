import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { useAppSelector } from "../../shared/hooks/redux";

export default function ProfileSetup() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const [form, setForm] = useState({
    fullName: "",
    bio: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/users/profile", form);
      navigate("/dashboard");
    } catch {
      setError("Profile update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Complete Your Profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          value={form.bio}
          onChange={handleChange}
          required
        />

        <input
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
        />

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>

        {user.role === "tutor" && (
          <button type="button" onClick={() => navigate("/dashboard")}>
            Skip for now
          </button>
        )}
      </form>
    </div>
  );
}