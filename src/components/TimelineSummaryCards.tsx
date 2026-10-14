import React from 'react';
import { Calendar, Clock3, Bookmark, FileText, ArrowUp } from 'lucide-react';

interface TimelineSummaryCardsProps {
  totalCount: number;
  upcomingCount: number;
  registeredCount: number;
  deadlinesCount: number;
  activeFilter: string | null;
  onSelectFilter: (filter: 'all' | 'upcoming' | 'registered' | 'deadlines') => void;
}

export const TimelineSummaryCards: React.FC<TimelineSummaryCardsProps> = ({
  totalCount,
  upcomingCount,
  registeredCount,
  deadlinesCount,
  activeFilter,
  onSelectFilter
}) => {
  return (
    <div className="metrics-grid timeline-summary-cards">
      {/* 1. All Events */}
      <div
        className={`metric-card clickable ${activeFilter === 'all' ? 'active-filter-card' : ''}`}
        onClick={() => onSelectFilter('all')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left">
          <div className="metric-icon-box bg-blue-tint">
            <Calendar size={22} className="text-blue" strokeWidth={2} />
          </div>
          <div className="metric-data-col">
            <span className="metric-number">{totalCount}</span>
            <span className="metric-label">All Events</span>
          </div>
        </div>
      </div>

      {/* 2. Upcoming */}
      <div
        className={`metric-card clickable ${activeFilter === 'upcoming' ? 'active-filter-card' : ''}`}
        onClick={() => onSelectFilter('upcoming')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left">
          <div className="metric-icon-box bg-orange-tint">
            <Clock3 size={22} className="text-orange" strokeWidth={2} />
          </div>
          <div className="metric-data-col">
            <span className="metric-number">{upcomingCount}</span>
            <span className="metric-label">Upcoming</span>
          </div>
        </div>
        <div className="metric-change-pill pill-green">
          <ArrowUp size={12} strokeWidth={2.5} />
          <span>2</span>
        </div>
      </div>

      {/* 3. Registered */}
      <div
        className={`metric-card clickable ${activeFilter === 'registered' ? 'active-filter-card' : ''}`}
        onClick={() => onSelectFilter('registered')}
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
        <div className="metric-change-pill pill-green">
          <ArrowUp size={12} strokeWidth={2.5} />
          <span>1</span>
        </div>
      </div>

      {/* 4. Deadlines This Week */}
      <div
        className={`metric-card clickable ${activeFilter === 'deadlines' ? 'active-filter-card' : ''}`}
        onClick={() => onSelectFilter('deadlines')}
        role="button"
        tabIndex={0}
      >
        <div className="metric-card-left">
          <div className="metric-icon-box bg-red-tint">
            <FileText size={22} className="text-red" strokeWidth={2} />
          </div>
          <div className="metric-data-col">
            <span className="metric-number">{deadlinesCount}</span>
            <span className="metric-label">Deadlines This Week</span>
          </div>
        </div>
        <div className="metric-change-pill pill-red">
          <ArrowUp size={12} strokeWidth={2.5} />
          <span>1</span>
        </div>
      </div>
    </div>
  );
};
