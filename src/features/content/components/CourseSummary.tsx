import { Star, Clock, Users, GraduationCap, FileText, Download } from "lucide-react";
import type { CourseType } from "../content.types";
import formatDuration from "../../../shared/utils/formatDuration";

export default function CourseSummary({courseDetails}:{courseDetails:CourseType}) {

    const totalDuration = formatDuration(courseDetails.courseDuration);
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">About this Course</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                    {
                        courseDetails.description
                    }
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-1.5 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{courseDetails.ratingsAverage.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-gray-500">{courseDetails.ratingsAverage.toFixed(1)}k reviews</span>
                </div>
                
                <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-1.5 text-gray-700">
                        <Users className="w-4 h-4" />
                        <span className="font-bold text-gray-900">{courseDetails.totalEnrollments}</span>
                    </div>
                    <span className="text-xs text-gray-500">Students enrolled</span>
                </div>
                
                <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-1.5 text-gray-700">
                        <Clock className="w-4 h-4" />
                        <span className="font-bold text-gray-900">{totalDuration}</span>
                    </div>
                    <span className="text-xs text-gray-500">Total duration</span>
                </div>
                
                <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-1.5 text-gray-700">
                        <GraduationCap className="w-4 h-4" />
                        <span className="font-bold text-gray-900">{courseDetails.certified ? "Yes":"No"}</span>
                    </div>
                    <span className="text-xs text-gray-500">Certificate</span>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Instructor</h4>
                <div className="flex items-start gap-4">
                    <img 
                        src={courseDetails.tutorId.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                        alt="Instructor" 
                        className="w-12 h-12 rounded-full bg-[#166534]/10 border-2 border-[#166534]"
                    />
                    <div>
                        <h5 className="font-medium text-gray-900">{courseDetails.tutorId.name||""}</h5>
                        <p className="text-sm text-gray-500 mb-2">{courseDetails.tutorId.tutorProfile.experience||""}</p>
                        <p className="text-xs text-gray-600">
                            {courseDetails.tutorId.tutorProfile.bio || ""}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
                <div className="flex flex-col gap-2">
                    <a href="#" className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#166534] group transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#166534]/10 text-[#166534] rounded-md">
                                <FileText className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-[#166534]">Course Syllabus.pdf</span>
                        </div>
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-[#166534]" />
                    </a>
                    <a href="#" className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 group transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                                <FileText className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Setup Guide.md</span>
                        </div>
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    </a>
                </div>
            </div>
        </div>
    );
}
