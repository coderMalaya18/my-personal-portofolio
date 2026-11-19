import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Search,
  Sun,
  X,
} from 'lucide-react';
import {
  ANALYTICAL_APPROACH,
  CERTIFICATIONS,
  EDUCATION,
  FOCUS_TRACKS,
  KEY_FACTS,
  PROFILE,
  PROJECTS,
  RESUME_PDF_PATH,
  SKILL_DOMAINS,
  type ProjectCategory,
  type ProjectItem,
} from './data/portfolioData';
import { ProjectVisual } from './components/ProjectVisual';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';

const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'BI & Analytics',
  'AI & ML',
  'Full-Stack',
];

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTrackId, setActiveTrackId] = useState<string>(FOCUS_TRACKS[0].id);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage access errors in restricted iframes
    }
  }, [isDark]);

  const activeTrack = useMemo(
    () => FOCUS_TRACKS.find((track) => track.id === activeTrackId) ?? FOCUS_TRACKS[0],
    [activeTrackId],
  );

  const normalizedSearchTokens = useMemo(
    () =>
      searchQuery
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),
    [searchQuery],
  );

  const searchMatchedProjects = useMemo(() => {
    if (normalizedSearchTokens.length === 0) return PROJECTS;
    return PROJECTS.filter((project) => {
      const haystack = [
        project.title,
        project.subtitle,
        project.category,
        project.tools.join(' '),
        project.summary,
        project.deliverable,
        project.highlights.join(' '),
        project.methodology.map((m) => `${m.stage} ${m.detail}`).join(' '),
      ]
        .join(' ')
        .toLowerCase();
      return normalizedSearchTokens.every((token) => haystack.includes(token));
    });
  }, [normalizedSearchTokens]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return searchMatchedProjects;
    return searchMatchedProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory, searchMatchedProjects]);

  const categoryCounts = useMemo(() => {
    return {
      All: searchMatchedProjects.length,
      'BI & Analytics': searchMatchedProjects.filter((p) => p.category === 'BI & Analytics').length,
      'AI & ML': searchMatchedProjects.filter((p) => p.category === 'AI & ML').length,
      'Full-Stack': searchMatchedProjects.filter((p) => p.category === 'Full-Stack').length,
    };
  }, [searchMatchedProjects]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = PROFILE.email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const handleJumpToSkillProjects = (category: ProjectCategory) => {
    setSearchQuery('');
    setActiveCategory(category);
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = senderName.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = messageBody.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError('Please fill in your name, email address, and message.');
      setFormSubmitted(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid email address.');
      setFormSubmitted(false);
      return;
    }

    setFormError('');
    setFormSubmitted(true);
  };

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${senderName.trim() || 'Recruiter / Collaborator'}`,
    );
    const body = encodeURIComponent(
      `Name: ${senderName.trim()}\nEmail: ${senderEmail.trim()}\n\n${messageBody.trim()}`,
    );
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  }, [senderName, senderEmail, messageBody]);

  return (
    <div
      id="top"
      className="min-h-screen bg-[#F8F9FA] dark:bg-[#090D16] text-[#0F172A] dark:text-[#F8FAFC] flex flex-col transition-colors duration-200"
    >
      {/* Top Bar — 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#F8F9FA]/92 dark:bg-[#090D16]/92 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E293B] transition-colors">
        <div className="max-w-[1200px] mx-auto h-16 px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA] rounded-xs"
          >
            {PROFILE.name}
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569] dark:text-[#CBD5E1]"
          >
            <a
              href="#projects"
              className="hover:text-[#0F172A] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#biography"
              className="hover:text-[#0F172A] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Biography
            </a>
            <a
              href="#skills"
              className="hover:text-[#0F172A] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Skills
            </a>
            <a
              href="#credentials"
              className="hover:text-[#0F172A] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Credentials
            </a>
          </nav>

          {/* Zone 3: Theme Toggle + Primary Action (+ mobile menu trigger on <md) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F1623] text-[#334155] dark:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#161F30] transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA]"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#1D4ED8] dark:bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] dark:hover:bg-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA]"
            >
              View Resume
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F1623] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#161F30] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="md:hidden border-t border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F1623] px-6 py-4 flex flex-col gap-1"
          >
            {[
              { label: 'Projects', href: '#projects' },
              { label: 'Biography', href: '#biography' },
              { label: 'Skills', href: '#skills' },
              { label: 'Credentials', href: '#credentials' },
              { label: 'Contact & Profiles', href: '#contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-[#334155] dark:text-[#CBD5E1] hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] border-b border-[#F1F5F9] dark:border-[#1E293B] last:border-b-0"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Split-Screen Section */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-14 pb-16 lg:pt-20 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-10 lg:gap-12">
            {/* Left Column: Editorial Typographic Hierarchy */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[#475569] dark:text-[#94A3B8]">
                  <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                    {PROFILE.role}
                  </span>
                  <span aria-hidden="true" className="text-[#94A3B8] dark:text-[#475569]">
                    ·
                  </span>
                  <span>{PROFILE.level}</span>
                  <span aria-hidden="true" className="text-[#94A3B8] dark:text-[#475569]">
                    ·
                  </span>
                  <span>{PROFILE.location}</span>
                </div>

                <h1 className="font-display text-[clamp(2.35rem,4.4vw,3.65rem)] font-bold leading-[1.06] tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
                  {PROFILE.headline}
                </h1>

                <p className="text-base sm:text-[17px] leading-[1.65] text-[#475569] dark:text-[#CBD5E1] max-w-[60ch]">
                  {PROFILE.lead}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1D4ED8] dark:bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] dark:hover:bg-[#3B82F6] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA]"
                  >
                    <span>Explore Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 py-2 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] underline underline-offset-4 decoration-[#CBD5E1] dark:decoration-[#334155] hover:decoration-[#1D4ED8] dark:hover:decoration-[#60A5FA] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Contact &amp; Profiles</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Quiet Inline Profile Links */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B] text-sm text-[#475569] dark:text-[#CBD5E1]">
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#0F172A] dark:hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8]" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#0F172A] dark:hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8]" />
                    <span>GitHub</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-[#1D4ED8] dark:text-[#60A5FA]" />
                        <span className="text-[#1D4ED8] dark:text-[#60A5FA] font-medium">
                          Email copied
                        </span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8]" />
                        <span>{PROFILE.email}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Matching-Height Interactive Analytical Dossier */}
            <div className="lg:col-span-5">
              <div className="h-full bg-white dark:bg-[#0F1623] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 transition-colors">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                    <div>
                      <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                        Core Practice Areas
                      </div>
                      <div className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                        Analytical Workflow
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                      B.Tech · 2026
                    </span>
                  </div>

                  {/* Interactive Segmented Track Selector */}
                  <div
                    role="tablist"
                    aria-label="Practice track overview"
                    className="grid grid-cols-3 gap-1 p-1 bg-[#F1F5F9] dark:bg-[#161F30] rounded-lg"
                  >
                    {FOCUS_TRACKS.map((track) => {
                      const isActive = track.id === activeTrack.id;
                      return (
                        <button
                          key={track.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveTrackId(track.id)}
                          className={`px-2.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA] ${
                            isActive
                              ? 'bg-white dark:bg-[#0F1623] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                              : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                          }`}
                        >
                          {track.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Track Detail */}
                  <div role="tabpanel" className="space-y-4">
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
                        {activeTrack.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1] mt-1.5">
                        {activeTrack.description}
                      </p>
                    </div>

                    <div className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
                      {activeTrack.stack}
                    </div>

                    <div className="space-y-3 pt-2 border-t border-[#F1F5F9] dark:border-[#1E293B]">
                      {activeTrack.steps.map((step) => (
                        <div key={step.label} className="space-y-0.5">
                          <div className="text-xs font-mono font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                            {step.label}
                          </div>
                          <div className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                            {step.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                  <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                    Full academic &amp; project record
                  </span>
                  <a
                    href={RESUME_PDF_PATH}
                    download="Malayaranjan_Nayak_Data_Analyst_AI_ML_Resume.pdf"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-[#60A5FA] hover:text-[#1E40AF] dark:hover:text-[#93C5FD] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Fact Strip Below Hero Split */}
          <div className="mt-14 pt-8 border-t border-[#E2E8F0] dark:border-[#1E293B] grid grid-cols-2 lg:grid-cols-4 gap-8">
            {KEY_FACTS.map((fact) => (
              <div key={fact.label} className="space-y-1">
                <div className="font-mono text-2xl sm:text-3xl font-medium tracking-tight text-[#0F172A] dark:text-[#F8FAFC] tabular-nums">
                  {fact.value}
                </div>
                <div className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                  {fact.label}
                </div>
                <div className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-snug">
                  {fact.context}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Showcase Section */}
        <section
          id="projects"
          className="scroll-mt-20 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F1623] py-20 lg:py-24 transition-colors"
        >
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="space-y-8 pb-8 border-b border-[#E2E8F0] dark:border-[#1E293B]">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                  Selected Works · 06 Projects
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
                  Analytics, Machine Learning &amp; Engineering Projects
                </h2>
                <p className="text-[15px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                  Hands-on work spanning Power BI dashboards, SQL behavioral reporting, Random
                  Forest intrusion classification, and full-stack web applications. Select any
                  project to inspect its methodology.
                </p>
              </div>

              {/* Search & Category Filter Toolbar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Real-Time Project Search Input */}
                <div className="relative w-full lg:max-w-md">
                  <label htmlFor="project-search" className="sr-only">
                    Search projects by title, tools, or keywords
                  </label>
                  <Search
                    aria-hidden="true"
                    className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                  <input
                    id="project-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape' && searchQuery) {
                        setSearchQuery('');
                      }
                    }}
                    placeholder="Search by title, tool, or keyword (e.g. SQL, Random Forest)..."
                    className="w-full h-11 pl-10 pr-10 text-sm bg-[#F8F9FA] dark:bg-[#0B111E] border border-[#CBD5E1] dark:border-[#334155] rounded-lg text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#1D4ED8] dark:focus:border-[#60A5FA] focus:ring-2 focus:ring-[#1D4ED8]/15 dark:focus:ring-[#60A5FA]/20 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search query"
                      className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#E2E8F0]/60 dark:hover:bg-[#1E293B] absolute right-2 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Interactive Category Filter Control */}
                <div
                  role="group"
                  aria-label="Filter projects by category"
                  className="flex flex-wrap items-center gap-1 p-1 bg-[#F1F5F9] dark:bg-[#161F30] rounded-lg self-start lg:self-auto"
                >
                  {PROJECT_CATEGORIES.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        aria-pressed={isActive}
                        className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA] ${
                          isActive
                            ? 'bg-white dark:bg-[#0F1623] text-[#0F172A] dark:text-[#F8FAFC] shadow-xs'
                            : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC]'
                        }`}
                      >
                        <span>{category}</span>
                        <span className="ml-1.5 font-mono text-[11px] text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                          {categoryCounts[category]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Search Feedback Bar */}
              {normalizedSearchTokens.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#475569] dark:text-[#94A3B8]">
                  <span className="font-mono tabular-nums">
                    {filteredProjects.length}{' '}
                    {filteredProjects.length === 1 ? 'project' : 'projects'} matching &ldquo;
                    {searchQuery.trim()}&rdquo;
                    {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                    className="font-medium text-[#1D4ED8] dark:text-[#60A5FA] hover:underline cursor-pointer whitespace-nowrap"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Dynamic Bento Project Grid or Empty State */}
            <MotionConfig reducedMotion="user">
              <AnimatePresence mode="wait">
                {filteredProjects.length === 0 ? (
                  <motion.div
                    key="empty-projects"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10 bg-[#F8F9FA] dark:bg-[#0B111E] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl p-10 text-center space-y-4"
                  >
                    <div className="space-y-1.5 max-w-md mx-auto">
                      <h3 className="font-display text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                        No matching projects found
                      </h3>
                      <p className="text-sm text-[#475569] dark:text-[#94A3B8]">
                        No projects matched &ldquo;{searchQuery.trim()}&rdquo;
                        {activeCategory !== 'All' ? ` within ${activeCategory}` : ''}. Try searching
                        for SQL, Power BI, Python, Random Forest, Flask, or MongoDB.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                      {activeCategory !== 'All' && searchMatchedProjects.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveCategory('All')}
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] dark:bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] dark:hover:bg-[#3B82F6] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Search across All ({searchMatchedProjects.length})
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setActiveCategory('All');
                        }}
                        className="px-4 py-2 text-xs font-medium text-[#0F172A] dark:text-[#F8FAFC] bg-white dark:bg-[#0F1623] border border-[#CBD5E1] dark:border-[#334155] rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#161F30] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredProjects.map((project, idx) => {
                        const spanClass =
                          activeCategory === 'All' && normalizedSearchTokens.length === 0
                            ? project.bentoSpan
                            : 'lg:col-span-6';
                        return (
                          <motion.button
                            key={project.id}
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{
                              duration: 0.2,
                              delay: Math.min(idx * 0.03, 0.12),
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`${spanClass} group text-left bg-[#F8F9FA] dark:bg-[#0B111E] hover:bg-white dark:hover:bg-[#131B2B] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#CBD5E1] dark:hover:border-[#334155] rounded-2xl p-6 flex flex-col justify-between gap-6 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA] cursor-pointer`}
                          >
                            <div className="space-y-4 w-full">
                              {/* Zero-pill quiet metadata line */}
                              <div className="flex items-center justify-between gap-4 text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 min-w-0">
                                  <span className="tabular-nums text-[#0F172A] dark:text-[#F8FAFC] font-medium">
                                    {project.index}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span>{project.category}</span>
                                  <span aria-hidden="true">·</span>
                                  <span className="truncate">{project.tools.join(' / ')}</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 shrink-0 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                              </div>

                              <div className="space-y-2">
                                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] transition-colors">
                                  {project.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                                  {project.summary}
                                </p>
                              </div>
                            </div>

                            <div className="w-full space-y-3">
                              <ProjectVisual type={project.visualType} compact />
                              <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8] pt-1">
                                <span className="truncate">{project.deliverable}</span>
                                <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] whitespace-nowrap shrink-0 ml-4">
                                  Inspect details
                                </span>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionConfig>
          </div>
        </section>

        {/* Biography & Analytical Approach Section */}
        <section
          id="biography"
          className="scroll-mt-20 border-t border-[#E2E8F0] dark:border-[#1E293B] py-20 lg:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Narrative Biography */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                    Biography
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
                    Grounded in Computer Science, focused on applied analytics.
                  </h2>
                </div>

                <div className="space-y-4 text-[15px] sm:text-base leading-[1.7] text-[#334155] dark:text-[#CBD5E1]">
                  {PROFILE.biographyParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-[#E2E8F0] dark:border-[#1E293B] grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">Based in</div>
                    <div className="font-medium text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                      {PROFILE.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">Target Role</div>
                    <div className="font-medium text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                      Entry-Level Data Analyst (AI / ML)
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">Languages</div>
                    <div className="font-medium text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                      {PROFILE.languages.join(' · ')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">Direct Contact</div>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="font-medium text-[#1D4ED8] dark:text-[#60A5FA] hover:underline mt-0.5 inline-block break-all"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Numbered Analytical Approach */}
              <div className="lg:col-span-6">
                <div className="bg-white dark:bg-[#0F1623] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl p-6 sm:p-8 transition-colors">
                  <div className="pb-5 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                    <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                      Methodology
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
                      How I approach data problems
                    </h3>
                  </div>

                  <div className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                    {ANALYTICAL_APPROACH.map((item) => (
                      <div key={item.index} className="py-5 first:pt-6 last:pb-0 flex gap-4">
                        <span className="font-mono text-xs font-medium text-[#1D4ED8] dark:text-[#60A5FA] pt-1 tabular-nums shrink-0">
                          {`${item.index}.`}
                        </span>
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                            {item.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills Matrix */}
        <section
          id="skills"
          className="scroll-mt-20 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F1623] py-20 lg:py-24 transition-colors"
        >
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="max-w-2xl space-y-2 pb-10">
              <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                Technical Capabilities
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
                Skills &amp; Analytical Stack
              </h2>
              <p className="text-[15px] text-[#475569] dark:text-[#CBD5E1] leading-relaxed">
                Core tools and languages applied across business intelligence dashboards,
                classification modeling, relational databases, and web deployment.
              </p>
            </div>

            <div className="border-t border-[#E2E8F0] dark:border-[#1E293B] divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
              {SKILL_DOMAINS.map((domain) => (
                <div
                  key={domain.id}
                  className="py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
                >
                  <div className="md:col-span-3 space-y-1">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                        {domain.index}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                        {domain.name}
                      </h3>
                    </div>
                  </div>

                  <div className="md:col-span-6 space-y-2">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[15px] font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                      {domain.skills.map((skill, idx) => (
                        <React.Fragment key={skill}>
                          <span>{skill}</span>
                          {idx < domain.skills.length - 1 && (
                            <span
                              aria-hidden="true"
                              className="text-[#94A3B8] dark:text-[#475569]"
                            >
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-sm text-[#475569] dark:text-[#CBD5E1]">{domain.focus}</p>
                  </div>

                  <div className="md:col-span-3 md:text-right pt-1">
                    <button
                      type="button"
                      onClick={() => handleJumpToSkillProjects(domain.relatedCategory)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-[#60A5FA] hover:text-[#1E40AF] dark:hover:text-[#93C5FD] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA] rounded-xs"
                    >
                      <span>View {domain.relatedCategory} work</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials Section: Education & Certifications */}
        <section
          id="credentials"
          className="scroll-mt-20 border-t border-[#E2E8F0] dark:border-[#1E293B] py-20 lg:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="max-w-2xl space-y-2 pb-12">
              <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                Academic &amp; Verified Record
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
                Education &amp; Certifications
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Education Column */}
              <div className="lg:col-span-6 bg-white dark:bg-[#0F1623] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-colors">
                <div>
                  <div className="pb-5 border-b border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                      Education
                    </h3>
                    <span className="font-mono text-xs text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                      2017 – 2026
                    </span>
                  </div>

                  <div className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                    {EDUCATION.map((edu) => (
                      <div
                        key={edu.degree}
                        className="py-5 first:pt-6 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <div className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                            {edu.degree}
                          </div>
                          <div className="text-sm text-[#475569] dark:text-[#CBD5E1]">
                            {edu.institution} · {edu.location}
                          </div>
                        </div>
                        <div className="sm:text-right font-mono text-xs text-[#475569] dark:text-[#94A3B8] tabular-nums shrink-0 space-y-0.5">
                          <div className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                            {edu.year}
                          </div>
                          <div>{edu.score}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications & Languages Column */}
              <div className="lg:col-span-6 bg-white dark:bg-[#0F1623] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-8 transition-colors">
                <div>
                  <div className="pb-5 border-b border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                      Certifications
                    </h3>
                    <span className="font-mono text-xs text-[#64748B] dark:text-[#94A3B8] tabular-nums">
                      04 Issued
                    </span>
                  </div>

                  <div className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                    {CERTIFICATIONS.map((cert, idx) => (
                      <div
                        key={cert.title}
                        className="py-4 first:pt-5 last:pb-0 flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-xs text-[#64748B] dark:text-[#94A3B8] pt-1 tabular-nums">
                            {`0${idx + 1}`}
                          </span>
                          <div>
                            <div className="text-[15px] font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                              {cert.title}
                            </div>
                            <div className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                              {cert.issuer} · {cert.area}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[#E2E8F0] dark:border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                    Spoken Languages
                  </span>
                  <span className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                    {PROFILE.languages.join(' · ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Professional Profiles Section */}
        <section
          id="contact"
          className="scroll-mt-20 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F1623] py-20 lg:py-24 transition-colors"
        >
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Direct Profiles & Contact Details */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                    Connect
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] text-balance">
                    Open to entry-level Data Analyst &amp; AI/ML roles.
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                    Reach out for analytics roles, project collaborations, or technical discussions.
                    My full resume is available to preview or download directly below.
                  </p>
                </div>

                <div className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B] border-y border-[#E2E8F0] dark:border-[#1E293B]">
                  {/* LinkedIn */}
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Linkedin className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">LinkedIn</div>
                        <div className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] transition-colors truncate">
                          {PROFILE.linkedinHandle}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] shrink-0" />
                  </a>

                  {/* GitHub */}
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Github className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">GitHub</div>
                        <div className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] transition-colors truncate">
                          {PROFILE.githubHandle}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] shrink-0" />
                  </a>

                  {/* Email with Copy Action */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">Email</div>
                        <a
                          href={`mailto:${PROFILE.email}`}
                          className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#1D4ED8] dark:hover:text-[#60A5FA] transition-colors truncate block"
                        >
                          {PROFILE.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#334155] dark:text-[#E2E8F0] bg-[#F8FAFC] dark:bg-[#161F30] border border-[#E2E8F0] dark:border-[#334155] rounded-md hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-[#60A5FA]" />
                          <span className="text-[#1D4ED8] dark:text-[#60A5FA]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Phone */}
                  <a
                    href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                    className="py-4 flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Phone className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                      <div>
                        <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">Phone</div>
                        <div className="text-sm font-mono font-medium text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] transition-colors tabular-nums">
                          {PROFILE.phone}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] group-hover:text-[#1D4ED8] dark:group-hover:text-[#60A5FA] shrink-0" />
                  </a>

                  {/* Location */}
                  <div className="py-4 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8] shrink-0" />
                    <div>
                      <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">Location</div>
                      <div className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                        {PROFILE.location}, India
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsResumeOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] bg-[#F8FAFC] dark:bg-[#161F30] border border-[#CBD5E1] dark:border-[#334155] rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Preview Resume</span>
                  </button>
                  <a
                    href={RESUME_PDF_PATH}
                    download="Malayaranjan_Nayak_Data_Analyst_AI_ML_Resume.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#1D4ED8] dark:text-[#60A5FA] hover:text-[#1E40AF] dark:hover:text-[#93C5FD] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Direct Message Form */}
              <div className="lg:col-span-7">
                <div className="bg-[#F8F9FA] dark:bg-[#0B111E] border border-[#E2E8F0] dark:border-[#1E293B] rounded-2xl p-6 sm:p-8 transition-colors">
                  <div className="pb-6 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                    <h3 className="font-display text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                      Send a Direct Message
                    </h3>
                    <p className="text-sm text-[#475569] dark:text-[#CBD5E1] mt-1">
                      Compose your note below and launch it directly in your email client addressed
                      to {PROFILE.email}.
                    </p>
                  </div>

                  <form onSubmit={handleContactSubmit} className="mt-6 space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
                        >
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={senderName}
                          onChange={(e) => {
                            setSenderName(e.target.value);
                            if (formSubmitted) setFormSubmitted(false);
                          }}
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#0F1623] border border-[#CBD5E1] dark:border-[#334155] rounded-lg text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#1D4ED8] dark:focus:border-[#60A5FA] focus:ring-2 focus:ring-[#1D4ED8]/15 dark:focus:ring-[#60A5FA]/20 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
                        >
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={senderEmail}
                          onChange={(e) => {
                            setSenderEmail(e.target.value);
                            if (formSubmitted) setFormSubmitted(false);
                          }}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#0F1623] border border-[#CBD5E1] dark:border-[#334155] rounded-lg text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#1D4ED8] dark:focus:border-[#60A5FA] focus:ring-2 focus:ring-[#1D4ED8]/15 dark:focus:ring-[#60A5FA]/20 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={messageBody}
                        onChange={(e) => {
                          setMessageBody(e.target.value);
                          if (formSubmitted) setFormSubmitted(false);
                        }}
                        placeholder="Share details about the Data Analyst / AI-ML opportunity or project..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#0F1623] border border-[#CBD5E1] dark:border-[#334155] rounded-lg text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#1D4ED8] dark:focus:border-[#60A5FA] focus:ring-2 focus:ring-[#1D4ED8]/15 dark:focus:ring-[#60A5FA]/20 transition-colors resize-y"
                      />
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="text-sm text-[#B91C1C] dark:text-[#FCA5A5] bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FECACA] dark:border-[#991B1B] rounded-lg px-4 py-2.5"
                      >
                        {formError}
                      </div>
                    )}

                    {formSubmitted ? (
                      <div className="bg-white dark:bg-[#0F1623] border border-[#BFDBFE] dark:border-[#1E3A8A] rounded-xl p-5 space-y-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                          <Check className="w-4 h-4 text-[#1D4ED8] dark:text-[#60A5FA]" />
                          <span>Message draft ready to send</span>
                        </div>
                        <p className="text-xs leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                          Your message is prepared for {PROFILE.email}. Open it in your default
                          email client or reset to edit.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <a
                            href={mailtoHref}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1D4ED8] dark:bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] dark:hover:bg-[#3B82F6] transition-colors whitespace-nowrap shrink-0"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Open in Email Client</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setSenderName('');
                              setSenderEmail('');
                              setMessageBody('');
                              setFormSubmitted(false);
                            }}
                            className="px-4 py-2.5 text-sm font-medium text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
                          >
                            Reset Form
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                        <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                          Replies typically within 24 hours.
                        </span>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#1D4ED8] dark:bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] dark:hover:bg-[#3B82F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] dark:focus-visible:outline-[#60A5FA]"
                        >
                          <span>Prepare Email</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8F9FA] dark:bg-[#090D16] transition-colors">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">
              © 2026 {PROFILE.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>{PROFILE.role}</span>
            <span aria-hidden="true">·</span>
            <span>{PROFILE.location}</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="hover:text-[#0F172A] dark:hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#biography"
              className="hover:text-[#0F172A] dark:hover:text-white transition-colors"
            >
              Biography
            </a>
            <a
              href="#skills"
              className="hover:text-[#0F172A] dark:hover:text-white transition-colors"
            >
              Skills
            </a>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F172A] dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F172A] dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
