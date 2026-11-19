import React from 'react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectVisualProps {
  type: ProjectItem['visualType'];
  compact?: boolean;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ type, compact = false }) => {
  const heightClass = compact ? 'h-48' : 'h-56 sm:h-60';

  if (type === 'sales-dashboard') {
    return (
      <div
        className={`relative w-full ${heightClass} bg-[#F8FAFC] dark:bg-[#131B2B] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden p-5 flex flex-col justify-between transition-colors`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
          <span>Revenue &amp; Sales Performance</span>
          <span className="tabular-nums">Q1 – Q4 Trend View</span>
        </div>
        <svg viewBox="0 0 420 140" className="w-full h-36 overflow-visible">
          {[24, 56, 88, 120].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="420"
              y2={y}
              className="stroke-[#E2E8F0] dark:stroke-[#243045]"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          ))}
          {[
            { x: 22, h: 46 },
            { x: 56, h: 58 },
            { x: 90, h: 52 },
            { x: 124, h: 70 },
            { x: 158, h: 66 },
            { x: 192, h: 80 },
            { x: 226, h: 74 },
            { x: 260, h: 92 },
            { x: 294, h: 86 },
            { x: 328, h: 98 },
            { x: 362, h: 106 },
            { x: 396, h: 112 },
          ].map((bar, idx) => (
            <rect
              key={idx}
              x={bar.x - 8}
              y={128 - bar.h}
              width="16"
              height={bar.h}
              rx="2"
              className={
                idx >= 9
                  ? 'fill-[#1D4ED8] dark:fill-[#3B82F6]'
                  : 'fill-[#CBD5E1] dark:fill-[#334155]'
              }
              opacity={idx >= 9 ? 0.92 : 0.78}
            />
          ))}
          <path
            d="M 22 86 L 56 72 L 90 78 L 124 58 L 158 63 L 192 48 L 226 53 L 260 36 L 294 41 L 328 29 L 362 21 L 396 15"
            fill="none"
            className="stroke-[#0F172A] dark:stroke-[#F8FAFC]"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[
            [22, 86],
            [124, 58],
            [260, 36],
            [396, 15],
          ].map(([cx, cy], idx) => (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r="3.5"
              className="fill-white dark:fill-[#0F1623] stroke-[#1D4ED8] dark:stroke-[#60A5FA]"
              strokeWidth="2"
            />
          ))}
        </svg>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] border-t border-[#E2E8F0] dark:border-[#1E293B] pt-2.5">
          <span>SQL Aggregated Layer</span>
          <span>Power BI Visual Model</span>
        </div>
      </div>
    );
  }

  if (type === 'cyber-threat') {
    return (
      <div
        className={`relative w-full ${heightClass} bg-[#0F172A] dark:bg-[#0B111E] border border-[#1E293B] dark:border-[#243045] rounded-xl overflow-hidden p-5 flex flex-col justify-between text-[#E2E8F0] transition-colors`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
          <span>NSL-KDD Intrusion Classification</span>
          <span>Random Forest · Flask</span>
        </div>
        <svg viewBox="0 0 420 140" className="w-full h-36">
          {/* Input features node */}
          <rect x="8" y="48" width="88" height="44" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <text x="52" y="67" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontFamily="IBM Plex Mono">
            NSL-KDD
          </text>
          <text x="52" y="81" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="IBM Plex Mono">
            41 Features
          </text>

          {/* Ensemble trees */}
          {[18, 56, 94].map((y, idx) => (
            <g key={y}>
              <path
                d={`M 96 70 C 122 70, 122 ${y + 14}, 148 ${y + 14}`}
                fill="none"
                stroke="#475569"
                strokeWidth="1.2"
              />
              <rect
                x="148"
                y={y}
                width="98"
                height="28"
                rx="5"
                fill={idx === 1 ? '#2563EB' : '#1E293B'}
                stroke={idx === 1 ? '#60A5FA' : '#334155'}
                strokeWidth="1"
              />
              <text
                x="197"
                y={y + 17}
                textAnchor="middle"
                fill="#F8FAFC"
                fontSize="9.5"
                fontFamily="IBM Plex Mono"
              >
                {`Decision Tree ${idx + 1}`}
              </text>
              <path
                d={`M 246 ${y + 14} C 272 ${y + 14}, 272 70, 296 70`}
                fill="none"
                stroke="#475569"
                strokeWidth="1.2"
              />
            </g>
          ))}

          {/* Classification Output */}
          <rect x="296" y="34" width="116" height="72" rx="6" fill="#1E293B" stroke="#60A5FA" strokeWidth="1.2" />
          <text x="354" y="56" textAnchor="middle" fill="#93C5FD" fontSize="9" fontFamily="IBM Plex Mono">
            Majority Vote
          </text>
          <line x1="312" y1="66" x2="396" y2="66" stroke="#334155" strokeWidth="1" />
          <text x="354" y="81" textAnchor="middle" fill="#F8FAFC" fontSize="9.5" fontFamily="IBM Plex Mono">
            Normal / Anomaly
          </text>
          <text x="354" y="95" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="IBM Plex Mono">
            Flask Alert Feed
          </text>
        </svg>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] border-t border-[#1E293B] pt-2.5">
          <span>Preprocess · Train · Evaluate</span>
          <span>Classification Metrics</span>
        </div>
      </div>
    );
  }

  if (type === 'hireiq-matcher') {
    return (
      <div
        className={`relative w-full ${heightClass} bg-[#F8FAFC] dark:bg-[#131B2B] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden p-5 flex flex-col justify-between transition-colors`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
          <span>HireIQ Semantic Matching Engine</span>
          <span>Resume ↔ Job Description</span>
        </div>
        <div className="grid grid-cols-11 gap-2 items-center my-auto">
          <div className="col-span-4 bg-white dark:bg-[#0F1623] border border-[#E2E8F0] dark:border-[#243045] rounded-lg p-3 space-y-2">
            <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8]">Candidate Resume</div>
            <div className="h-1.5 w-4/5 bg-[#0F172A]/80 dark:bg-[#E2E8F0]/80 rounded-xs" />
            <div className="h-1.5 w-3/5 bg-[#CBD5E1] dark:bg-[#334155] rounded-xs" />
            <div className="h-1.5 w-full bg-[#1D4ED8]/75 dark:bg-[#3B82F6] rounded-xs" />
            <div className="h-1.5 w-2/3 bg-[#CBD5E1] dark:bg-[#334155] rounded-xs" />
          </div>
          <div className="col-span-3 flex flex-col items-center justify-center gap-1.5">
            <div className="w-full h-px bg-[#94A3B8] dark:bg-[#475569]" />
            <div className="px-2 py-1 border border-[#1D4ED8]/30 dark:border-[#60A5FA]/40 bg-[#1D4ED8]/5 dark:bg-[#3B82F6]/15 rounded text-[10px] font-mono text-[#1D4ED8] dark:text-[#93C5FD] whitespace-nowrap">
              Fit Eval
            </div>
            <div className="w-full h-px bg-[#94A3B8] dark:bg-[#475569]" />
          </div>
          <div className="col-span-4 bg-white dark:bg-[#0F1623] border border-[#E2E8F0] dark:border-[#243045] rounded-lg p-3 space-y-2">
            <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8]">Role Criteria</div>
            <div className="h-1.5 w-3/4 bg-[#0F172A]/80 dark:bg-[#E2E8F0]/80 rounded-xs" />
            <div className="h-1.5 w-full bg-[#1D4ED8]/75 dark:bg-[#3B82F6] rounded-xs" />
            <div className="h-1.5 w-4/5 bg-[#CBD5E1] dark:bg-[#334155] rounded-xs" />
            <div className="h-1.5 w-1/2 bg-[#CBD5E1] dark:bg-[#334155] rounded-xs" />
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] border-t border-[#E2E8F0] dark:border-[#1E293B] pt-2.5">
          <span>Skill Extraction · Gap Mapping</span>
          <span>Candidate-Job Fit</span>
        </div>
      </div>
    );
  }

  if (type === 'hr-attrition') {
    const factors = [
      { label: 'Tenure Band', width: '82%', highlight: true },
      { label: 'Role Level', width: '64%', highlight: false },
      { label: 'Department', width: '52%', highlight: false },
      { label: 'Workload', width: '74%', highlight: true },
    ];
    return (
      <div
        className={`relative w-full ${heightClass} bg-[#F8FAFC] dark:bg-[#131B2B] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden p-5 flex flex-col justify-between transition-colors`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
          <span>Attrition Factor Distribution</span>
          <span>HR Exploratory Analysis</span>
        </div>
        <div className="space-y-3 my-auto">
          {factors.map((f) => (
            <div key={f.label} className="grid grid-cols-12 items-center gap-3">
              <span className="col-span-4 text-[11px] font-mono text-[#475569] dark:text-[#CBD5E1] truncate">
                {f.label}
              </span>
              <div className="col-span-8 h-2.5 bg-[#E2E8F0] dark:bg-[#243045] rounded-xs overflow-hidden">
                <div
                  className={`h-full rounded-xs ${
                    f.highlight
                      ? 'bg-[#1D4ED8] dark:bg-[#3B82F6]'
                      : 'bg-[#64748B] dark:bg-[#64748B]'
                  }`}
                  style={{ width: f.width }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] border-t border-[#E2E8F0] dark:border-[#1E293B] pt-2.5">
          <span>Pattern Identification</span>
          <span>Retention Insights</span>
        </div>
      </div>
    );
  }

  if (type === 'ecommerce-orders') {
    return (
      <div
        className={`relative w-full ${heightClass} bg-[#F8FAFC] dark:bg-[#131B2B] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden p-5 flex flex-col justify-between transition-colors`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
          <span>Customer &amp; Order Aggregation</span>
          <span>SQL · Excel</span>
        </div>
        <div className="bg-white dark:bg-[#0B111E] border border-[#E2E8F0] dark:border-[#243045] rounded-lg p-3 font-mono text-[11px] leading-relaxed text-[#334155] dark:text-[#E2E8F0] my-auto">
          <div>
            <span className="text-[#1D4ED8] dark:text-[#60A5FA]">SELECT</span> customer_segment,
          </div>
          <div className="pl-4">
            <span className="text-[#1D4ED8] dark:text-[#60A5FA]">COUNT</span>(order_id){' '}
            <span className="text-[#1D4ED8] dark:text-[#60A5FA]">AS</span> orders,
          </div>
          <div className="pl-4">
            <span className="text-[#1D4ED8] dark:text-[#60A5FA]">SUM</span>(net_amount){' '}
            <span className="text-[#1D4ED8] dark:text-[#60A5FA]">AS</span> revenue
          </div>
          <div>
            <span className="text-[#1D4ED8] dark:text-[#60A5FA]">FROM</span> cleaned_orders
          </div>
          <div>
            <span className="text-[#1D4ED8] dark:text-[#60A5FA]">GROUP BY</span> customer_segment;
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] border-t border-[#E2E8F0] dark:border-[#1E293B] pt-2.5">
          <span>Clean · Aggregate · Summarize</span>
          <span>Purchase Behavior</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${heightClass} bg-[#F8FAFC] dark:bg-[#131B2B] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden p-5 flex flex-col justify-between transition-colors`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
        <span>Wanderlust System Architecture</span>
        <span>Node.js · MongoDB · Render</span>
      </div>
      <div className="grid grid-cols-3 gap-3 my-auto">
        {[
          { title: 'EJS Views', sub: 'Listings & Booking UI' },
          { title: 'Express API', sub: 'Auth & CRUD Routes' },
          { title: 'MongoDB', sub: 'Users & Rentals Store' },
        ].map((node, i) => (
          <div
            key={node.title}
            className={`rounded-lg p-3 border ${
              i === 1
                ? 'bg-[#0F172A] dark:bg-[#2563EB] text-white border-[#0F172A] dark:border-[#3B82F6]'
                : 'bg-white dark:bg-[#0F1623] text-[#0F172A] dark:text-[#F8FAFC] border-[#E2E8F0] dark:border-[#243045]'
            }`}
          >
            <div className="text-[11px] font-mono font-medium">{node.title}</div>
            <div
              className={`text-[10px] mt-1 leading-snug ${
                i === 1 ? 'text-[#CBD5E1] dark:text-blue-100' : 'text-[#64748B] dark:text-[#94A3B8]'
              }`}
            >
              {node.sub}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8] border-t border-[#E2E8F0] dark:border-[#1E293B] pt-2.5">
        <span>Authentication · Listings · Bookings</span>
        <span>Deployed on Render</span>
      </div>
    </div>
  );
};
