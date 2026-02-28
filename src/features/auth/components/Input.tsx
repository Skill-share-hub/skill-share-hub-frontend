type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error: string | null;
  name: string;
  type: string;
  value: string;
};

export default function Input({ onChange, label, error, name, type, value }: Props) {

  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" " 
        className={`peer w-full rounded-md border bg-white px-3 pb-2 pt-3 text-sm outline-none transition-all
        ${error ? "border-red-500" : "border-gray-300 focus:border-gray-500"}`}
      />

      <label
        htmlFor={name}
        className="absolute left-3 top-1.5 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-300 cursor-text
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
        peer-focus:top-1.5 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-1 peer-focus:text-gray-500"
      >
        {label}
      </label>

      {error && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white pl-1 text-xs font-medium text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}