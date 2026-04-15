import { CheckCircle, CircleDashed, PlayCircle, AlertCircle } from "lucide-react";
import ButtonSpinner from "../../../shared/components/ButtonSpinner";

interface VideoCompProps {
  videoUrl?: string;
  title?: string;
  poster?: string;
  handleComplete: () => void;
  fetchQuiz: () => void;
  loading: boolean;
  isCompleted: boolean;
}

export default function VideoComp({
  poster,
  videoUrl,
  title = "Introduction to the Course",
  handleComplete,
  fetchQuiz,
  loading,
  isCompleted,
}: VideoCompProps) {
  const buttonConfig = isCompleted
    ? {
        text: "Mark Incomplete",
        styles: "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200",
        icon: <CircleDashed className="w-4 h-4" />,
      }
    : {
        text: "Take Quiz & Complete",
        styles: "bg-[#166534] text-white hover:bg-[#14532D] shadow-md shadow-green-900/20",
        icon: <CheckCircle className="w-4 h-4" />,
      };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Video Container */}
      <div className="group relative w-full aspect-video bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex items-center justify-center">
        {videoUrl ? (
          <video
            src={videoUrl}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            poster={poster}
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900">
            <div className="p-4 rounded-full bg-slate-800 mb-3">
              <AlertCircle className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium tracking-wide">
              This video is currently unavailable
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-gray-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#166534] font-semibold text-xs uppercase tracking-widest">
            <PlayCircle size={14} />
            <span>Currently Playing</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
        </div>

        <div className="flex items-center shrink-0">
          <button
            onClick={() => (isCompleted ? handleComplete() : fetchQuiz())}
            disabled={loading}
            className={`
              flex min-w-[200px] items-center justify-center gap-2 px-6 py-3 
              text-sm font-bold rounded-xl transition-all active:scale-95
              cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed
              ${buttonConfig.styles}
            `}
          >
            {loading ? (
              <>
                <ButtonSpinner />
                <span>Quiz Loading...</span>
              </>
            ) : (
              <>
                {buttonConfig.icon}
                {buttonConfig.text}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}