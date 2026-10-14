import React, { useState } from 'react';
import type { EventItem } from '../types';
import { Clock3, MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import { EventThumbnail } from './EventThumbnail';

interface UpcomingEventsSectionProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onViewAll: () => void;
}

export const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({
  events,
  onSelectEvent,
  onViewAll
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Hackathons',
    'Workshops',
    'Competitions',
    'Internships',
    'Conferences'
  ];

  // Filter events by selected category tab
  const filteredEvents = events.filter((evt) => {
    if (activeCategory === 'All') return true;
    const cat = evt.category;
    if (activeCategory === 'Hackathons') return cat === 'Hackathons' || cat === 'Hackathon';
    if (activeCategory === 'Workshops') return cat === 'Workshops' || cat === 'Workshop';
    if (activeCategory === 'Competitions') return cat === 'Competitions' || cat === 'Competition';
    if (activeCategory === 'Internships') return cat === 'Internships' || cat === 'Internship';
    if (activeCategory === 'Conferences') return cat === 'Conferences' || cat === 'Conference';
    return true;
  });

  // Display top 5 events like in the reference image
  const displayEvents = filteredEvents.slice(0, 5);

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
      default:
        return <span className="status-badge badge-in-progress">{status}</span>;
    }
  };

  return (
    <div className="dashboard-panel upcoming-events-panel">
      {/* Panel Header */}
      <div className="panel-header-row">
        <h2 className="panel-title">Upcoming Events</h2>
        <button className="panel-view-all-btn" onClick={onViewAll}>
          <span>View All</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Rows */}
      <div className="event-rows-list">
        {displayEvents.length === 0 ? (
          <div className="empty-state-notice">
            <p>No events found for category "{activeCategory}".</p>
          </div>
        ) : (
          displayEvents.map((evt) => {
            const dateObj = evt.dateLabel || {
              month: new Date(evt.eventStartDate).toLocaleString('en-US', { month: 'short' }).toUpperCase(),
              day: String(new Date(evt.eventStartDate).getDate()).padStart(2, '0')
            };

            return (
              <div
                key={evt.id}
                className="event-row-card"
                onClick={() => onSelectEvent(evt)}
                role="button"
                tabIndex={0}
              >
                {/* 1. Date Box */}
                <div className="event-date-box">
                  <span className="event-date-month">{dateObj.month}</span>
                  <span className="event-date-day">{dateObj.day}</span>
                </div>

                {/* 2. Thumbnail */}
                <EventThumbnail type={evt.thumbnailType || 'default'} size={44} />

                {/* 3. Title & Tags Info */}
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

                {/* 4. Time & Venue Info */}
                <div className="event-meta-col">
                  <div className="event-meta-line">
                    <Clock3 size={14} className="event-meta-icon" />
                    <span>{evt.timeRange || evt.reportingTime || 'Time TBA'}</span>
                  </div>
                  <div className="event-meta-line">
                    <MapPin size={14} className="event-meta-icon" />
                    <span>{evt.venue}</span>
                  </div>
                </div>

                {/* 5. Status Badge */}
                <div className="event-status-col">
                  {getStatusBadge(evt.status)}
                </div>

                {/* 6. Chevron */}
                <div className="event-chevron-col">
                  <ChevronRight size={18} className="event-chevron-icon" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
