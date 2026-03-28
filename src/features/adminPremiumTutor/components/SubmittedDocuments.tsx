import React from "react";
import type { ApplicationDocument } from "../types/application.types";

interface SubmittedDocumentsProps {
  documents: ApplicationDocument[];
}

const SubmittedDocuments: React.FC<SubmittedDocumentsProps> = ({ documents }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-5 md:p-6 mb-4">
      <h2 className="text-[11px] font-bold text-[#454d6d] uppercase tracking-[0.12em] mb-6">
        Submitted Documents
      </h2>
      <div className="flex flex-col gap-4">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-dark-bg/40 border border-dark-borderLight/30 rounded-xl hover:bg-dark-bg/60 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-dark-accentBlueDark border border-dark-accentBlueBorder/30 rounded-lg flex items-center justify-center text-[10px] font-bold text-dark-accentBlueText uppercase">
                {doc.fileType || "PDF"}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-dark-textSecondary group-hover:text-dark-textPrimary transition-colors truncate max-w-[200px]">
                  {doc.fileName}
                </span>
                <span className="text-[11px] text-dark-textMuted font-medium uppercase tracking-wider">
                  {doc.fileType === "id_proof" ? "Identity Proof" : "Degree Certificate"}
                </span>
              </div>
            </div>
            <a 
              href={doc.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-1.5 bg-dark-card border border-dark-borderLight rounded-lg text-dark-textSecondary text-[11px] font-semibold hover:border-dark-accentBlue hover:text-dark-accentBlueText transition-all"
            >
              View ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmittedDocuments;
