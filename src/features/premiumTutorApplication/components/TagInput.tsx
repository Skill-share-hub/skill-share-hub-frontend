import { useState } from "react";
import { X, Plus } from "lucide-react";

interface TagInputProps { 
  label: string; 
  values: string[]; 
  onChange: (v: string[]) => void; 
  placeholder: string; 
  error?: string;
}

const TagInput = ({ 
  label, values, onChange, placeholder, error 
}: TagInputProps) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    onChange(values.filter(t => t !== tag));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 block ml-1">{label}</label>
      <div className={`flex flex-wrap gap-2 p-2 border rounded-xl bg-white focus-within:ring-2 focus-within:ring-green-100 focus-within:border-green-400 transition-all min-h-[46px] ${error ? 'border-red-400' : 'border-gray-200'}`}>
        {values.map(tag => (
          <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-lg text-sm border border-green-100">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="hover:text-green-900 focus:outline-none"><X size={14} /></button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={values.length === 0 ? placeholder : "Add more..."}
          className="flex-1 outline-none text-sm min-w-[100px] bg-transparent"
        />
        {input.trim() && (
          <button type="button" onClick={addTag} className="text-green-600 focus:outline-none"><Plus size={20} /></button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export default TagInput;
