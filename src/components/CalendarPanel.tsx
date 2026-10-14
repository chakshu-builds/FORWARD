import React, { useState } from 'react';
import type { EventItem } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EventThumbnail } from './EventThumbnail';

interface CalendarPanelProps {
  events: EventItem[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onOpenEvent: (event: EventItem) => void;
}

export const CalendarPanel: React.FC<CalendarPanelProps> = ({
  events,
  selectedDate,
  onSelectDate,
  onOpenEvent
}) => {
  // Calendar month/year navigation state
  const [currentMonth, setCurrentMonth] = useState<number>(selectedDate.getMonth()); // 9 for October (0-indexed)
  const [currentYear, setCurrentYear] = useState<number>(selectedDate.getFullYear()); // 2026

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

  // Generate days grid for currentMonth/currentYear
  // Weekday 0 = Monday, ..., 6 = Sunday
  const getDaysGrid = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    // getDay returns 0 for Sunday, 1 for Monday... We want Monday = 0
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days: { day: number; isCurrentMonth: boolean; date: Date }[] = [];

    // Previous month filler days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevDate = new Date(currentYear, currentMonth - 1, d);
      days.push({ day: d, isCurrentMonth: false, date: prevDate });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      days.push({ day: i, isCurrentMonth: true, date });
    }

    // Next month filler days (fill to 35 or 42 days)
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(currentYear, currentMonth + 1, i);
      days.push({ day: i, isCurrentMonth: false, date: nextDate });
    }

    return days;
  };

  const calendarDays = getDaysGrid();

  // Helper to check if a date has events
  const getEventDotForDate = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const matchingEvent = events.find((e) => e.eventStartDate.startsWith(dateStr));
    if (!matchingEvent) return null;

    if (matchingEvent.status === 'In Progress') return 'dot-blue';
    if (matchingEvent.status === 'Registered') return 'dot-green';
    if (matchingEvent.status === 'Interested') return 'dot-purple';
    return 'dot-orange';
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Find next event for selected date (defaults to Product Sprint if Oct 14)
  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const nextEventForDay = events.find((e) => e.eventStartDate.startsWith(selectedDateStr)) || events[0];

  return (
    <div className="dashboard-panel calendar-panel">
      {/* Month Navigation Header */}
      <div className="calendar-header-row">
        <h3 className="calendar-month-title">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="calendar-nav-buttons">
          <button className="cal-nav-btn" onClick={handlePrevMonth} aria-label="Previous month">
            <ChevronLeft size={16} />
          </button>
          <button className="cal-nav-btn" onClick={handleNextMonth} aria-label="Next month">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekday Row */}
      <div className="calendar-weekdays-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="cal-weekday-cell">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="calendar-days-grid">
        {calendarDays.map((item, idx) => {
          const isSelected = isSameDay(item.date, selectedDate);
          const dotClass = getEventDotForDate(item.date);

          return (
            <div
              key={idx}
              className={`cal-day-cell ${!item.isCurrentMonth ? 'other-month' : ''} ${isSelected ? 'selected-day' : ''}`}
              onClick={() => onSelectDate(item.date)}
            >
              <span className="cal-day-number">{item.day}</span>
              {dotClass && <span className={`cal-event-dot ${dotClass}`} />}
            </div>
          );
        })}
      </div>

      {/* Next Event Sub-card under calendar */}
      {nextEventForDay && (
        <div
          className="calendar-next-event-card"
          onClick={() => onOpenEvent(nextEventForDay)}
          role="button"
          tabIndex={0}
        >
          <div className="next-event-label">Next Event</div>
          <div className="next-event-row">
            <EventThumbnail type={nextEventForDay.thumbnailType || 'default'} size={40} />
            <div className="next-event-info">
              <div className="next-event-title">{nextEventForDay.title}</div>
              <div className="next-event-time">
                Today, {nextEventForDay.timeRange || '10:00 AM – 5:00 PM'}
              </div>
              <div className="next-event-venue">{nextEventForDay.venue}</div>
            </div>
            <ChevronRight size={16} className="chevron-icon" />
          </div>
        </div>
      )}
    </div>
  );
};
