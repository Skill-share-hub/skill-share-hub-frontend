import React, { useState } from "react";

const COLORS = [
  "bg-indigo-600", "bg-cyan-600", "bg-emerald-600", "bg-amber-600",
  "bg-red-600", "bg-violet-600", "bg-pink-600", "bg-sky-600",
];

function getColorClass(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string): string {
  if (!name) return "??";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, src, size = 36 }) => {
  const [hasError, setHasError] = useState(false);
  
  const bgClass = getColorClass(name || "User");
  const initials = getInitials(name);

  // If we have an image and no error yet, try to render it
  if (src && !hasError) {
    return (
      <img 
        src={src} 
        alt={name} 
        className="rounded-full object-cover shrink-0" 
        style={{ width: size, height: size }}
        onError={() => setHasError(true)}
      />
    );
  }

  // Fallback: Text-based avatar
  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-white shrink-0 tracking-wide ${bgClass}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
};

export default Avatar;