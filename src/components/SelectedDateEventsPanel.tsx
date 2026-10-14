import React from 'react';
import type { EventItem } from '../types';
import { ChevronRight } from 'lucide-react';
import { EventThumbnail } from './EventThumbnail';

interface SelectedDateEventsPanelProps {
  selectedDate: Date;
  events: EventItem[];
  onOpenEvent: (event: EventItem) => void;
}

export const SelectedDateEventsPanel: React.FC<SelectedDateEventsPanelProps> = ({
  selectedDate,
  events,
  onOpenEvent
}) => {
  // Format selected date label e.g. "Tue, 14 Oct 2026"
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  const matchingEvents = events.filter((e) => e.eventStartDate.startsWith(selectedDateStr));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <span className="status-badge badge-in-progress">In Progress</span>;
      case 'Registered':
        return <span className="status-badge badge-registered">Registered</span>;
      case 'Interested':
        return <span className="status-badge badge-interested">Interested</span>;
      case 'Open':
        return <span className="status-badge badge-open">Open</span>;
      case 'Not Registered':
        return <span className="status-badge badge-not-registered">Not Registered</span>;
      default:
        return <span className="status-badge badge-in-progress">{status}</span>;
    }
  };

  return (
    <div className="dashboard-panel selected-date-panel">
      {/* Panel Header */}
      <div className="panel-header-row">
        <h3 className="panel-sub-title">Events on {formattedDate}</h3>
        <span className="selected-date-count">
          {matchingEvents.length} {matchingEvents.length === 1 ? 'event' : 'events'}
        </span>
      </div>

      {/* Events List */}
      <div className="selected-date-list">
        {matchingEvents.length === 0 ? (
          <div className="empty-date-state">
            <p>No events scheduled for {formattedDate}.</p>
          </div>
        ) : (
          matchingEvents.map((evt) => (
            <div
              key={evt.id}
              className="selected-date-row-item"
              onClick={() => onOpenEvent(evt)}
              role="button"
              tabIndex={0}
            >
              <EventThumbnail type={evt.thumbnailType || 'default'} size={38} />

              <div className="selected-date-text-col">
                <span className="selected-date-title">{evt.title}</span>
                <span className="selected-date-org">{evt.organizer}</span>
                <span className="selected-date-meta">
                  {evt.timeRange || '10:00 AM – 5:00 PM'}, {evt.venue}
                </span>
              </div>

              <div className="selected-date-right-col">
                {getStatusBadge(evt.status)}
                <ChevronRight size={15} className="chevron-icon" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
