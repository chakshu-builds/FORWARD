import type { EventItem } from '../types';
import { Clock, AlertTriangle, ArrowUpRight, CheckSquare, MapPin } from 'lucide-react';

interface NextDeadlineHeroProps {
  event: EventItem | undefined;
  onOpenDetails: (event: EventItem) => void;
}

export const NextDeadlineHero: React.FC<NextDeadlineHeroProps> = ({ event, onOpenDetails }) => {
  if (!event) return null;

  return (
    <div className="next-deadline-card">
      <div className="next-deadline-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span className="deadline-badge-urgent">
            <AlertTriangle size={13} />
            Next Critical Deadline
          </span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Action required within 24 hours
          </span>
        </div>

        <div className="countdown-box">
          <Clock size={15} style={{ color: '#f43f5e' }} />
          <span>Due: Tomorrow, 11:59 PM IST (18 hrs left)</span>
        </div>
      </div>

      <h2 className="deadline-title">{event.title}</h2>
      <div className="deadline-organizer">
        <span>Organized by {event.organizer}</span>
        <span>•</span>
        <span style={{ color: '#38bdf8' }}>Status: {event.status}</span>
      </div>

      <div className="deadline-actions-row">
        <div className="deadline-specs-list">
          <div className="deadline-spec-item">
            <MapPin size={14} style={{ color: '#818cf8' }} />
            <span>Venue: <strong>{event.venue}</strong></span>
          </div>
          <div className="deadline-spec-item">
            <CheckSquare size={14} style={{ color: '#34d399' }} />
            <span>Tasks: <strong>{event.tasks.filter(t => t.completed).length}/{event.tasks.length} Completed</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            className="btn-secondary btn-sm"
            onClick={() => onOpenDetails(event)}
          >
            <span>Review Checklist</span>
          </button>
          <button
            className="btn-primary btn-sm"
            onClick={() => onOpenDetails(event)}
          >
            <span>View Details</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
