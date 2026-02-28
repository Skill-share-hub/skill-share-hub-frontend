import type { User } from "../../shared/types/user.Type";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User;
};

const ProfileSetup = ({ user }: Props) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // save profile data
    navigate("/dashboard");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Complete Your Profile</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Bio" />
        <input placeholder="Experience" />

        <button type="submit">Save</button>

        {user.role === "tutor" && (
          <button type="button" onClick={handleSkip}>
            Skip
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileSetup;    