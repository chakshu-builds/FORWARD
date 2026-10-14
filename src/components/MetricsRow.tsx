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
        className="metric-card clickable"
        onClick={() => onCardClick?.('upcoming')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left">
          <div className="metric-icon-box bg-blue-tint">
            <Calendar size={22} className="text-blue" strokeWidth={2} />
          </div>
          <div className="metric-data-col">
            <span className="metric-number">{upcomingCount}</span>
            <span className="metric-label">Upcoming events</span>
          </div>
        </div>
        <div className="metric-change-pill pill-green">
          <ArrowUp size={12} strokeWidth={2.5} />
          <span>2</span>
        </div>
      </div>

      {/* 2. Deadlines this week */}
      <div
        className="metric-card clickable"
        onClick={() => onCardClick?.('deadlines')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left">
          <div className="metric-icon-box bg-orange-tint">
            <Clock3 size={22} className="text-orange" strokeWidth={2} />
          </div>
          <div className="metric-data-col">
            <span className="metric-number">{deadlinesCount}</span>
            <span className="metric-label">Deadlines this week</span>
          </div>
        </div>
        <div className="metric-change-pill pill-red">
          <ArrowUp size={12} strokeWidth={2.5} />
          <span>1</span>
        </div>
      </div>

      {/* 3. Needs review */}
      <div
        className="metric-card clickable"
        onClick={() => onCardClick?.('needs-review')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left">
          <div className="metric-icon-box bg-red-tint">
            <FileText size={22} className="text-red" strokeWidth={2} />
          </div>
          <div className="metric-data-col">
            <span className="metric-number">{needsReviewCount}</span>
            <span className="metric-label">Needs review</span>
          </div>
        </div>
        <div className="metric-change-pill pill-red">
          <ArrowUp size={12} strokeWidth={2.5} />
          <span>1</span>
        </div>
      </div>

      {/* 4. Registered */}
      <div
        className="metric-card clickable"
        onClick={() => onCardClick?.('registered')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left">
          <div className="metric-icon-box bg-green-tint">
            <Bookmark size={22} className="text-green" strokeWidth={2} />
          </div>
          <div className="metric-data-col">
            <span className="metric-number">{registeredCount}</span>
            <span className="metric-label">Registered</span>
          </div>
        </div>
        <div className="metric-action-arrow">
          <ArrowRight size={16} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};
