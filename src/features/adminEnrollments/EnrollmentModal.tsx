import React from 'react';
import { X, User, BookOpen, GraduationCap, Calendar, Clock, Award } from 'lucide-react';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollment: any;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose, enrollment }) => {
  if (!isOpen || !enrollment) return null;

  const progress = enrollment.progress || 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="bg-[#13161b] border border-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#1a1d23]">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            Enrollment Details
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Student & Tutor Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  Student Information
                </h3>
                <div className="bg-[#0d0f12] p-4 rounded-xl border border-gray-800/50">
                  <p className="text-white font-medium">{enrollment.student?.name}</p>
                  <p className="text-gray-500 text-sm">{enrollment.student?.email}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Tutor Information
                </h3>
                <div className="bg-[#0d0f12] p-4 rounded-xl border border-gray-800/50">
                  <p className="text-white font-medium">{enrollment.tutor?.name}</p>
                  <p className="text-gray-500 text-sm">Course Instructor</p>
                </div>
              </div>

              <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Timeline
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span>Enrolled on {new Date(enrollment.enrolledAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>

            {/* Course Info & Progress */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  Course Information
                </h3>
                <div className="bg-[#0d0f12] rounded-xl border border-gray-800/50 overflow-hidden">
                  <img 
                    src={enrollment.course?.thumbnail || '/placeholder-course.jpg'} 
                    alt={enrollment.course?.title}
                    className="w-full h-32 object-cover opacity-80"
                  />
                  <div className="p-4">
                    <p className="text-white font-medium line-clamp-1 mb-2">{enrollment.course?.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase font-semibold">
                        {enrollment.course?.courseType}
                      </span>
                      <span className="text-white font-bold flex items-center gap-1">
                        <span className="text-emerald-400">
                          {enrollment.course?.courseType === 'credit' ? '⛁' : '₹'}
                        </span>
                        {enrollment.course?.courseType === 'credit' 
                          ? `${enrollment.course?.creditCost || 0} Credits`
                          : (enrollment.course?.price || 0)
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Current Status</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    enrollment.status === 'completed' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {enrollment.status?.charAt(0).toUpperCase() + enrollment.status?.slice(1)}
                  </span>
                  <span className="text-gray-400 text-xs font-medium">{progress}% Complete</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-600 mt-2 text-right italic">
                  {enrollment.completedContent?.length || 0} of {enrollment.totalContents || 0} contents finished
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 bg-[#1a1d23] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;
