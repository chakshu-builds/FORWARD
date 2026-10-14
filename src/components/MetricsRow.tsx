import React from 'react';
import { Calendar, Clock3, FileText, Bookmark, ArrowUp, ArrowRight } from 'lucide-react';

interface MetricsRowProps {
  upcomingCount?: number;
  deadlinesCount?: number;
  needsReviewCount?: number;
  registeredCount?: number;
  onCardClick?: (type: 'upcoming' | 'deadlines' | 'needs-review' | 'registered') => void;
}

export const MetricsRow: React.FC<MetricsRowProps> = ({
  upcomingCount = 12,
  deadlinesCount = 5,
  needsReviewCount = 3,
  registeredCount = 4,
  onCardClick
}) => {
  return (
    <div className="metrics-grid">
      {/* 1. Upcoming events */}
      <div
        className="metric-card clickable transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-pointer select-none"
        onClick={() => onCardClick?.('upcoming')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left flex items-center gap-3.5">
          <div className="metric-icon-box bg-blue-tint flex items-center justify-center shrink-0">
            <Calendar size={22} className="text-blue" strokeWidth={2} />
          </div>
          <div className="metric-data-col flex flex-col">
            <span className="metric-number text-2xl font-bold tracking-tight">{upcomingCount}</span>
            <span className="metric-label text-xs text-slate-500 font-medium">Upcoming events</span>
          </div>
        </div>
        <div className="metric-change-pill pill-green inline-flex items-center gap-0.5 font-semibold">
          <ArrowUp size={12} strokeWidth={2.5} />
          <span>2</span>
        </div>
      </div>

      {/* 2. Deadlines this week */}
      <div
        className="metric-card clickable transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-pointer select-none"
        onClick={() => onCardClick?.('deadlines')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left flex items-center gap-3.5">
          <div className="metric-icon-box bg-orange-tint flex items-center justify-center shrink-0">
            <Clock3 size={22} className="text-orange" strokeWidth={2} />
          </div>
          <div className="metric-data-col flex flex-col">
            <span className="metric-number text-2xl font-bold tracking-tight">{deadlinesCount}</span>
            <span className="metric-label text-xs text-slate-500 font-medium">Deadlines this week</span>
          </div>
        </div>
        <div className="metric-change-pill pill-red inline-flex items-center gap-0.5 font-semibold">
          <ArrowUp size={12} strokeWidth={2.5} />
          <span>1</span>
        </div>
      </div>

      {/* 3. Needs review */}
      <div
        className="metric-card clickable transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-pointer select-none"
        onClick={() => onCardClick?.('needs-review')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left flex items-center gap-3.5">
          <div className="metric-icon-box bg-red-tint flex items-center justify-center shrink-0">
            <FileText size={22} className="text-red" strokeWidth={2} />
          </div>
          <div className="metric-data-col flex flex-col">
            <span className="metric-number text-2xl font-bold tracking-tight">{needsReviewCount}</span>
            <span className="metric-label text-xs text-slate-500 font-medium">Needs review</span>
          </div>
        </div>
        <div className="metric-change-pill pill-red inline-flex items-center gap-0.5 font-semibold">
          <ArrowUp size={12} strokeWidth={2.5} />
          <span>1</span>
        </div>
      </div>

      {/* 4. Registered */}
      <div
        className="metric-card clickable transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-pointer select-none"
        onClick={() => onCardClick?.('registered')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left flex items-center gap-3.5">
          <div className="metric-icon-box bg-green-tint flex items-center justify-center shrink-0">
            <Bookmark size={22} className="text-green" strokeWidth={2} />
          </div>
          <div className="metric-data-col flex flex-col">
            <span className="metric-number text-2xl font-bold tracking-tight">{registeredCount}</span>
            <span className="metric-label text-xs text-slate-500 font-medium">Registered</span>
          </div>
        </div>
        <div className="metric-action-arrow flex items-center justify-center transition-transform group-hover:translate-x-1">
          <ArrowRight size={16} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};
