import React, { useEffect, useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Eye, 
  Loader2,
  Calendar,
  FileText,
  MessageCircle,
  Check
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { reportService } from '../../reports/services/reportService';
import type { CourseReport, ReviewReport, ReportStatus } from '../../reports/types/report.types';
import { useNavigate } from 'react-router-dom';

const ReportManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'course' | 'review'>('course');
  const [courseReports, setCourseReports] = useState<CourseReport[]>([]);
  const [reviewReports, setReviewReports] = useState<ReviewReport[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [courses, reviews] = await Promise.all([
        reportService.getAdminCourseReports(),
        reportService.getAdminReviewReports()
      ]);
      setCourseReports(courses.data || []);
      setReviewReports(reviews.data || []);
    } catch (error: any) {
      toast.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (reportId: string, status: ReportStatus) => {
    if (status === 'resolved' && !adminNote.trim()) {
      toast.error("Please provide an admin note before resolving");
      return;
    }

    try {
      setProcessingId(reportId);
      await reportService.updateReportStatus(reportId, status, adminNote);
      toast.success(`Report marked as ${status}`);
      if (status === 'resolved') {
        setResolvingId(null);
        setAdminNote("");
      }
      fetchData(); // Refresh
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tight bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            Pending
          </span>
        );
      case 'noticed':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tight bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            Noticed
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tight bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            Resolved
          </span>
        );
    }
  };

  const currentList = activeTab === 'course' ? courseReports : reviewReports;

  return (
    <div className="min-h-screen bg-[#0d0f12] text-gray-300 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-600 uppercase mb-1">
            Moderation Desk
          </p>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            System Reports
          </h1>
        </div>

        {/* Filters & Tabs Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6 bg-[#13161b] p-4 rounded-xl border border-gray-800/80 shadow-md">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('course')}
              className={`text-xs px-4 py-2 font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'course' 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                  : "bg-[#0d0f12] border border-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <FileText size={14} />
              Course Reports
              <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === 'course' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-500'}`}>
                 {courseReports.filter(r => r.status !== 'resolved').length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`text-xs px-4 py-2 font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'review' 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                  : "bg-[#0d0f12] border border-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <MessageCircle size={14} />
              Review Reports
              <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === 'review' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-500'}`}>
                 {reviewReports.filter(r => r.status !== 'resolved').length}
              </span>
            </button>
          </div>
          <div className="ml-auto text-[10px] uppercase font-bold text-gray-700 tracking-widest hidden lg:block">
             {currentList.length} record{currentList.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="bg-[#13161b] rounded-xl border border-gray-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm min-w-[1000px]">
              <thead>
                <tr className="bg-[#1a1d23] border-b border-gray-800">
                  <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Report Details</th>
                  <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Reason</th>
                  <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Reporter</th>
                  <th className="text-center px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Status</th>
                  <th className="text-center px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800/40">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-8">
                        <div className="h-4 bg-gray-800/50 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : currentList.length > 0 ? (
                  currentList.map((report: any) => (
                    <React.Fragment key={report._id}>
                      <tr className="hover:bg-[#1a1d23]/80 transition-colors group">
                        
                        {/* Report Details */}
                        <td className="px-6 py-4 align-top">
                          <div className="flex flex-col gap-1 max-w-[280px]">
                            <span className="text-gray-200 font-medium text-sm line-clamp-2">
                              {activeTab === 'course' ? report.courseId?.title : `"${report.reviewId?.reviewText}"`}
                            </span>
                            {activeTab === 'review' && (
                              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                                on: {report.courseId?.title}
                              </span>
                            )}
                            {report.adminNote && (
                               <div className="mt-2 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 p-2 rounded-lg leading-relaxed">
                                 <span className="font-bold flex items-center gap-1 mb-0.5"><Check size={10} /> Admin Note:</span>
                                 {report.adminNote}
                               </div>
                            )}
                          </div>
                        </td>

                        {/* Reason */}
                        <td className="px-6 py-4 align-top">
                           <div className="flex flex-col">
                             <span className="text-amber-400 font-semibold text-xs bg-amber-400/10 px-2 py-1 rounded w-fit mb-1 border border-amber-400/20">
                               {report.reason}
                             </span>
                             {report.customReason && (
                               <p className="text-xs text-gray-500 italic max-w-[200px] line-clamp-3">
                                 "{report.customReason}"
                               </p>
                             )}
                           </div>
                        </td>

                        {/* Reporter */}
                        <td className="px-6 py-4 text-xs align-top">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-gray-300 font-bold flex items-center gap-1.5">
                              {report.reportedBy?.name}
                            </span>
                            <span className="text-gray-600">{report.reportedBy?.email}</span>
                            <span className="text-gray-600 mt-1 flex items-center gap-1"><Calendar size={10}/> {format(new Date(report.createdAt), 'MMM dd, yyyy')}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center align-top">
                          {getStatusBadge(report.status)}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 align-top">
                          <div className="flex flex-col items-center gap-2">
                            {report.status === 'pending' && (
                              <button
                                onClick={() => handleUpdateStatus(report._id, 'noticed')}
                                disabled={processingId === report._id}
                                className="w-full text-[10px] uppercase font-bold tracking-widest py-1.5 px-3 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 border border-blue-500/20 rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5"
                              >
                                {processingId === report._id ? <Loader2 size={12} className="animate-spin" /> : <><Eye size={12}/> Notice</>}
                              </button>
                            )}

                            {report.status === 'noticed' && resolvingId !== report._id && (
                              <button
                                onClick={() => setResolvingId(report._id)}
                                className="w-full text-[10px] uppercase font-bold tracking-widest py-1.5 px-3 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 border border-emerald-500/20 rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5"
                              >
                                <CheckCircle2 size={12} /> Resolve
                              </button>
                            )}
                            
                            {activeTab === 'course' && report.courseId?._id && (
                              <button 
                                onClick={() => navigate(`/courses/${report.courseId._id}`)}
                                className="text-xs text-gray-500 hover:text-gray-300 hover:underline transition-all mt-1"
                              >
                                View Item
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Resolve Row */}
                      {resolvingId === report._id && report.status === 'noticed' && (
                        <tr className="bg-[#1a1d23]">
                          <td colSpan={5} className="px-6 py-4 border-b border-gray-800 border-l-[3px] border-l-emerald-500">
                             <div className="flex gap-3 animate-in slide-in-from-top-4 duration-300">
                               <textarea
                                  value={adminNote}
                                  onChange={(e) => setAdminNote(e.target.value)}
                                  placeholder="Explain resolution..."
                                  className="flex-1 bg-[#0d0f12] text-gray-300 border border-emerald-500/50 rounded-lg p-3 text-xs resize-none focus:outline-none focus:border-emerald-400 shadow-inner h-16"
                               />
                               <div className="flex flex-col gap-2 justify-center">
                                 <button
                                    onClick={() => handleUpdateStatus(report._id, 'resolved')}
                                    disabled={processingId === report._id || !adminNote.trim()}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-lg transition-all shadow-md flex items-center justify-center min-w-[100px] disabled:opacity-50"
                                 >
                                    {processingId === report._id ? <Loader2 size={12} className="animate-spin" /> : "Finalize"}
                                 </button>
                                 <button
                                    onClick={() => { setResolvingId(null); setAdminNote(""); }}
                                    className="text-gray-500 hover:text-gray-300 text-xs font-medium transition-colors"
                                 >
                                    Cancel
                                 </button>
                               </div>
                             </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-24 text-gray-600">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-800/30 flex items-center justify-center">
                          <ShieldAlert className="w-6 h-6 text-gray-700" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-[10px]">No reports found</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManagement;
