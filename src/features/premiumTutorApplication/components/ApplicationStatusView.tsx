import { Clock, ShieldCheck, AlertCircle, Info, X, CheckCircle2, FileText } from "lucide-react";
import type{ ApplicationStatusResponse } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
  status: ApplicationStatusResponse;
  handleDeleteAndRestart: () => void;
}

const ApplicationStatusView = ({ status, handleDeleteAndRestart }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className={`p-8 ${status.status === 'pending' ? 'bg-amber-50' : status.status === 'approved' ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 
              ${status.status === 'pending' ? 'bg-amber-500 text-white' : 
                status.status === 'approved' ? 'bg-green-500 text-white' : 
                'bg-red-500 text-white'}`}
            >
              {status.status === 'pending' ? <Clock size={32} /> : 
               status.status === 'approved' ? <ShieldCheck size={32} /> : 
               <AlertCircle size={32} />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Application {status.status.charAt(0).toUpperCase() + status.status.slice(1)}</h1>
              <p className="text-gray-600 mt-1">Submitted on {new Date(status.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {status.status === 'pending' && (
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4">
              <Info className="text-blue-500 shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900">What happens next?</h3>
                <p className="text-blue-800 text-sm mt-1 leading-relaxed">
                  Our admin team is currently reviewing your profile and documents. This process usually takes 2-3 business days. You will be notified once a decision is made.
                </p>
              </div>
            </div>
          )}

          {status.status === 'rejected' && (
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
              <h3 className="font-bold text-red-900 flex items-center gap-2"><X size={18} /> Rejection Reason</h3>
              <p className="text-red-800 text-sm mt-2 leading-relaxed bg-white/50 p-4 rounded-xl border border-red-100 italic">
                "{status.rejectionReason || "No specific reason provided. Please contact support."}"
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button 
                 onClick={handleDeleteAndRestart}
                 className="flex-1 bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition-all shadow-md active:scale-95 font-medium flex items-center justify-center gap-2"
                >
                      Reapply Now
                </button>
                <button className="flex-1 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all font-medium whitespace-nowrap px-4">Contact Support</button>
              </div>
            </div>
          )}

          {status.status === 'approved' && (
            <div className="bg-green-50 border border-green-100 p-6 rounded-2xl text-center">
              <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="font-bold text-green-900 text-xl">Congratulations!</h3>
              <p className="text-green-800 text-sm mt-1">You are now a Premium Tutor. Enjoy exclusive benefits and more visibility.</p>
              <button 
                onClick={() => navigate("/dashboard")}
                className="mt-6 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition shadow-lg active:scale-95 font-medium"
              >
                Go to Dashboard
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {status.documents.map((doc, idx) => (
               <div key={idx} className="flex items-center gap-3 p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400">
                      <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-700 truncate">{doc.fileName}</p>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">{doc.fileType.replace('_', ' ')}</p>
                  </div>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-xs font-bold">View</a>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatusView;
