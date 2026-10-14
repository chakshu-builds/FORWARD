import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Tag,
  Filter,
  ArrowUpDown,
  List,
  CalendarDays,
  RotateCcw,
  X
} from 'lucide-react';

interface TimelineToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dateFilter: string;
  setDateFilter: (filter: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: 'list' | 'calendar';
  setViewMode: (mode: 'list' | 'calendar') => void;
  onResetFilters: () => void;
  isFiltered: boolean;
}

export const TimelineToolbar: React.FC<TimelineToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  dateFilter,
  setDateFilter,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onResetFilters,
  isFiltered
}) => {
  const [showCustomRangeModal, setShowCustomRangeModal] = useState(false);
  const [customStart, setCustomStart] = useState('2026-10-14');
  const [customEnd, setCustomEnd] = useState('2026-10-31');
  const [rangeError, setRangeError] = useState('');

  const handleApplyCustomRange = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(customStart) > new Date(customEnd)) {
      setRangeError('End date must be after or equal to start date.');
      return;
    }
    setRangeError('');
    setDateFilter(`Custom: ${customStart} to ${customEnd}`);
    setShowCustomRangeModal(false);
  };

  return (
    <div className="timeline-toolbar-wrap">
      {/* Search Input */}
      <div className="toolbar-search-box">
        <Search size={16} className="toolbar-search-icon" />
        <input
          type="text"
          className="toolbar-search-input"
          placeholder="Search in your events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="toolbar-clear-btn"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown Filters */}
      <div className="toolbar-dropdowns-row">
        {/* Date Filter */}
        <div className="toolbar-select-wrap">
          <Calendar size={14} className="toolbar-select-icon text-muted" />
          <select
            className="toolbar-select"
            value={dateFilter}
            onChange={(e) => {
              if (e.target.value === 'custom') {
                setShowCustomRangeModal(true);
              } else {
                setDateFilter(e.target.value);
              }
            }}
            aria-label="Filter by date range"
          >
            <option value="All Dates">All Dates</option>
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="This Week">This Week</option>
            <option value="Later This Month">Later This Month</option>
            <option value="custom">Custom Range...</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="toolbar-select-wrap">
          <Tag size={14} className="toolbar-select-icon text-muted" />
          <select
            className="toolbar-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="All Categories">All Categories</option>
            <option value="Hackathons">Hackathons</option>
            <option value="Workshops">Workshops</option>
            <option value="Competitions">Competitions</option>
            <option value="Internships">Internships</option>
            <option value="Conferences">Conferences</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="toolbar-select-wrap">
          <Filter size={14} className="toolbar-select-icon text-muted" />
          <select
            className="toolbar-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Registered">Registered</option>
            <option value="Interested">Interested</option>
            <option value="Open">Open</option>
            <option value="Not Registered">Not Registered</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="toolbar-select-wrap">
          <ArrowUpDown size={14} className="toolbar-select-icon text-muted" />
          <select
            className="toolbar-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort timeline events"
          >
            <option value="Earliest First">Earliest First</option>
            <option value="Latest First">Latest First</option>
            <option value="Registration Deadline">Registration Deadline</option>
            <option value="Recently Added">Recently Added</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>

        {/* Segmented View Switcher: List / Calendar */}
        <div className="toolbar-view-toggle">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List size={15} />
            <span>List</span>
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
            onClick={() => setViewMode('calendar')}
            aria-label="Calendar view"
          >
            <CalendarDays size={15} />
            <span>Calendar</span>
          </button>
        </div>

        {/* Reset Filters Action */}
        {isFiltered && (
          <button
            type="button"
            className="toolbar-reset-btn"
            onClick={onResetFilters}
            title="Reset all filters"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Custom Date Range Modal */}
      {showCustomRangeModal && (
        <div className="modal-backdrop" onClick={() => setShowCustomRangeModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Select Custom Date Range</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowCustomRangeModal(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleApplyCustomRange}>
              <div className="modal-body" style={{ gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    required
                  />
                </div>
                {rangeError && (
                  <div style={{ color: '#dc2626', fontSize: '0.78rem' }}>{rangeError}</div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => setShowCustomRangeModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary btn-sm">
                  Apply Range
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
