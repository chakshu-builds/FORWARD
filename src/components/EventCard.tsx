import type { EventItem } from '../types';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  onOpenDetails: (event: EventItem) => void;
  onOpenConflict: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onOpenDetails,
  onOpenConflict,
}) => {
  const hasPendingConflict = event.conflict && event.conflict.status === 'Pending';
  const completedTasks = event.tasks.filter((t) => t.completed).length;
  const totalTasks = event.tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Format date helper
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return isoString;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Registered': return 'badge-status-Registered';
      case 'Interested': return 'badge-status-Interested';
      case 'In Progress': return 'badge-status-InProgress';
      case 'Submitted': return 'badge-status-Submitted';
      default: return 'badge-category';
    }
  };

  return (
    <article
      className={`event-card ${hasPendingConflict ? 'has-conflict' : ''}`}
      onClick={() => onOpenDetails(event)}
    >
      <div className="event-card-header">
        <div className="event-card-badges">
          <span className={`badge ${getStatusClass(event.status)}`}>
            {event.status}
          </span>
          <span className="badge badge-category">
            {event.category}
          </span>
          <span className="badge badge-source">
            <FileText size={11} />
            {event.sourceNotice.channel}
          </span>
          {hasPendingConflict && (
            <span className="badge badge-conflict">
              <AlertCircle size={11} />
              Discrepancy Detected
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#94a3b8' }}>
          <span>{event.daysRemaining > 0 ? `${event.daysRemaining}d until cutoff` : 'Active'}</span>
          <ChevronRight size={14} />
        </div>
      </div>

      <h3 className="event-card-title">{event.title}</h3>
      <p className="event-card-organizer">{event.organizer}</p>

      <div className="event-card-meta-grid">
        <div className="meta-item">
          <Clock size={13} style={{ color: '#f59e0b' }} />
          <span>Reg. Deadline: <strong>{formatDate(event.registrationDeadline)}</strong></span>
        </div>
        <div className="meta-item">
          <Calendar size={13} style={{ color: '#6366f1' }} />
          <span>Event Dates: <strong>{formatDate(event.eventStartDate)}</strong></span>
        </div>
        <div className="meta-item">
          <Clock size={13} style={{ color: '#38bdf8' }} />
          <span>Reporting: <strong>{event.reportingTime}</strong></span>
        </div>
        <div className="meta-item">
          <MapPin size={13} style={{ color: '#10b981' }} />
          <span>Venue: <strong>{event.venue}</strong></span>
        </div>
      </div>

      {hasPendingConflict && (
        <div
          className="conflict-callout-strip"
          onClick={(e) => {
            e.stopPropagation();
            onOpenConflict(event);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={14} />
            <span>Conflicting notice detected regarding <strong>{event.conflict?.fieldLabel}</strong></span>
          </div>
          <button
            className="btn-secondary btn-sm"
            style={{ borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fef08a' }}
            onClick={(e) => {
              e.stopPropagation();
              onOpenConflict(event);
            }}
          >
            Resolve Discrepancy →
          </button>
        </div>
      )}

      <div className="event-card-footer">
        <div className="task-progress-mini">
          <CheckCircle2 size={13} style={{ color: progressPercent === 100 ? '#10b981' : '#64748b' }} />
          <span>Action Checklist: {completedTasks}/{totalTasks} ({progressPercent}%)</span>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <span style={{ color: '#818cf8', fontWeight: 500 }}>
          View details & source →
        </span>
      </div>
    </article>
  );
};
