import React, { useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { PROFILE, RESUME_PDF_PATH } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/65 dark:bg-black/75 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[88vh] flex flex-col bg-white dark:bg-[#0F1623] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl shadow-xl overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F1623]">
          <div className="min-w-0">
            <h2
              id="resume-modal-title"
              className="text-lg font-semibold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] truncate"
            >
              {PROFILE.name} — Curriculum Vitae
            </h2>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] truncate">
              {PROFILE.role} · {PROFILE.location}
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={RESUME_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#334155] dark:text-[#E2E8F0] bg-[#F8FAFC] dark:bg-[#161F30] border border-[#CBD5E1] dark:border-[#334155] rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open PDF</span>
            </a>
            <a
              href={RESUME_PDF_PATH}
              download="Malayaranjan_Nayak_Data_Analyst_AI_ML_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#1D4ED8] dark:bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] dark:hover:bg-[#3B82F6] transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] dark:border-[#334155] text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#161F30] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#F1F5F9] dark:bg-[#090D16] relative">
          <iframe
            src={RESUME_PDF_PATH}
            title="Malayaranjan Nayak Resume PDF"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
