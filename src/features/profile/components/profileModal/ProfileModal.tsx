import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { X, Camera, User, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import StudentProfileForm from "./StudentProfileForm"
import TutorProfileForm from "./TutorProfileForm"
import type { UserRole, ProfileFormData, UpdateProfilePayload } from "../../types/ProfileModal.types"

/* ─── Types ─────────────────────────────────────────────── */
export interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  role: UserRole
  /** Pass existing data for edit mode */
  defaultValues?: Partial<ProfileFormData>
  /** Called with transformed data ready for backend */
  onSubmit: (data: UpdateProfilePayload) => Promise<void>
  /** "create" shows "Complete Your Profile", "edit" shows "Edit Profile" */
  mode?: "create" | "edit"
}

/* ─── Role badge config ──────────────────────────────────── */

const roleMeta: Record<UserRole, { label: string; color: string; bg: string }> = {
  student:      { label: "Student",       color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  tutor:        { label: "Tutor",         color: "text-violet-700",  bg: "bg-violet-50  border-violet-200"  },
  premiumTutor: { label: "Premium Tutor", color: "text-amber-700",   bg: "bg-amber-50   border-amber-200"   },
}

/* ─── Shared field accent per role ─────────────────────────── */

const accentMap: Record<UserRole, string> = {
  student:      "focus:border-emerald-400 focus:ring-emerald-100",
  tutor:        "focus:border-violet-400  focus:ring-violet-100",
  premiumTutor: "focus:border-violet-400  focus:ring-violet-100",
}

/* ─── Component ─────────────────────────────────────────── */

export default function ProfileModal({
  isOpen,
  onClose,
  role,
  defaultValues,
  onSubmit,
  mode = "create",
}: ProfileModalProps) {
  const [avatarPreview, setAvatarPreview] = useState<string>(defaultValues?.avatarUrl || "")
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      avatarUrl: "",
      email: "",
      bio: "",
      skills: [],
      interests: [],
      experience: "",
      ...defaultValues,
    },
  })

  /* Reset when modal opens with new data */
  useEffect(() => {
    if (isOpen) {
      reset({ name: "", avatarUrl: "", email: "", bio: "", skills: [], interests: [], experience: "", ...defaultValues })
      setAvatarPreview(defaultValues?.avatarUrl || "")
      setSubmitState("idle")
      setErrorMessage("")
    }
  }, [isOpen, defaultValues, reset])

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  if (!isOpen) return null

  const isTutor = role === "tutor" || role === "premiumTutor"
  const meta = roleMeta[role]
  const accent = accentMap[role]

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setAvatarPreview(url)
    setValue("avatarFile", file) // Set the actual file
    setValue("avatarUrl", "")    // Clear manual URL if file is uploaded
  }

  const onFormSubmit = async (formData: ProfileFormData) => {
    setSubmitState("loading")
    setErrorMessage("")
    try {
      // Transform flat form data to backend nested structure
      const payload: UpdateProfilePayload = {
        name: formData.name,
      }

      if (formData.avatarFile) {
        payload.avatarFile = formData.avatarFile
      } else if (formData.avatarUrl) {
        payload.avatarUrl = formData.avatarUrl
      }

      if (role === "student") {
        payload.studentProfile = {
          bio: formData.bio || "",
          skills: formData.skills || [],
          interests: formData.interests || [],
        }
      } else if (role === "tutor" || role === "premiumTutor") {
        payload.tutorProfile = {
          bio: formData.bio || "",
          skills: formData.skills || [],
          experience: formData.experience || "",
        }
      }

      await onSubmit(payload)
      setSubmitState("success")
      setTimeout(() => { onClose(); setSubmitState("idle") }, 1400)
    } catch (err: any) {
      setSubmitState("error")
      setErrorMessage(err?.message || "Something went wrong. Please try again.")
    }
  }

  const title = mode === "edit" ? "Edit Profile" : "Complete Your Profile"
  const subtitle =
    mode === "edit"
      ? "Update your information below."
      : "Fill in your details to get started."

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(15, 23, 42, 0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Modal panel */}
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col"
        style={{ maxHeight: "92vh", animation: "modalIn 0.22s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.96) translateY(10px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* ── Header ── */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
              <span className={`text-[11px] font-semibold border px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                {meta.label}
              </span>
            </div>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 mt-0.5 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all shrink-0"
            aria-label="Close modal"
          >
            <X size={17} />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div ref={scrollRef} className="overflow-y-auto px-6 py-5 flex flex-col gap-6 flex-1">

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={26} className="text-slate-300" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors shadow-sm"
                aria-label="Upload avatar"
              >
                <Camera size={12} />
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarFile} className="hidden" />
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Avatar URL
              </label>
              <input
                {...register("avatarUrl")}
                type="url"
                placeholder="https://example.com/photo.jpg"
                onChange={(e) => { setAvatarPreview(e.target.value); setValue("avatarUrl", e.target.value) }}
                className={`bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:ring-2 transition-all ${accent}`}
              />
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Your full name"
              className={`bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:ring-2 transition-all ${accent} ${errors.name ? "border-red-300" : "border-slate-200"}`}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email — read only */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Email
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
              <input
                {...register("email")}
                type="email"
                readOnly
                tabIndex={-1}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-400 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          {/* Role-specific fields */}
          <div className="h-px bg-slate-100 -mx-6 px-6" />

          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
              {isTutor ? "Tutor Details" : "Student Details"}
            </p>
            {isTutor ? (
              <TutorProfileForm register={register} errors={errors} setValue={setValue} watch={watch} />
            ) : (
              <StudentProfileForm register={register} errors={errors} setValue={setValue} watch={watch} />
            )}
          </div>

          {/* Error banner */}
          {submitState === "error" && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {errorMessage}
            </div>
          )}

          {/* Success banner */}
          {submitState === "success" && (
            <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-3 text-sm">
              <CheckCircle size={16} className="shrink-0" />
              Profile saved successfully!
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/60 rounded-b-2xl shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={submitState === "loading"}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(onFormSubmit)}
            disabled={submitState === "loading" || submitState === "success"}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
              isTutor
                ? "bg-violet-600 hover:bg-violet-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {submitState === "loading" && <Loader2 size={15} className="animate-spin" />}
            {submitState === "success" && <CheckCircle size={15} />}
            {submitState === "loading" ? "Saving..." : submitState === "success" ? "Saved!" : mode === "edit" ? "Save Changes" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  )
}