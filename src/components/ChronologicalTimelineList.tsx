import React, { useState, useRef, useEffect } from 'react';
import type { EventItem, EventStatus } from '../types';
import { Clock3, MapPin, MoreVertical, Eye, Edit3, Trash2, CheckSquare } from 'lucide-react';
import { EventThumbnail } from './EventThumbnail';

interface ChronologicalTimelineListProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onUpdateStatus: (eventId: string, newStatus: EventStatus) => void;
  onRemoveEvent: (eventId: string) => void;
}

export const ChronologicalTimelineList: React.FC<ChronologicalTimelineListProps> = ({
  events,
  onSelectEvent,
  onUpdateStatus,
  onRemoveEvent
}) => {
  const [activeMenuEventId, setActiveMenuEventId] = useState<string | null>(null);
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState<EventItem | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close 3-dot menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuEventId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Chronological grouping
  const groupedEvents: {
    groupKey: string;
    groupLabel: string;
    groupDateRange: string;
    items: EventItem[];
  }[] = [
    {
      groupKey: 'today',
      groupLabel: 'Today',
      groupDateRange: 'Tue, 14 Oct 2026',
      items: events.filter(
        (e) =>
          e.timelineGroup === 'Today' ||
          e.eventStartDate.startsWith('2026-10-14')
      )
    },
    {
      groupKey: 'tomorrow',
      groupLabel: 'Tomorrow',
      groupDateRange: 'Wed, 15 Oct 2026',
      items: events.filter(
        (e) =>
          e.timelineGroup === 'Tomorrow' ||
          e.eventStartDate.startsWith('2026-10-15')
      )
    },
    {
      groupKey: 'this-week',
      groupLabel: 'This Week',
      groupDateRange: '16 – 19 Oct 2026',
      items: events.filter(
        (e) =>
          e.timelineGroup === 'This Week' ||
          ['2026-10-16', '2026-10-17', '2026-10-18', '2026-10-19'].some((d) =>
            e.eventStartDate.startsWith(d)
          )
      )
    },
    {
      groupKey: 'later-this-month',
      groupLabel: 'Later This Month',
      groupDateRange: '20 – 31 Oct 2026',
      items: events.filter((e) => {
        if (e.timelineGroup === 'Later This Month') return true;
        const d = new Date(e.eventStartDate);
        return d.getMonth() === 9 && d.getDate() >= 20;
      })
    }
  ];

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

  const getDeadlineColorClass = (daysLeft?: number) => {
    if (daysLeft === undefined) return 'deadline-neutral';
    if (daysLeft <= 3) return 'deadline-urgent'; // red/orange
    if (daysLeft <= 7) return 'deadline-approaching'; // orange
    return 'deadline-normal'; // green
  };

  return (
    <div className="chronological-timeline-container" ref={menuRef}>
      {/* Continuous Vertical Timeline Line */}
      <div className="timeline-vertical-spine" />

      {groupedEvents.map((group) => {
        if (group.items.length === 0) return null;

        return (
          <div key={group.groupKey} className="timeline-group-section">
            {/* Group Header */}
            <div className="timeline-group-header">
              <div className="timeline-group-node" />
              <div className="timeline-group-title-col">
                <span className="timeline-group-label">{group.groupLabel}</span>
                <span className="timeline-group-date">{group.groupDateRange}</span>
              </div>
              <span className="timeline-group-count">
                {group.items.length} {group.items.length === 1 ? 'event' : 'events'}
              </span>
            </div>

            {/* Event Rows in this group */}
            <div className="timeline-group-rows">
              {group.items.map((evt) => {
                const dateObj = evt.dateLabel || {
                  month: new Date(evt.eventStartDate).toLocaleString('en-US', { month: 'short' }).toUpperCase(),
                  day: String(new Date(evt.eventStartDate).getDate()).padStart(2, '0')
                };

                const isMenuOpen = activeMenuEventId === evt.id;

                return (
                  <div
                    key={evt.id}
                    className="timeline-event-card"
                    onClick={() => onSelectEvent(evt)}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Small Node on Line */}
                    <div className="timeline-item-node" />

                    {/* Date Block */}
                    <div className="event-date-box">
                      <span className="event-date-month">{dateObj.month}</span>
                      <span className="event-date-day">{dateObj.day}</span>
                    </div>

                    {/* Thumbnail */}
                    <EventThumbnail type={evt.thumbnailType || 'default'} size={44} />

                    {/* Title, Organizer & Tags */}
                    <div className="event-main-col">
                      <div className="event-title-text">{evt.title}</div>
                      <div className="event-organizer-text">{evt.organizer}</div>
                      <div className="event-tags-row">
                        {evt.tags.map((tag) => (
                          <span key={tag} className="event-tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Time & Venue */}
                    <div className="event-meta-col">
                      <div className="event-meta-line">
                        <Clock3 size={14} className="event-meta-icon" />
                        <span>{evt.timeRange || '10:00 AM – 5:00 PM'}</span>
                      </div>
                      <div className="event-meta-line">
                        <MapPin size={14} className="event-meta-icon" />
                        <span>{evt.venue}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="event-status-col">
                      {getStatusBadge(evt.status)}
                    </div>

                    {/* Deadline Countdown */}
                    <div className="event-deadline-col">
                      <span className={`deadline-days-text ${getDeadlineColorClass(evt.deadlineDaysLeft)}`}>
                        {evt.deadlineDaysLeft !== undefined ? `${evt.deadlineDaysLeft} days left` : 'Upcoming'}
                      </span>
                      <span className="deadline-date-text">
                        {evt.deadlineFormatted || 'Cutoff TBA'}
                      </span>
                    </div>

                    {/* Three-Dot Menu Action */}
                    <div
                      className="event-actions-col"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuEventId(isMenuOpen ? null : evt.id);
                      }}
                    >
                      <button
                        className="event-menu-trigger-btn"
                        aria-label="Event actions"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <div
                          className="event-row-dropdown"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="event-dropdown-item"
                            onClick={() => {
                              setActiveMenuEventId(null);
                              onSelectEvent(evt);
                            }}
                          >
                            <Eye size={14} />
                            <span>View Details</span>
                          </button>
                          <button
                            className="event-dropdown-item"
                            onClick={() => {
                              setActiveMenuEventId(null);
                              onSelectEvent(evt);
                            }}
                          >
                            <Edit3 size={14} />
                            <span>Edit Event</span>
                          </button>
                          <button
                            className="event-dropdown-item"
                            onClick={() => {
                              const nextStatus = evt.status === 'Registered' ? 'In Progress' : 'Registered';
                              onUpdateStatus(evt.id, nextStatus);
                              setActiveMenuEventId(null);
                            }}
                          >
                            <CheckSquare size={14} />
                            <span>Toggle Status ({evt.status === 'Registered' ? 'In Progress' : 'Registered'})</span>
                          </button>
                          <div className="dropdown-divider" />
                          <button
                            className="event-dropdown-item text-red"
                            onClick={() => {
                              setActiveMenuEventId(null);
                              setConfirmDeleteEvent(evt);
                            }}
                          >
                            <Trash2 size={14} />
                            <span>Remove from Timeline</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Confirmation Modal for Removing an Event */}
      {confirmDeleteEvent && (
        <div className="modal-backdrop" onClick={() => setConfirmDeleteEvent(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Remove Event from Timeline?</h3>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
                Are you sure you want to remove <strong>"{confirmDeleteEvent.title}"</strong>? This will remove it from your timeline and calendar view.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => setConfirmDeleteEvent(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary btn-sm"
                style={{ backgroundColor: '#dc2626' }}
                onClick={() => {
                  onRemoveEvent(confirmDeleteEvent.id);
                  setConfirmDeleteEvent(null);
                }}
              >
                Remove Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
