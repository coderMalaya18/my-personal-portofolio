import React, { useEffect } from 'react';
import { X, ArrowUpRight, FileText } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import { ProjectVisual } from './ProjectVisual';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenResume: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenResume,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 dark:bg-black/75 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F1623] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl shadow-xl p-6 sm:p-8 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
              <span className="tabular-nums">{project.index}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.tools.join(' / ')}</span>
            </div>
            <h2
              id="project-modal-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance"
            >
              {project.title}
            </h2>
            <p className="text-sm text-[#475569] dark:text-[#94A3B8]">{project.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="shrink-0 w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] dark:border-[#334155] text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#161F30] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-8">
          <ProjectVisual type={project.visualType} />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              Key Outcomes &amp; Scope
            </h3>
            <ul className="space-y-2.5 text-[15px] leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-[#1D4ED8] dark:text-[#60A5FA] mt-1.5 tabular-nums">
                    {`0${idx + 1}.`}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              Workflow &amp; Architecture
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-[#E2E8F0] dark:border-[#1E293B]">
              {project.methodology.map((step, idx) => (
                <div key={step.stage} className="space-y-1.5">
                  <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                    {`Step 0${idx + 1}`}
                  </div>
                  <div className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                    {step.stage}
                  </div>
                  <p className="text-xs leading-relaxed text-[#475569] dark:text-[#94A3B8]">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#E2E8F0] dark:border-[#1E293B]">
            <div>
              <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">Primary Deliverable</div>
              <div className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                {project.deliverable}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] bg-[#F8FAFC] dark:bg-[#161F30] border border-[#CBD5E1] dark:border-[#334155] rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA]"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] dark:bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] dark:hover:bg-[#3B82F6] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA]"
              >
                <span>Discuss Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
