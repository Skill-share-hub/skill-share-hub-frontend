import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApplicationByIdApi, approveApplicationApi, rejectApplicationApi } from "../services/application.service";
import type { Application } from "../types/application.types";

import ApplicationProfileHeader from "../components/ApplicationProfileHeader";
import PersonalDetailsSection from "../components/PersonalDetailsSection";
import QualificationsSection from "../components/QualificationsSection";
import TeachingDetailsSection from "../components/TeachingDetailsSection";
import ExperienceDescription from "../components/ExperienceDescription";
import SubmittedDocuments from "../components/SubmittedDocuments";
import AdminActions from "../components/AdminActions";

const ApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (id) {
      loadApplication(id);
    }
  }, [id]);

  const loadApplication = async (appId: string) => {
    try {
      setLoading(true);
      const data = await fetchApplicationByIdApi(appId);
      setApplication(data);
    } catch (err: any) {
      setError(err.message || "Failed to load application details");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!id || !application) return;
    try {
      setIsProcessing(true);
      const updated = await approveApplicationApi(id);
      setApplication(updated);
      alert("Application approved successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to approve application");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!id || !application) return;
    const reason = prompt("Please enter the reason for rejection:");
    if (reason === null) return;
    
    try {
      setIsProcessing(true);
      const updated = await rejectApplicationApi(id, reason);
      setApplication(updated);
      alert("Application rejected successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to reject application");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-10 font-['Inter',_sans-serif]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-dark-accentBlue border-t-transparent rounded-full animate-spin" />
          <span className="text-dark-textMuted font-medium text-sm animate-pulse uppercase tracking-[0.2em]">
            Fetching application details...
          </span>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-10 font-['Inter',_sans-serif]">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <div className="p-4 bg-rose-600/10 border border-rose-600/30 rounded-full">
            <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-dark-textPrimary">Oops! Data load failed</h2>
            <p className="text-dark-textMuted text-sm font-medium">{error || "Application not found"}</p>
          </div>
          <button 
            onClick={() => navigate("/admin/applications")} 
            className="px-6 py-2 bg-dark-card border border-dark-borderLight rounded-xl text-dark-textSecondary text-sm font-semibold hover:border-dark-accentBlue transition-all"
          >
            ← Back to applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg p-6 md:p-10 font-['Inter',_sans-serif] text-dark-textSecondary">
      <div className="max-w-[1200px] mx-auto">
        {/* Top Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate("/admin/applications")} 
            className="p-2 bg-dark-card border border-dark-borderLight rounded-full text-dark-textMuted hover:text-dark-accentBlue hover:border-dark-accentBlue transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex flex-col">
            <h1 className="text-[10px] font-bold text-dark-textMuted uppercase tracking-[0.2em] mb-1">
              Ref ID: {application._id.slice(-8).toUpperCase()}
            </h1>
            <h2 className="text-lg font-bold text-dark-textPrimary">Review application</h2>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Profile and Admin Controls (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-10">
            <ApplicationProfileHeader 
              fullName={application.fullName} 
              email={application.tutorId.email} 
              status={application.status} 
              profilePhoto={application.tutorId.profilePhoto}
            />
            
            <PersonalDetailsSection 
              dob={application.dateOfBirth} 
              nationalIdNumber={application.nationalIdNumber} 
              appliedOn={application.createdAt} 
            />

            <QualificationsSection 
              application={application} 
            />

            <AdminActions 
              status={application.status} 
              onApprove={handleApprove} 
              onReject={handleReject} 
              isProcessing={isProcessing} 
            />
          </div>

          {/* RIGHT COLUMN: Professional Details and Documents (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <TeachingDetailsSection 
              application={application} 
            />

            <ExperienceDescription 
              experience={application.experience} 
            />

            <SubmittedDocuments 
              documents={application.documents} 
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsPage;
