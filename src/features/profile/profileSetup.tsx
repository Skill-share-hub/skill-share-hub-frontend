
// import { useState, useEffect } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import api from "../../shared/services/axios";
// import { useAppSelector, useAppDispatch } from "../../shared/hooks/redux";
// import { checkAuth } from "../profile/userSlice";

// const steps = ["role", "details", "confirm"] as const;
// type Step = (typeof steps)[number];

// // Helper: check if a user's profile is already completed
// const isProfileComplete = (user: any) =>
//   user?.role &&
//   user.role !== "" &&
//   user?.name &&
//   user.name.trim() !== "" &&
//   (user.studentProfile?.bio || user.tutorProfile?.bio);

// export default function ProfileSetup() {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.user.user);

//   const [step, setStep] = useState<Step>("role");
//   const [form, setForm] = useState({
//     role: "",
//     fullName: "",
//     bio: "",
//     experience: "",
//   });
//   const [cvFile, setCvFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [mounted, setMounted] = useState(false);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     // If profile is already complete, pre-fill form with existing data
//     if (user && isProfileComplete(user)) {
//       const bio = user.studentProfile?.bio || user.tutorProfile?.bio || "";
//       const experience = user.tutorProfile?.experience || "";
//       setForm({
//         role: user.role || "",
//         fullName: user.name || "",
//         bio,
//         experience,
//       });
//     }
//   }, []);
//   if (!user) return <Navigate to="/login" replace />;

//   const alreadyComplete = isProfileComplete(user) && !editMode;
//   const stepIndex = steps.indexOf(step);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const payload: Record<string, unknown> = {
//         name: form.fullName,
//         role: form.role,
//       };
//       if (form.role === "student")
//         payload.studentProfile = { bio: form.bio, skills: [] };
//       if (form.role === "tutor")
//         payload.tutorProfile = {
//           bio: form.bio,
//           experience: form.experience,
//           skills: [],
//         };
//       await api.put("/users/profile", payload);
//       await dispatch(checkAuth());
//       navigate("/dashboard");
//     } catch {
//       setError("Profile update failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const canProceed = () => {
//     if (step === "role") return form.role !== "";
//     if (step === "details")
//       return form.fullName.trim() !== "" && form.bio.trim() !== "";
//     return true;
//   };
//   if (!user) {
//     navigate('/login');
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="absolute top-0 left-0 w-full h-64 bg-green-700"></div>

//   const next = () => {
//     if (step === "role") setStep("details");
//       else if (step === "details") setStep("confirm");
//       else handleSubmit();
//   };

//   const back = () => {
//     if (step === "details") setStep("role");
//       else if (step === "confirm") setStep("details");
//   };

//   const enterEditMode = () => {
//         setEditMode(true);
//       setStep("role");
//   };

//       if (alreadyComplete) {
//     const existingBio =
//       user.studentProfile?.bio || user.tutorProfile?.bio || "";
//       const existingExp = user.tutorProfile?.experience || "";

//       return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div
//           className={`w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
//             }`}
//         >
//           {/* Header band */}
//           <div className="bg-green-800 px-8 py-6 flex items-center justify-between">
//             <div>
//               <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-green-300 mb-1">
//                 Profile Setup
//               </p>
//               <h1 className="text-xl font-bold text-white tracking-tight">
//                 Your profile is complete ✓
//               </h1>
//               <p className="text-green-200 text-[13px] mt-1 font-normal">
//                 Looking good! You can edit or continue to your dashboard.
//               </p>
//             </div>
//             {/* Avatar */}
//             <div className="w-14 h-14 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
//               {user.name?.charAt(0).toUpperCase()}
//             </div>
//           </div>

//           {/* Profile summary */}
//           <div className="px-8 py-6">
//             {/* Name + role badge */}
//             <div className="flex items-center justify-between mb-5">
//               <div>
//                 <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">
//                   {user.name}
//                 </h2>
//                 <span className="inline-block mt-1 text-[11px] font-semibold uppercase tracking-widest text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
//                   {user.role}
//                 </span>
//               </div>
//             </div>

//             {/* Details table */}
//             <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden mb-6">
//               <div className="flex gap-4 px-5 py-3.5 border-b border-gray-100">
//                 <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 w-24 pt-0.5 flex-shrink-0">
//                   Bio
//                 </span>
//                 <span className="text-[13.5px] text-gray-700 leading-relaxed">
//                   {existingBio}
//                 </span>
//               </div>
//               {existingExp && (
//                 <div className="flex gap-4 px-5 py-3.5 border-b border-gray-100">
//                   <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 w-24 pt-0.5 flex-shrink-0">
//                     Experience
//                   </span>
//                   <span className="text-[13.5px] text-gray-700">
//                     {existingExp}
//                   </span>
//                 </div>
//               )}
//               <div className="flex gap-4 px-5 py-3.5">
//                 <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 w-24 pt-0.5 flex-shrink-0">
//                   Status
//                 </span>
//                 <span className="flex items-center gap-1.5 text-[13px] text-green-700 font-medium">
//                   <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
//                   Profile Complete
//                 </span>
//               </div>
//             </div>

//             {/* Action buttons */}
//             <div className="flex flex-col gap-3">
//               <button
//                 onClick={enterEditMode}
//                 className="w-full py-3 rounded-xl bg-green-800 hover:bg-green-900 text-white text-[14px] font-semibold transition-colors"
//               >
//                 Edit Profile
//               </button>
//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-[14px] font-medium transition-colors"
//               >
//                 Continue to Dashboard →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       );
//   }

//       /* ─── Setup / Edit Flow ─────────────────────────────────── */
//       return (
//       <div className="min-h-screen bg-green-950 flex items-center justify-center p-6 relative overflow-hidden">
//         {/* Background blobs */}
//         <div className="fixed top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-green-800/30 blur-[80px] pointer-events-none" />
//         <div className="fixed bottom-[-100px] right-[-80px] w-[400px] h-[400px] rounded-full bg-green-900/40 blur-[80px] pointer-events-none" />
//         <div className="fixed top-[40%] left-[60%] w-[300px] h-[300px] rounded-full bg-green-700/20 blur-[80px] pointer-events-none" />

//         <div
//           className={`relative z-10 w-full max-w-[520px] bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//             }`}
//         >
//           {/* ── Top bar ── */}
//           <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 px-9 py-8 relative overflow-hidden">
//             {/* Decorative rings */}
//             <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full border border-white/10" />
//             <div className="absolute bottom-[-80px] right-[20px] w-[160px] h-[160px] rounded-full border border-white/8" />

//             {/* Label */}
//             <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 mb-1.5">
//               {editMode ? "Edit Profile" : "Profile Setup"}
//             </p>

//             {/* Headline */}
//             <h1 className="text-[28px] font-bold text-white tracking-tight leading-tight pr-20">
//               {step === "role" && (
//                 <>
//                   Choose your{" "}
//                   <span className="italic font-light text-green-300">path</span>
//                 </>
//               )}
//               {step === "details" && (
//                 <>
//                   Tell us about{" "}
//                   <span className="italic font-light text-green-300">
//                     yourself
//                   </span>
//                 </>
//               )}
//               {step === "confirm" && (
//                 <>
//                   Looking{" "}
//                   <span className="italic font-light text-green-300">great!</span>
//                 </>
//               )}
//             </h1>

//             {/* Step progress bars */}
//             <div className="flex items-center gap-2 mt-5">
//               {steps.map((s, i) => (
//                 <div
//                   key={s}
//                   className={`h-1 flex-1 rounded-full transition-all duration-400 ${i < stepIndex
//                     ? "bg-green-300"
//                     : i === stepIndex
//                       ? "bg-white"
//                       : "bg-white/25"
//                     }`}
//                 />
//               ))}
//               <span className="text-[11px] text-white/50 font-medium whitespace-nowrap ml-1">
//                 {stepIndex + 1} / {steps.length}
//               </span>
//             </div>

//             {/* Avatar bubble */}
//             <div className="absolute top-7 right-9 w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white text-xl font-bold shadow-lg">
//               {user?.name?.[0]?.toUpperCase() || "U"}
//             </div>
//           </div>

//           {/* ── Body ── */}
//           <div className="px-9 py-8">

//             {/* STEP 1 — Role */}
//             {step === "role" && (
//               <div className="animate-[slideIn_0.3s_ease]">
//                 <h2 className="text-[20px] font-bold text-gray-900 tracking-tight mb-1">
//                   Who are you?
//                 </h2>
//                 <p className="text-[13px] text-gray-400 mb-6">
//                   Your role shapes your entire experience on the platform.
//                 </p>
//                 <div className="grid grid-cols-2 gap-3">
//                   {[
//                     { value: "student", icon: "📖", title: "Student", desc: "Discover & learn new skills" },
//                     { value: "tutor", icon: "🎓", title: "Tutor", desc: "Share expertise & earn" },
//                   ].map((r) => (
//                     <button
//                       key={r.value}
//                       type="button"
//                       onClick={() => setForm((p) => ({ ...p, role: r.value }))}
//                       className={`relative text-center p-6 rounded-2xl border-2 transition-all duration-150 ${form.role === r.value
//                         ? "border-green-700 bg-green-50 shadow-md"
//                         : "border-gray-200 bg-white hover:border-green-400 hover:shadow-sm"
//                         }`}
//                     >
//                       {form.role === r.value && (
//                         <span className="absolute top-2.5 right-3 w-5 h-5 rounded-full bg-green-700 text-white text-[10px] flex items-center justify-center font-bold">
//                           ✓
//                         </span>
//                       )}
//                       <span className="text-3xl block mb-2">{r.icon}</span>
//                       <p className="text-[15px] font-bold text-gray-900 mb-1">
//                         {r.title}
//                       </p>
//                       <p className="text-[12px] text-gray-400">{r.desc}</p>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* STEP 2 — Details */}
//             {step === "details" && (
//               <div className="animate-[slideIn_0.3s_ease]">
//                 <h2 className="text-[20px] font-bold text-gray-900 tracking-tight mb-1">
//                   Your details
//                 </h2>
//                 <p className="text-[13px] text-gray-400 mb-6">
//                   This is how other{" "}
//                   {form.role === "tutor" ? "students" : "tutors"} will know you.
//                 </p>

//                 {/* Full Name */}
//                 <div className="mb-4">
//                   <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
//                     Full Name
//                   </label>
//                   <input
//                     name="fullName"
//                     value={form.fullName}
//                     onChange={handleChange}
//                     placeholder="e.g. Alex Rivera"
//                     autoFocus
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-900 placeholder-gray-300 outline-none focus:border-green-700 focus:ring-4 focus:ring-green-700/8 transition-all"
//                   />
//                 </div>

//                 {/* Bio */}
//                 <div className="mb-4">
//                   <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
//                     Short Bio
//                   </label>
//                   <textarea
//                     name="bio"
//                     value={form.bio}
//                     onChange={handleChange}
//                     rows={3}
//                     placeholder={
//                       form.role === "tutor"
//                         ? "What do you teach and what's your approach?"
//                         : "What are you hoping to learn?"
//                     }
//                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-900 placeholder-gray-300 outline-none focus:border-green-700 focus:ring-4 focus:ring-green-700/8 transition-all resize-none leading-relaxed"
//                   />
//                 </div>

//                 {/* Experience (tutor only) */}
//                 {form.role === "tutor" && (
//                   <div className="mb-4">
//                     <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
//                       Teaching Experience
//                     </label>
//                     <input
//                       name="experience"
//                       value={form.experience}
//                       onChange={handleChange}
//                       placeholder="e.g. 3 years teaching web development"
//                       className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-900 placeholder-gray-300 outline-none focus:border-green-700 focus:ring-4 focus:ring-green-700/8 transition-all"
//                     />
//                   </div>
//                 )}

//                 {/* CV Upload */}
//                 <div>
//                   <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
//                     CV / Resume{" "}
//                     <span className="normal-case tracking-normal font-normal text-gray-300">
//                       — optional
//                     </span>
//                   </label>
//                   <div
//                     className={`relative border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all ${cvFile
//                       ? "border-green-600 bg-green-50"
//                       : "border-gray-200 bg-gray-50 hover:border-green-400 hover:bg-green-50/50"
//                       }`}
//                   >
//                     <input
//                       type="file"
//                       accept=".pdf,.doc,.docx"
//                       onChange={(e) => setCvFile(e.target.files?.[0] || null)}
//                       className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
//                     />
//                     <div className="flex items-center gap-3 pointer-events-none">
//                       <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-lg flex-shrink-0">
//                         {cvFile ? "✅" : "📄"}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-[13.5px] font-medium text-gray-800 truncate">
//                           {cvFile ? cvFile.name : "Upload your CV or résumé"}
//                         </p>
//                         <p className="text-[11.5px] text-gray-400 mt-0.5">
//                           {cvFile
//                             ? `${(cvFile.size / 1024).toFixed(0)} KB · PDF or Word`
//                             : "PDF, DOC, DOCX · max 5 MB"}
//                         </p>
//                       </div>
//                       <span
//                         className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md flex-shrink-0 ${cvFile
//                           ? "bg-green-100 text-green-700"
//                           : "bg-gray-200 text-gray-500"
//                           }`}
//                       >
//                         {cvFile ? "Uploaded" : "Optional"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* STEP 3 — Confirm */}
//             {step === "confirm" && (
//               <div className="animate-[slideIn_0.3s_ease]">
//                 {/* Avatar */}
//                 <div className="w-16 h-16 rounded-full bg-green-800 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
//                   {form.fullName?.[0]?.toUpperCase() ||
//                     user?.name?.[0]?.toUpperCase() ||
//                     "U"}
//                 </div>
//                 <p className="text-center text-[18px] font-bold text-gray-900 tracking-tight">
//                   {form.fullName}
//                 </p>
//                 <p className="text-center text-[12px] text-gray-400 capitalize mt-1 mb-5">
//                   ✦ {form.role}
//                 </p>

//                 {/* Summary table */}
//                 <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
//                   <div className="flex gap-4 px-5 py-3.5 border-b border-gray-100">
//                     <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 w-24 flex-shrink-0 pt-0.5">
//                       Bio
//                     </span>
//                     <span className="text-[13.5px] text-gray-700 leading-relaxed">
//                       {form.bio}
//                     </span>
//                   </div>
//                   {form.role === "tutor" && form.experience && (
//                     <div className="flex gap-4 px-5 py-3.5 border-b border-gray-100">
//                       <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 w-24 flex-shrink-0 pt-0.5">
//                         Experience
//                       </span>
//                       <span className="text-[13.5px] text-gray-700">
//                         {form.experience}
//                       </span>
//                     </div>
//                   )}
//                   {cvFile && (
//                     <div className="flex gap-4 px-5 py-3.5">
//                       <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 w-24 flex-shrink-0 pt-0.5">
//                         CV
//                       </span>
//                       <span className="text-[13.5px] text-gray-700 truncate">
//                         {cvFile.name}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {error && (
//                   <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-600">
//                     ⚠ {error}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ── Footer buttons ── */}
//             <div className="flex gap-3 mt-7">
//               {stepIndex > 0 && (
//                 <button
//                   onClick={back}
//                   className="flex items-center gap-1.5 border-2 border-gray-200 rounded-full px-5 py-3 text-[13.5px] font-medium text-gray-500 hover:border-green-700 hover:text-green-700 transition-all whitespace-nowrap"
//                 >
//                   ← Back
//                 </button>
//               )}
//               <button
//                 onClick={next}
//                 disabled={!canProceed() || loading}
//                 className={`flex-1 flex items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold text-white transition-all ${!canProceed() || loading
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-green-800 hover:bg-green-900 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/20"
//                   }`}
//               >
//                 {loading ? (
//                   <>
//                     <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
//                     Saving…
//                   </>
//                 ) : step === "confirm" ? (
//                   editMode ? "Save Changes →" : "Launch My Profile →"
//                 ) : (
//                   "Continue →"
//                 )}
//               </button>
//             </div>

//             {/* Skip for now — tutor confirm, or edit mode */}
//             {((form.role === "tutor" && step === "confirm") || editMode) && (
//               <div className="text-center mt-4">
//                 <button
//                   onClick={() => navigate("/dashboard")}
//                   className="text-[12.5px] text-gray-400 hover:text-green-700 underline underline-offset-2 transition-colors"
//                 >
//                   Skip for now
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Slide-in keyframe */}
//         <style>{`
//         @keyframes slideIn {
//           from { opacity: 0; transform: translateX(14px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//       `}</style>
//       </div>
//       );
// } 
