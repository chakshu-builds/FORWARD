import React, { useState } from 'react';
import type { EventItem } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EventThumbnail } from './EventThumbnail';

interface TimelineCalendarViewProps {
  events: EventItem[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onOpenEvent: (event: EventItem) => void;
}

export const TimelineCalendarView: React.FC<TimelineCalendarViewProps> = ({
  events,
  selectedDate,
  onSelectDate,
  onOpenEvent
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(selectedDate.getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const firstDay = new Date(currentYear, currentMonth, 1);
  let startDayOfWeek = firstDay.getDay() - 1;
  if (startDayOfWeek === -1) startDayOfWeek = 6;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const days: { day: number; isCurrentMonth: boolean; date: Date }[] = [];

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    days.push({ day: d, isCurrentMonth: false, date: new Date(currentYear, currentMonth - 1, d) });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true, date: new Date(currentYear, currentMonth, i) });
  }

  const remaining = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isCurrentMonth: false, date: new Date(currentYear, currentMonth + 1, i) });
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return events.filter((e) => e.eventStartDate.startsWith(dateStr));
  };

  const isSelectedDay = (d: Date) => {
    return (
      d.getFullYear() === selectedDate.getFullYear() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getDate() === selectedDate.getDate()
    );
  };

  return (
    <div className="dashboard-panel full-calendar-view">
      <div className="panel-header-row" style={{ marginBottom: '18px' }}>
        <h2 className="panel-title">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="calendar-nav-buttons">
          <button className="cal-nav-btn" onClick={handlePrevMonth} aria-label="Previous month">
            <ChevronLeft size={16} />
          </button>
          <button className="cal-nav-btn" onClick={handleNextMonth} aria-label="Next month">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="full-cal-weekdays">
        {daysOfWeek.map((day) => (
          <div key={day} className="full-cal-weekday-header">
            {day}
          </div>
        ))}
      </div>

      <div className="full-cal-grid">
        {days.map((item, idx) => {
          const dayEvents = getEventsForDate(item.date);
          const isSelected = isSelectedDay(item.date);

          return (
            <div
              key={idx}
              className={`full-cal-cell ${!item.isCurrentMonth ? 'other-month' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectDate(item.date)}
            >
              <div className="full-cal-cell-header">
                <span className={`full-cal-day-num ${isSelected ? 'selected-pill' : ''}`}>
                  {item.day}
                </span>
                {dayEvents.length > 0 && (
                  <span className="full-cal-count-badge">{dayEvents.length}</span>
                )}
              </div>

              <div className="full-cal-events-stack">
                {dayEvents.slice(0, 2).map((evt) => (
                  <div
                    key={evt.id}
                    className="full-cal-event-chip"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEvent(evt);
                    }}
                    title={`${evt.title} (${evt.timeRange || evt.venue})`}
                  >
                    <EventThumbnail type={evt.thumbnailType || 'default'} size={14} />
                    <span className="chip-text">{evt.title}</span>
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="full-cal-more-chip">+{dayEvents.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
