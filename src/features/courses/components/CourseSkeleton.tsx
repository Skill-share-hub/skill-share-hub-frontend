export default function CourseSkeleton() {
    return (
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
            {/* Thumbnail Skeleton */}
            <div className="relative aspect-video bg-gray-200">
                <div className="absolute top-3 inset-x-3 flex justify-between">
                    <div className="w-16 h-6 bg-gray-300 rounded-full" />
                    <div className="w-14 h-6 bg-gray-300 rounded-full" />
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <div className="w-full h-5 bg-gray-200 rounded mb-2" />
                <div className="w-2/3 h-5 bg-gray-200 rounded mb-4" />

                {/* Tutor */}
                <div className="w-1/3 h-4 bg-gray-200 rounded mb-6" />

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex space-x-3">
                        <div className="w-12 h-4 bg-gray-200 rounded" />
                        <div className="w-12 h-4 bg-gray-200 rounded" />
                    </div>
                    <div className="w-16 h-5 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
}
