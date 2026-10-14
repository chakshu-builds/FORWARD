import React, { useState, useMemo } from 'react';
import type { EventItem, EventStatus, PrepTask } from '../types';
import { Plus } from 'lucide-react';
import { TimelineSummaryCards } from './TimelineSummaryCards';
import { TimelineToolbar } from './TimelineToolbar';
import { ChronologicalTimelineList } from './ChronologicalTimelineList';
import { TimelineCalendarView } from './TimelineCalendarView';
import { CalendarPanel } from './CalendarPanel';
import { SelectedDateEventsPanel } from './SelectedDateEventsPanel';
import { NextMovesPanel } from './NextMovesPanel';

interface MyTimelineViewProps {
  events: EventItem[];
  nextMoves: PrepTask[];
  onOpenAddEvent: () => void;
  onSelectEvent: (event: EventItem) => void;
  onUpdateStatus: (eventId: string, newStatus: EventStatus) => void;
  onRemoveEvent: (eventId: string) => void;
  onToggleNextMove: (taskId: string) => void;
}

export const MyTimelineView: React.FC<MyTimelineViewProps> = ({
  events,
  nextMoves,
  onOpenAddEvent,
  onSelectEvent,
  onUpdateStatus,
  onRemoveEvent,
  onToggleNextMove
}) => {
  // Toolbar Filter States
  const [timelineSearch, setTimelineSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('Earliest First');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [summaryCardFilter, setSummaryCardFilter] = useState<string | null>(null);

  // Selected date for calendar on the right
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date>(new Date(2026, 9, 14)); // Oct 14, 2026

  // Handlers for summary cards
  const handleSelectSummaryCard = (filter: 'all' | 'upcoming' | 'registered' | 'deadlines') => {
    if (summaryCardFilter === filter) {
      setSummaryCardFilter(null);
      setStatusFilter('All Statuses');
      setDateFilter('All Dates');
    } else {
      setSummaryCardFilter(filter);
      if (filter === 'all') {
        setStatusFilter('All Statuses');
        setDateFilter('All Dates');
        setCategoryFilter('All Categories');
      } else if (filter === 'upcoming') {
        setDateFilter('All Dates');
        setStatusFilter('All Statuses');
      } else if (filter === 'registered') {
        setStatusFilter('Registered');
      } else if (filter === 'deadlines') {
        setDateFilter('This Week');
      }
    }
  };

  const handleResetFilters = () => {
    setTimelineSearch('');
    setDateFilter('All Dates');
    setCategoryFilter('All Categories');
    setStatusFilter('All Statuses');
    setSortBy('Earliest First');
    setSummaryCardFilter(null);
  };

  const isFiltered =
    timelineSearch.trim() !== '' ||
    dateFilter !== 'All Dates' ||
    categoryFilter !== 'All Categories' ||
    statusFilter !== 'All Statuses' ||
    summaryCardFilter !== null;

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Search query
    if (timelineSearch.trim()) {
      const q = timelineSearch.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (categoryFilter !== 'All Categories') {
      result = result.filter((e) => {
        const cat = e.category.toLowerCase();
        const target = categoryFilter.toLowerCase();
        return cat.includes(target.replace(/s$/, '')) || cat === target;
      });
    }

    // Status filter
    if (statusFilter !== 'All Statuses') {
      result = result.filter((e) => e.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Date filter
    if (dateFilter === 'Today') {
      result = result.filter(
        (e) => e.timelineGroup === 'Today' || e.eventStartDate.startsWith('2026-10-14')
      );
    } else if (dateFilter === 'Tomorrow') {
      result = result.filter(
        (e) => e.timelineGroup === 'Tomorrow' || e.eventStartDate.startsWith('2026-10-15')
      );
    } else if (dateFilter === 'This Week') {
      result = result.filter((e) => {
        const d = new Date(e.eventStartDate);
        return d.getMonth() === 9 && d.getDate() >= 14 && d.getDate() <= 20;
      });
    } else if (dateFilter === 'Later This Month') {
      result = result.filter((e) => {
        const d = new Date(e.eventStartDate);
        return d.getMonth() === 9 && d.getDate() >= 20;
      });
    } else if (dateFilter.startsWith('Custom:')) {
      const parts = dateFilter.replace('Custom: ', '').split(' to ');
      if (parts.length === 2) {
        const start = new Date(parts[0]).getTime();
        const end = new Date(parts[1]).getTime() + 86400000;
        result = result.filter((e) => {
          const evtTime = new Date(e.eventStartDate).getTime();
          return evtTime >= start && evtTime <= end;
        });
      }
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'Earliest First') {
        return new Date(a.eventStartDate).getTime() - new Date(b.eventStartDate).getTime();
      } else if (sortBy === 'Latest First') {
        return new Date(b.eventStartDate).getTime() - new Date(a.eventStartDate).getTime();
      } else if (sortBy === 'Registration Deadline') {
        return (
          new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime()
        );
      } else if (sortBy === 'Alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [events, timelineSearch, categoryFilter, statusFilter, dateFilter, sortBy]);

  // Derived counts for summary cards
  const registeredCount = events.filter((e) => e.status === 'Registered').length;
  const upcomingCount = events.filter((e) => e.daysRemaining >= 0).length;

  return (
    <div className="my-timeline-page">
      {/* 1. Page Heading */}
      <div className="greeting-header" style={{ marginBottom: '18px' }}>
        <div className="greeting-text-area">
          <h1 className="greeting-title" style={{ fontSize: '1.75rem', letterSpacing: '-0.025em' }}>
            My Timeline
          </h1>
          <p className="greeting-subtitle" style={{ fontSize: '0.88rem' }}>
            All your campus opportunities, organised in chronological order.
          </p>
        </div>

        <div className="greeting-action-area">
          <button className="btn-add-event" onClick={onOpenAddEvent}>
            <Plus size={18} strokeWidth={2.4} />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* 2. Four Compact Summary Cards */}
      <TimelineSummaryCards
        totalCount={24}
        upcomingCount={upcomingCount || 12}
        registeredCount={registeredCount || 6}
        deadlinesCount={5}
        activeFilter={summaryCardFilter}
        onSelectFilter={handleSelectSummaryCard}
      />

      {/* 3. Filter Toolbar */}
      <TimelineToolbar
        searchQuery={timelineSearch}
        setSearchQuery={setTimelineSearch}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onResetFilters={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* 4. 2-Column Timeline Grid */}
      <div className="dashboard-main-grid">
        {/* Left Column: Chronological Timeline or Calendar View */}
        <div className="dashboard-left-col">
          {viewMode === 'list' ? (
            filteredEvents.length === 0 ? (
              <div
                style={{
                  padding: '3rem',
                  textAlign: 'center',
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e9edf2'
                }}
              >
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '12px' }}>
                  No events found matching your current filter criteria.
                </p>
                <button className="btn-secondary btn-sm" onClick={handleResetFilters}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <ChronologicalTimelineList
                events={filteredEvents}
                onSelectEvent={onSelectEvent}
                onUpdateStatus={onUpdateStatus}
                onRemoveEvent={onRemoveEvent}
              />
            )
          ) : (
            <TimelineCalendarView
              events={filteredEvents}
              selectedDate={selectedCalendarDate}
              onSelectDate={(d) => setSelectedCalendarDate(d)}
              onOpenEvent={onSelectEvent}
            />
          )}
        </div>

        {/* Right Column: Calendar, Events on Selected Date, Your Next Moves */}
        <div className="dashboard-right-col">
          {/* October 2026 Calendar */}
          <CalendarPanel
            events={events}
            selectedDate={selectedCalendarDate}
            onSelectDate={(d) => setSelectedCalendarDate(d)}
            onOpenEvent={onSelectEvent}
          />

          {/* Events on Selected Date */}
          <SelectedDateEventsPanel
            selectedDate={selectedCalendarDate}
            events={events}
            onOpenEvent={onSelectEvent}
          />

          {/* Your Next Moves */}
          <NextMovesPanel
            tasks={nextMoves}
            onToggleTask={onToggleNextMove}
            onOpenTaskEvent={(eventId) => {
              const evt = events.find((e) => e.id === eventId);
              if (evt) onSelectEvent(evt);
            }}
          />
        </div>
      </div>
    </div>
  );
};
