import { FileText, Zap, Heart } from "lucide-react";

interface StudentProfileAboutProps {
  bio?: string;
  skills?: string[];
  interests?: string[];
}

const SKILL_COLORS = [
  "bg-green-50 text-green-700 border-green-200",
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-teal-50 text-teal-700 border-teal-200",
  "bg-lime-50 text-lime-700 border-lime-200",
  "bg-cyan-50 text-cyan-700 border-cyan-200",
];

const INTEREST_COLORS = [
  "bg-rose-50 text-rose-700 border-rose-200",
  "bg-orange-50 text-orange-700 border-orange-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-teal-50 text-teal-700 border-teal-200",
];

export default function StudentProfileAbout({
  bio,
  skills = [],
  interests = [],
}: StudentProfileAboutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Bio */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
            <FileText className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900">About Me</h3>
        </div>
        {bio ? (
          <p className="text-gray-600 leading-relaxed text-sm break-words whitespace-pre-wrap">{bio}</p>
        ) : (
          <p className="text-gray-400 italic text-sm">
            No bio added yet. Tell others about yourself!
          </p>
        )}
      </div>

      {/* Skills & Interests stacked */}
      <div className="flex flex-col gap-6">
        {/* Skills */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Skills</h3>
          </div>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={skill}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                    SKILL_COLORS[idx % SKILL_COLORS.length]
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-xs">No skills added yet.</p>
          )}
        </div>

        {/* Interests */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Interests</h3>
          </div>
          {interests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, idx) => (
                <span
                  key={interest}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                    INTEREST_COLORS[idx % INTEREST_COLORS.length]
                  }`}
                >
                  {interest}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-xs">No interests added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}