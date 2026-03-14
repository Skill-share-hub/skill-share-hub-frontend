import { Camera, CheckCircle, Edit3 } from "lucide-react";

interface StudentProfileHeaderProps {
  name: string;
  avatarUrl?: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  setShowModal: (val: boolean) => void;
}

export default function StudentProfileHeader({
  name,
  avatarUrl,
  email,
  role,
  isVerified,
  createdAt,
  setShowModal,
}: StudentProfileHeaderProps) {
  const joinedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const roleLabel =
    role === "student"
      ? "Student"
      : role === "tutor"
      ? "Tutor"
      : role === "premiumTutor"
      ? "Premium Tutor"
      : role;

  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500" />

      <div className="px-8 pb-8">
        {/* Avatar + Edit Button row */}
        <div className="flex items-end justify-between -mt-14 mb-4">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-24 h-24 rounded-2xl border-4 border-white shadow-md object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{initials}</span>
              </div>
            )}
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border border-gray-200 shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Camera className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-sm transition-colors border border-green-200"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Name + Meta */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{name}</h2>
            {isVerified && (
              <CheckCircle className="w-5 h-5 text-green-500 fill-green-100" />
            )}
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              {roleLabel}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">{email}</p>
          <p className="text-gray-400 text-xs mt-1 font-medium">Member since {joinedDate}</p>
        </div>
      </div>
    </div>
  );
}