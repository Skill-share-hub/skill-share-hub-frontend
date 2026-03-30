import { Info } from "lucide-react";
import { motion } from "framer-motion";
import FileUploader from "./FileUploader";

interface StepProps {
  degreeCert: File | null;
  setDegreeCert: (f: File | null) => void;
  idProof: File | null;
  setIdProof: (f: File | null) => void;
  expLetter: File | null;
  setExpLetter: (f: File | null) => void;
  otherDocs: File | null;
  setOtherDocs: (f: File | null) => void;
  fileErrors: Record<string, string>;
}

const Step4Documents = ({
  degreeCert,
  setDegreeCert,
  idProof,
  setIdProof,
  expLetter,
  setExpLetter,
  otherDocs,
  setOtherDocs,
  fileErrors
}: StepProps) => {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploader 
          label="Highest Degree Certificate *"
          selectedFile={degreeCert}
          onFileSelect={setDegreeCert}
          onClear={() => setDegreeCert(null)}
          error={fileErrors.degreeCert}
          accept="image/*,.pdf"
        />
        <FileUploader 
          label="National ID / Passport *"
          selectedFile={idProof}
          onFileSelect={setIdProof}
          onClear={() => setIdProof(null)}
          error={fileErrors.idProof}
          accept="image/*,.pdf"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploader 
          label="Experience Letters (Optional)"
          selectedFile={expLetter}
          onFileSelect={setExpLetter}
          onClear={() => setExpLetter(null)}
          accept="image/*,.pdf"
        />
        <FileUploader 
          label="Other Certifications (Optional)"
          selectedFile={otherDocs}
          onFileSelect={setOtherDocs}
          onClear={() => setOtherDocs(null)}
          accept="image/*,.pdf"
        />
      </div>

      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3 items-start">
        <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 leading-relaxed">
          Please ensure all documents are clear and legible. Files should be in PDF or common image formats (JPG, PNG) and not exceed 5MB each.
        </p>
      </div>
    </motion.div>
  );
};

export default Step4Documents;
