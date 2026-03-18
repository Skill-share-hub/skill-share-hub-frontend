import { CheckCircle, CircleDashed } from "lucide-react";
import ButtonSpinner from "../../../shared/components/ButtonSpinner";

interface VideoCompProps {
    videoUrl?: string;
    title?: string;
    poster ?: string;
    handleComplete : () => void;
    loading : boolean;
    isCompleted : boolean
}

export default function VideoComp({
    poster, 
    videoUrl, 
    title = "Introduction to the Course",
    handleComplete ,
    loading,
    isCompleted

}: VideoCompProps) {

    const buttonConfig = isCompleted 
    ? { 
        text: "Mark as Incompleted", 
        styles: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300",
        icon: <CircleDashed className="w-4 h-4 text-gray-500" /> 
        }
    : { 
        text: "Mark as Completed", 
        styles: "bg-[#166534] text-white hover:bg-[#14532D]",
        icon: <CheckCircle className="w-4 h-4" /> 
        };

    return (
        <div className="w-full flex flex-col gap-4">
            
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 flex items-center justify-center">
                {videoUrl ? (
                    <video 
                        src={videoUrl} 
                        controls 
                        poster={poster}
                        className="w-full h-full object-contain"
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-900/80 backdrop-blur-sm">
                        <p className="text-gray-300 font-medium">Video not available</p>
                    </div>
                )}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">{title}</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleComplete}
                        disabled={loading}
                        className={`
                        flex w-[220px] justify-center items-center gap-2 px-4 py-2 
                        text-sm font-medium rounded-lg shadow-sm transition-all 
                        cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed
                        ${buttonConfig.styles}
                        `}
                    >
                        {loading ? (
                        <>
                            <ButtonSpinner />
                            <span>Processing...</span>
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
