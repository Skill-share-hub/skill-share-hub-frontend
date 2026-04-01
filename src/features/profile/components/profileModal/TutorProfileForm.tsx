import { useState, type KeyboardEvent } from "react"
import type{ UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { X, Plus, Briefcase } from "lucide-react"
import type { ProfileFormData } from "../../types/ProfileModal.types"

interface Props {
  register: UseFormRegister<ProfileFormData>
  errors: FieldErrors<ProfileFormData>
  setValue: UseFormSetValue<ProfileFormData>
  watch: UseFormWatch<ProfileFormData>
}

const TAG_MAX = 30

function TagInput({
  label,
  placeholder,
  values,
  onChange,
  error}: {
  label: string
  placeholder: string
  values: string[]
  onChange: (vals: string[]) => void
  error?: string
}) { const [input, setInput] = useState("")

  const add = () => {
    const trimmed = input.trim()
    if (trimmed && !values.includes(trimmed)) onChange([...values, trimmed])
    setInput("")
  }

  const remove = (tag: string) => onChange(values.filter((v) => v !== tag))

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      add()
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </label>
      <div
        className={`min-h-[48px] flex flex-wrap gap-1.5 items-center bg-slate-50 border rounded-xl px-3 py-2 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition-all ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      >
        {values.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-2.5 py-1 rounded-lg"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="text-green-400 hover:text-green-700 transition-colors"
            >
              <X size={11} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, TAG_MAX))}
          onKeyDown={onKey}
          maxLength={TAG_MAX}
          placeholder={values.length === 0 ? placeholder : "Add more..."}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-slate-700 placeholder:text-slate-300 outline-none"
        />
        {input.trim() && (
          <button type="button" onClick={add} className="text-green-500 hover:text-green-700">
            <Plus size={16} />
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-slate-400">Press Enter or comma to add a tag</p>
        {input.length > 0 && (
          <p className={`text-[11px] ${input.length >= TAG_MAX ? "text-red-400" : "text-slate-400"}`}>
            {input.length}/{TAG_MAX}
          </p>
        )}
      </div>
    </div>
  )
}

export default function TutorProfileForm({ register, errors, setValue, watch }: Props) {
  const skills = (watch("skills") as string[]) || []

  return (
    <div className="flex flex-col gap-5">
      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Bio <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register("bio", {
            required: "Bio is required for tutors",
            maxLength: { value: 500, message: "Bio must be 500 characters or fewer" },
          })}
          rows={3}
          maxLength={500}
          placeholder="Describe your teaching style, background, and expertise..."
          className={`resize-none bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all ${
            errors.bio ? "border-red-300" : "border-slate-200"
          }`}
        />
        <div className="flex items-center justify-between">
          {errors.bio ? (
            <p className="text-xs text-red-500">{errors.bio.message}</p>
          ) : (
            <span />
          )}
          <p className={`text-[11px] ml-auto ${ (watch("bio") ?? "").length >= 500 ? "text-red-400" : "text-slate-400" }`}>
            {(watch("bio") ?? "").length}/500
          </p>
        </div>
      </div>

      {/* Skills */}
      <TagInput
        label="Skills *"
        placeholder="e.g. Python, Data Science, UX Design..."
        values={skills}
        onChange={(vals) => setValue("skills", vals)}
        error={errors.skills?.message}
      />

      {/* Experience */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Experience <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Briefcase
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            {...register("experience", {
              required: "Experience is required",
              maxLength: { value: 150, message: "Experience must be 150 characters or fewer" },
            })}
            type="text"
            maxLength={150}
            placeholder="e.g. 5 years teaching web development at university..."
            className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all ${
              errors.experience ? "border-red-300" : "border-slate-200"
            }`}
          />
        </div>
        <div className="flex items-center justify-between">
          {errors.experience ? (
            <p className="text-xs text-red-500">{errors.experience.message}</p>
          ) : (
            <span />
          )}
          <p className={`text-[11px] ml-auto ${ (watch("experience") ?? "").length >= 150 ? "text-red-400" : "text-slate-400" }`}>
            {(watch("experience") ?? "").length}/150
          </p>
        </div>
      </div>
    </div>
  )
}