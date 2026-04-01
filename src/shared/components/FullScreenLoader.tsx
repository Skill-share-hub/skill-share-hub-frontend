import { Loader2 } from "lucide-react";

export default function FullScreenLoader() {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="relative">
                {/* Outer rotating ring */}
                <div className="w-16 h-16 rounded-full border-4 border-green-100 border-t-green-600 animate-spin"></div>
                {/* Inner static logo or icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-green-700 animate-pulse" />
                </div>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-700 tracking-tight animate-pulse">
                Loading...
            </h2>
            <p className="text-sm text-gray-500 mt-1">Please wait while we fetch your data</p>
        </div>
    );
}
