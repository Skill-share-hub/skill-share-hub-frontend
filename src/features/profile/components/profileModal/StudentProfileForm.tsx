import { useState, type KeyboardEvent } from "react"
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { X, Plus } from "lucide-react"
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
  error,
}: {
  label: string
  field: string
  placeholder: string
  values: string[]
  onChange: (vals: string[]) => void
  error?: string
}) {
  const [input, setInput] = useState("")

  const add = () => {
    const trimmed = input.trim()
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed])
    }
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
        className={`min-h-[48px] flex flex-wrap gap-1.5 items-center bg-slate-50 border rounded-xl px-3 py-2 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all ${
          error ? "border-red-300" : "border-slate-200"
        }`}
      >
        {values.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium px-2.5 py-1 rounded-lg"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="text-emerald-400 hover:text-emerald-700 transition-colors"
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
          <button
            type="button"
            onClick={add}
            className="text-emerald-500 hover:text-emerald-700 transition-colors"
          >
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

export default function StudentProfileForm({ register, errors, setValue, watch }: Props) {
  const skills = (watch("skills") as string[]) || []
  const interests = (watch("interests") as string[]) || []

  return (
    <div className="flex flex-col gap-5">
      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Bio
        </label>
        <textarea
          {...register("bio", {
            maxLength: { value: 300, message: "Bio must be 300 characters or fewer" },
          })}
          rows={3}
          maxLength={300}
          placeholder="Tell us a little about yourself..."
          className={`resize-none bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all ${
            errors.bio ? "border-red-300" : "border-slate-200"
          }`}
        />
        <div className="flex items-center justify-between">
          {errors.bio ? (
            <p className="text-xs text-red-500">{errors.bio.message}</p>
          ) : (
            <span />
          )}
          <p className={`text-[11px] ml-auto ${ (watch("bio") ?? "").length >= 300 ? "text-red-400" : "text-slate-400" }`}>
            {(watch("bio") ?? "").length}/300
          </p>
        </div>
      </div>

      {/* Skills */}
      <TagInput
        label="Skills"
        field="skills"
        placeholder="e.g. JavaScript, Design, Writing..."
        values={skills}
        onChange={(vals) => setValue("skills", vals)}
        error={errors.skills?.message}
      />

      {/* Interests */}
      <TagInput
        label="Interests"
        field="interests"
        placeholder="e.g. Machine Learning, Music, Travel..."
        values={interests}
        onChange={(vals) => setValue("interests", vals)}
        error={errors.interests?.message}
      />
    </div>
  )
}