import React, { useState, useMemo } from 'react';
import type { EventItem, AttentionItem } from '../types';
import { EventThumbnail } from './EventThumbnail';
import { DatePickerDropdown } from './DatePickerDropdown';
import {
  AlertTriangle,
  Info,
  RefreshCw,
  Calendar,
  ChevronRight,
  X,
  Check,
  ArrowUpDown,
  MapPin,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface NeedsReviewViewProps {
  attentionItems: AttentionItem[];
  events: EventItem[];
  onResolveIssue: (
    issueId: string,
    action: string,
    details?: {
      rescheduledDate?: string;
      rescheduledStartTime?: string;
      rescheduledEndTime?: string;
      venue?: string;
      mode?: 'Online' | 'In-Person' | 'Hybrid';
      meetingUrl?: string;
      acceptedValue?: string;
    }
  ) => void;
  onUpdateEvent: (event: EventItem) => void;
  addToast: (type: 'success' | 'warning' | 'info', title: string, description?: string) => void;
}

export const NeedsReviewView: React.FC<NeedsReviewViewProps> = ({
  attentionItems,
  events,
  onResolveIssue,
  onUpdateEvent,
  addToast,
}) => {
  // Only pending (unresolved) issues count
  const pendingIssues = useMemo(
    () => attentionItems.filter((item) => item.status !== 'resolved'),
    [attentionItems]
  );

  // Active filter tab: 'all' | 'missing_info' | 'conflict' | 'update'
  const [activeFilter, setActiveFilter] = useState<'all' | 'missing_info' | 'conflict' | 'update'>('all');

  // Sorting
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'date_asc' | 'date_desc'>('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Selected issue for detail panel (defaults to the first pending issue)
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(() => {
    return pendingIssues.length > 0 ? pendingIssues[0].id : null;
  });

  // Keep selected issue in sync if list changes
  const activeIssue = useMemo(() => {
    if (!selectedIssueId && pendingIssues.length > 0) return pendingIssues[0];
    return pendingIssues.find((item) => item.id === selectedIssueId) || null;
  }, [pendingIssues, selectedIssueId]);

  // Associated event for active issue
  const activeEvent = useMemo(() => {
    if (!activeIssue) return null;
    return events.find((e) => e.id === activeIssue.eventId) || null;
  }, [activeIssue, events]);

  // Associated conflicting event (if applicable)
  const conflictingEvent = useMemo(() => {
    if (!activeIssue || !activeIssue.conflictingEventId) return null;
    return events.find((e) => e.id === activeIssue.conflictingEventId) || null;
  }, [activeIssue, events]);

  // Detail panel active tab: 'issue_details' | 'event_info'
  const [panelTab, setPanelTab] = useState<'issue_details' | 'event_info'>('issue_details');

  // Conflict Action state
  const [conflictAction, setConflictAction] = useState<'keep_this' | 'keep_other' | 'reschedule'>('keep_this');
  const [rescheduledDate, setRescheduledDate] = useState('2026-10-28');
  const [rescheduledStartTime, setRescheduledStartTime] = useState('09:30 AM');
  const [rescheduledEndTime, setRescheduledEndTime] = useState('5:30 PM');

  // Missing Info Action state (Venue / Mode)
  const [missingVenueMode, setMissingVenueMode] = useState<'In-Person' | 'Online' | 'Hybrid'>('In-Person');
  const [missingVenueText, setMissingVenueText] = useState('VIPS-TC Auditorium, Delhi');
  const [missingMeetingUrl, setMissingMeetingUrl] = useState('https://vips.edu/tech-conclave-stream');

  // Update Action state (Google Deadline update)
  const [updateAction, setUpdateAction] = useState<'accept' | 'keep_current'>('accept');

  // Event Info Editable State
  const [editableTitle, setEditableTitle] = useState('');
  const [editableOrganiser, setEditableOrganiser] = useState('');
  const [editableVenue, setEditableVenue] = useState('');
  const [editableDate, setEditableDate] = useState('');
  const [editableDeadline, setEditableDeadline] = useState('');

  // Update editable fields when active event changes
  const [prevEventId, setPrevEventId] = useState<string | null>(null);
  if (activeEvent && activeEvent.id !== prevEventId) {
    setPrevEventId(activeEvent.id);
    setEditableTitle(activeEvent.title);
    setEditableOrganiser(activeEvent.organizer);
    setEditableVenue(activeEvent.venue);
    setEditableDate(activeEvent.eventStartDate ? activeEvent.eventStartDate.split('T')[0] : '');
    setEditableDeadline(activeEvent.registrationDeadline ? activeEvent.registrationDeadline.split('T')[0] : '');
  }

  // Modals state for Help & Sources
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isVerifySourceOpen, setIsVerifySourceOpen] = useState(false);

  // Filtered issues
  const filteredIssues = useMemo(() => {
    let result = pendingIssues.filter((item) => {
      if (activeFilter === 'all') return true;
      return item.type === activeFilter;
    });

    result.sort((a, b) => {
      if (sortBy === 'newest') return a.id.localeCompare(b.id);
      if (sortBy === 'oldest') return b.id.localeCompare(a.id);
      return 0;
    });

    return result;
  }, [pendingIssues, activeFilter, sortBy]);

  // Counts for cards
  const totalCount = pendingIssues.length;
  const missingCount = pendingIssues.filter((i) => i.type === 'missing_info').length;
  const updatesCount = pendingIssues.filter((i) => i.type === 'update').length;
  const conflictCount = pendingIssues.filter((i) => i.type === 'conflict').length;

  // Handle Save Resolution
  const handleSaveResolution = () => {
    if (!activeIssue) return;

    if (activeIssue.type === 'conflict') {
      if (conflictAction === 'reschedule') {
        if (!rescheduledDate) {
          addToast('warning', 'Date Required', 'Please select a new date to reschedule.');
          return;
        }
        onResolveIssue(activeIssue.id, 'reschedule', {
          rescheduledDate,
          rescheduledStartTime,
          rescheduledEndTime
        });
        addToast('success', 'Event Rescheduled', `Rescheduled "${activeIssue.eventTitle}" to ${rescheduledDate}.`);
      } else if (conflictAction === 'keep_other') {
        onResolveIssue(activeIssue.id, 'keep_other');
        addToast('success', 'Resolution Saved', `Kept "${activeIssue.conflictingEventTitle || 'alternative event'}".`);
      } else {
        onResolveIssue(activeIssue.id, 'keep_this');
        addToast('success', 'Resolution Saved', `Retained "${activeIssue.eventTitle}" in timeline.`);
      }
    } else if (activeIssue.type === 'missing_info') {
      if (missingVenueMode !== 'Online' && !missingVenueText.trim()) {
        addToast('warning', 'Venue Required', 'Please enter a venue or choose Online.');
        return;
      }
      onResolveIssue(activeIssue.id, 'add_venue', {
        venue: missingVenueMode === 'Online' ? 'Online' : missingVenueText.trim(),
        mode: missingVenueMode,
        meetingUrl: missingMeetingUrl
      });
      addToast('success', 'Venue Updated', `Added venue information for "${activeIssue.eventTitle}".`);
    } else if (activeIssue.type === 'update') {
      if (updateAction === 'accept') {
        onResolveIssue(activeIssue.id, 'accept_update', {
          acceptedValue: activeIssue.proposedValue || '02 Nov 2026'
        });
        addToast('success', 'Update Applied', `Updated deadline for "${activeIssue.eventTitle}".`);
      } else {
        onResolveIssue(activeIssue.id, 'keep_current');
        addToast('info', 'Update Dismissed', `Retained current details for "${activeIssue.eventTitle}".`);
      }
    }

    // Move to next unresolved issue if any
    const remaining = pendingIssues.filter((i) => i.id !== activeIssue.id);
    if (remaining.length > 0) {
      setSelectedIssueId(remaining[0].id);
    } else {
      setSelectedIssueId(null);
    }
  };

  // Handle Save Event Information edits
  const handleSaveEventInfo = () => {
    if (!activeEvent) return;
    const updated: EventItem = {
      ...activeEvent,
      title: editableTitle.trim() || activeEvent.title,
      organizer: editableOrganiser.trim() || activeEvent.organizer,
      venue: editableVenue.trim() || activeEvent.venue,
      eventStartDate: editableDate ? `${editableDate}T09:00:00` : activeEvent.eventStartDate,
      registrationDeadline: editableDeadline ? `${editableDeadline}T23:59:00` : activeEvent.registrationDeadline,
    };
    onUpdateEvent(updated);
    addToast('success', 'Event Details Saved', `Saved updates to "${updated.title}".`);
  };

  return (
    <div className="needs-review-page" style={{ width: '100%', paddingBottom: '40px' }}>
      {/* 1. Page Heading */}
      <div className="needs-review-header" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>
            Needs Review
          </h1>
          {totalCount > 0 && (
            <span
              style={{
                background: '#ef4444',
                color: '#ffffff',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 700,
              }}
            >
              {totalCount}
            </span>
          )}
        </div>
        <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
          Review and resolve event information to keep your timeline accurate.
        </p>
      </div>

      {/* 2. Main 2-Column Area: Left Content (Summary + Toolbar + List + Guidelines) + Right Detail Panel */}
      <div
        className="needs-review-main-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: activeIssue && activeEvent ? 'minmax(0, 1fr) 370px' : '1fr',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Summary Cards + Filter Toolbar + Issues List + Lower Guidelines */}
        <div className="needs-review-left-col" style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Four Compact Summary Cards */}
          <div
            className="review-metrics-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            }}
          >
        {/* Card 1: Total to review */}
        <div
          className={`review-metric-card ${activeFilter === 'all' ? 'active-metric-card' : ''}`}
          onClick={() => setActiveFilter('all')}
          style={{
            background: '#ffffff',
            border: activeFilter === 'all' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            transition: 'all 0.15s ease',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#fef2f2',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
              {totalCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
              Total to review
            </div>
          </div>
        </div>

        {/* Card 2: Missing information */}
        <div
          className={`review-metric-card ${activeFilter === 'missing_info' ? 'active-metric-card' : ''}`}
          onClick={() => setActiveFilter('missing_info')}
          style={{
            background: '#ffffff',
            border: activeFilter === 'missing_info' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            transition: 'all 0.15s ease',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#fffbeb',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Info size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
              {missingCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
              Missing information
            </div>
          </div>
        </div>

        {/* Card 3: Updates available */}
        <div
          className={`review-metric-card ${activeFilter === 'update' ? 'active-metric-card' : ''}`}
          onClick={() => setActiveFilter('update')}
          style={{
            background: '#ffffff',
            border: activeFilter === 'update' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            transition: 'all 0.15s ease',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <RefreshCw size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
              {updatesCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
              Updates available
            </div>
          </div>
        </div>

        {/* Card 4: Date conflicts */}
        <div
          className={`review-metric-card ${activeFilter === 'conflict' ? 'active-metric-card' : ''}`}
          onClick={() => setActiveFilter('conflict')}
          style={{
            background: '#ffffff',
            border: activeFilter === 'conflict' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            transition: 'all 0.15s ease',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#f5f3ff',
              color: '#7c3aed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Calendar size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
              {conflictCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
              Date conflicts
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar & Sort Dropdown */}
      <div
        className="review-filter-toolbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '12px',
        }}
      >
        {/* Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
          <button
            type="button"
            className={`review-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '6px 14px',
              fontSize: '0.88rem',
              fontWeight: activeFilter === 'all' ? 700 : 500,
              color: activeFilter === 'all' ? '#2563eb' : '#64748b',
              borderBottom: activeFilter === 'all' ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            All ({totalCount})
          </button>

          <button
            type="button"
            className={`review-tab-btn ${activeFilter === 'missing_info' ? 'active' : ''}`}
            onClick={() => setActiveFilter('missing_info')}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '6px 14px',
              fontSize: '0.88rem',
              fontWeight: activeFilter === 'missing_info' ? 700 : 500,
              color: activeFilter === 'missing_info' ? '#2563eb' : '#64748b',
              borderBottom: activeFilter === 'missing_info' ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Missing Information ({missingCount})
          </button>

          <button
            type="button"
            className={`review-tab-btn ${activeFilter === 'conflict' ? 'active' : ''}`}
            onClick={() => setActiveFilter('conflict')}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '6px 14px',
              fontSize: '0.88rem',
              fontWeight: activeFilter === 'conflict' ? 700 : 500,
              color: activeFilter === 'conflict' ? '#2563eb' : '#64748b',
              borderBottom: activeFilter === 'conflict' ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Conflicting Dates ({conflictCount})
          </button>

          <button
            type="button"
            className={`review-tab-btn ${activeFilter === 'update' ? 'active' : ''}`}
            onClick={() => setActiveFilter('update')}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '6px 14px',
              fontSize: '0.88rem',
              fontWeight: activeFilter === 'update' ? 700 : 500,
              color: activeFilter === 'update' ? '#2563eb' : '#64748b',
              borderBottom: activeFilter === 'update' ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Updates Available ({updatesCount})
          </button>
        </div>

        {/* Sort Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#0f172a',
              cursor: 'pointer',
            }}
          >
            <ArrowUpDown size={14} style={{ color: '#64748b' }} />
            <span>
              {sortBy === 'newest'
                ? 'Newest First'
                : sortBy === 'oldest'
                ? 'Oldest First'
                : sortBy === 'date_asc'
                ? 'Earliest Event'
                : 'Latest Event'}
            </span>
          </button>

          {isSortOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                right: 0,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                zIndex: 100,
                minWidth: '160px',
                padding: '4px',
              }}
            >
              {[
                { label: 'Newest First', value: 'newest' },
                { label: 'Oldest First', value: 'oldest' },
                { label: 'Earliest Event', value: 'date_asc' },
                { label: 'Latest Event', value: 'date_desc' },
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value as any);
                    setIsSortOpen(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    color: sortBy === opt.value ? '#2563eb' : '#0f172a',
                    fontWeight: sortBy === opt.value ? 700 : 500,
                    cursor: 'pointer',
                    borderRadius: '6px',
                    background: sortBy === opt.value ? '#eff6ff' : 'transparent',
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Issue Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredIssues.length === 0 ? (
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '40px 20px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#ecfdf5',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                  }}
                >
                  <CheckCircle2 size={26} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>
                  All Notices Reconciled
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
                  No pending discrepancies found in this category.
                </p>
              </div>
            ) : (
              filteredIssues.map((item) => {
                const isSelected = selectedIssueId === item.id;
                const evt = events.find((e) => e.id === item.eventId);

                // Date label fallback
                const dateMonth = item.dateLabel?.month || (evt?.dateLabel?.month) || 'OCT';
                const dateDay = item.dateLabel?.day || (evt?.dateLabel?.day) || '25';

                // Thumbnail type
                const thumbType = evt?.thumbnailType || 'default';

                return (
                  <div
                    key={item.id}
                    className={`review-issue-row ${isSelected ? 'selected-issue-row' : ''}`}
                    onClick={() => setSelectedIssueId(item.id)}
                    style={{
                      background: '#ffffff',
                      border: isSelected ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '16px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {/* Date Block */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '48px',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.04em' }}>
                        {dateMonth}
                      </span>
                      <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                        {dateDay}
                      </span>
                    </div>

                    {/* Thumbnail */}
                    <EventThumbnail type={thumbType} size={42} />

                    {/* Middle: Title, Organiser, Tags */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.94rem', color: '#0f172a' }}>
                          {item.eventTitle}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '6px' }}>
                        {evt?.organizer || 'Organiser'}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {evt?.tags?.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="event-tag" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Issue Badge & Explanation */}
                    <div style={{ flex: 1.3, minWidth: 0 }}>
                      <div style={{ marginBottom: '4px' }}>
                        {item.type === 'conflict' && (
                          <span
                            style={{
                              background: '#fef2f2',
                              color: '#dc2626',
                              border: '1px solid #fecaca',
                              borderRadius: '6px',
                              padding: '3px 8px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <AlertTriangle size={12} strokeWidth={2.4} />
                            <span>Conflicting date detected</span>
                          </span>
                        )}
                        {item.type === 'missing_info' && (
                          <span
                            style={{
                              background: '#fffbeb',
                              color: '#d97706',
                              border: '1px solid #fde68a',
                              borderRadius: '6px',
                              padding: '3px 8px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Info size={12} strokeWidth={2.4} />
                            <span>Missing venue information</span>
                          </span>
                        )}
                        {item.type === 'update' && (
                          <span
                            style={{
                              background: '#eff6ff',
                              color: '#2563eb',
                              border: '1px solid #bfdbfe',
                              borderRadius: '6px',
                              padding: '3px 8px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <RefreshCw size={12} strokeWidth={2.4} />
                            <span>New update available</span>
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: '0.76rem',
                          color: '#475569',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          marginBottom: '2px',
                        }}
                      >
                        {item.explanation || 'Issue details flagged for reconciliation.'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        {item.timeAgo}
                      </div>
                    </div>

                    {/* Review Button & Chevron */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedIssueId(item.id);
                        }}
                        style={{
                          background: isSelected ? '#2563eb' : '#eff6ff',
                          color: isSelected ? '#ffffff' : '#2563eb',
                          border: isSelected ? 'none' : '1px solid #dbeafe',
                          borderRadius: '8px',
                          padding: '6px 14px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        Review
                      </button>
                      <ChevronRight size={16} style={{ color: '#94a3b8' }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Lower Section: Review Guidelines */}
          <div
            className="review-guidelines-box"
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '22px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#fef3c7',
                    color: '#d97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                    Review Guidelines
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                    Keep your timeline accurate with these simple checks.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsHelpOpen(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                }}
              >
                <HelpCircle size={14} />
                <span>View Help</span>
              </button>
            </div>

            {/* 4 Guideline Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {/* 1. Missing details */}
              <div
                onClick={() => setActiveFilter('missing_info')}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '10px',
                  padding: '14px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <Info size={16} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a', marginBottom: '4px' }}>
                  Check for missing details
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.35 }}>
                  Make sure the event has venue, date, and other key information.
                </div>
              </div>

              {/* 2. Date conflicts */}
              <div
                onClick={() => setActiveFilter('conflict')}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '10px',
                  padding: '14px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: '#fef2f2',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <Calendar size={16} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a', marginBottom: '4px' }}>
                  Resolve date conflicts
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.35 }}>
                  Check for overlapping events and update the schedule if needed.
                </div>
              </div>

              {/* 3. Review updates */}
              <div
                onClick={() => setActiveFilter('update')}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '10px',
                  padding: '14px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <RefreshCw size={16} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a', marginBottom: '4px' }}>
                  Review updates
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.35 }}>
                  Keep your events up to date with the latest information.
                </div>
              </div>

              {/* 4. Verify sources */}
              <div
                onClick={() => setIsVerifySourceOpen(true)}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '10px',
                  padding: '14px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <LinkIcon size={16} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a', marginBottom: '4px' }}>
                  Verify sources
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.35 }}>
                  Ensure the event information is from a trusted source.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detail / Resolution Panel */}
        {activeIssue && activeEvent && (
          <div
            className="needs-review-detail-panel"
            style={{
              position: 'sticky',
              top: '84px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
            }}
          >
            {/* Header: Thumbnail + Title + Close Button */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <EventThumbnail
                  type={activeEvent.thumbnailType || 'default'}
                  size={46}
                />
                <div>
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                    {activeIssue.eventTitle}
                  </h2>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>
                    {activeEvent.organizer}
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {activeEvent.tags?.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="event-tag" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIssueId(null)}
                aria-label="Close detail panel"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs: Issue Details vs Event Information */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid #e2e8f0',
                marginBottom: '16px',
              }}
            >
              <button
                type="button"
                onClick={() => setPanelTab('issue_details')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 14px',
                  fontSize: '0.84rem',
                  fontWeight: panelTab === 'issue_details' ? 700 : 500,
                  color: panelTab === 'issue_details' ? '#2563eb' : '#64748b',
                  borderBottom: panelTab === 'issue_details' ? '2px solid #2563eb' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              >
                Issue Details
              </button>
              <button
                type="button"
                onClick={() => setPanelTab('event_info')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 14px',
                  fontSize: '0.84rem',
                  fontWeight: panelTab === 'event_info' ? 700 : 500,
                  color: panelTab === 'event_info' ? '#2563eb' : '#64748b',
                  borderBottom: panelTab === 'event_info' ? '2px solid #2563eb' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              >
                Event Information
              </button>
            </div>

            {panelTab === 'issue_details' ? (
              <div>
                {/* 1. If Conflict */}
                {activeIssue.type === 'conflict' && (
                  <div>
                    {/* Alert Box */}
                    <div
                      style={{
                        background: '#fef2f2',
                        border: '1px solid #fee2e2',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '18px',
                      }}
                    >
                      <AlertTriangle size={18} style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#991b1b', marginBottom: '2px' }}>
                          Conflicting date detected
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#b91c1c', lineHeight: 1.35 }}>
                          This event overlaps with another event in your timeline.
                        </div>
                      </div>
                    </div>

                    {/* Conflicting Events Subtitle */}
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a', marginBottom: '10px' }}>
                      Conflicting Events
                    </div>

                    {/* Row 1: Primary Event */}
                    <div
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '8px',
                        background: '#f8fafc',
                      }}
                    >
                      <EventThumbnail type={activeEvent?.thumbnailType || 'default'} size={36} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a' }}>
                          {activeEvent?.title || activeIssue.eventTitle}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                          {activeEvent?.timeRange || activeEvent?.reportingTime || 'Schedule under review'}
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Conflicting Event */}
                    <div
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '18px',
                        background: '#f8fafc',
                      }}
                    >
                      <EventThumbnail type={conflictingEvent?.thumbnailType || 'default'} size={36} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a' }}>
                          {conflictingEvent?.title || activeIssue.conflictingEventTitle || 'Conflicting Opportunity'}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                          {conflictingEvent?.timeRange || activeIssue.conflictingEventTime || 'Conflicting schedule'}
                        </div>
                      </div>
                    </div>

                    {/* Choose an Action */}
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a', marginBottom: '10px' }}>
                      Choose an action
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                      {/* Option 1: Keep this event */}
                      <label
                        style={{
                          border: conflictAction === 'keep_this' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                          background: conflictAction === 'keep_this' ? '#eff6ff' : '#ffffff',
                          borderRadius: '10px',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name="conflict_action"
                          checked={conflictAction === 'keep_this'}
                          onChange={() => setConflictAction('keep_this')}
                          style={{ marginTop: '3px' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>
                            Keep this event
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                            Keep {activeEvent?.title || activeIssue.eventTitle} in your timeline
                          </div>
                        </div>
                      </label>

                      {/* Option 2: Keep the other event */}
                      <label
                        style={{
                          border: conflictAction === 'keep_other' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                          background: conflictAction === 'keep_other' ? '#eff6ff' : '#ffffff',
                          borderRadius: '10px',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name="conflict_action"
                          checked={conflictAction === 'keep_other'}
                          onChange={() => setConflictAction('keep_other')}
                          style={{ marginTop: '3px' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>
                            Keep the other event
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                            Keep {conflictingEvent?.title || activeIssue.conflictingEventTitle || 'alternative event'} instead
                          </div>
                        </div>
                      </label>

                      {/* Option 3: Reschedule this event */}
                      <label
                        style={{
                          border: conflictAction === 'reschedule' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                          background: conflictAction === 'reschedule' ? '#eff6ff' : '#ffffff',
                          borderRadius: '10px',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name="conflict_action"
                          checked={conflictAction === 'reschedule'}
                          onChange={() => setConflictAction('reschedule')}
                          style={{ marginTop: '3px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>
                            Reschedule this event
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                            Change the date and time
                          </div>

                          {conflictAction === 'reschedule' && (
                            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #dbeafe' }}>
                              <div style={{ marginBottom: '8px' }}>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                                  New Event Date
                                </label>
                                <DatePickerDropdown
                                  value={rescheduledDate}
                                  onChange={(d) => setRescheduledDate(d)}
                                />
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                                    Start Time
                                  </label>
                                  <input
                                    type="text"
                                    value={rescheduledStartTime}
                                    onChange={(e) => setRescheduledStartTime(e.target.value)}
                                    style={{
                                      width: '100%',
                                      border: '1px solid #e2e8f0',
                                      borderRadius: '6px',
                                      padding: '6px 8px',
                                      fontSize: '0.78rem',
                                    }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                                    End Time
                                  </label>
                                  <input
                                    type="text"
                                    value={rescheduledEndTime}
                                    onChange={(e) => setRescheduledEndTime(e.target.value)}
                                    style={{
                                      width: '100%',
                                      border: '1px solid #e2e8f0',
                                      borderRadius: '6px',
                                      padding: '6px 8px',
                                      fontSize: '0.78rem',
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* 2. If Missing Information */}
                {activeIssue.type === 'missing_info' && (
                  <div>
                    {/* Alert Box */}
                    <div
                      style={{
                        background: '#fffbeb',
                        border: '1px solid #fef3c7',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '18px',
                      }}
                    >
                      <Info size={18} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#92400e', marginBottom: '2px' }}>
                          Missing venue information
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#b45309', lineHeight: 1.35 }}>
                          Venue not specified. Please add the venue or online link.
                        </div>
                      </div>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a', marginBottom: '10px' }}>
                      Add Venue Details
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Event Mode
                        </label>
                        <select
                          value={missingVenueMode}
                          onChange={(e) => setMissingVenueMode(e.target.value as any)}
                          style={{
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '8px 10px',
                            fontSize: '0.82rem',
                            background: '#ffffff',
                          }}
                        >
                          <option value="In-Person">In-Person</option>
                          <option value="Online">Online</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>

                      {missingVenueMode !== 'Online' && (
                        <div>
                          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                            Physical Venue / Campus Address
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="text"
                              value={missingVenueText}
                              onChange={(e) => setMissingVenueText(e.target.value)}
                              placeholder="e.g. VIPS Auditorium, Delhi"
                              style={{
                                width: '100%',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                padding: '8px 10px 8px 30px',
                                fontSize: '0.82rem',
                              }}
                            />
                            <MapPin size={15} style={{ position: 'absolute', left: '8px', top: '10px', color: '#64748b' }} />
                          </div>
                        </div>
                      )}

                      <div>
                        <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                          Online Portal or Stream URL
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="text"
                            value={missingMeetingUrl}
                            onChange={(e) => setMissingMeetingUrl(e.target.value)}
                            placeholder="https://..."
                            style={{
                              width: '100%',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              padding: '8px 10px 8px 30px',
                              fontSize: '0.82rem',
                            }}
                          />
                          <LinkIcon size={15} style={{ position: 'absolute', left: '8px', top: '10px', color: '#64748b' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. If Update Available */}
                {activeIssue.type === 'update' && (
                  <div>
                    {/* Alert Box */}
                    <div
                      style={{
                        background: '#eff6ff',
                        border: '1px solid #dbeafe',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '18px',
                      }}
                    >
                      <RefreshCw size={18} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#1e40af', marginBottom: '2px' }}>
                          New update available
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#3b82f6', lineHeight: 1.35 }}>
                          Organiser updated the deadline and eligibility criteria.
                        </div>
                      </div>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a', marginBottom: '10px' }}>
                      Detected Field Comparison
                    </div>

                    <div
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '12px',
                        background: '#f8fafc',
                        marginBottom: '16px',
                      }}
                    >
                      <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, marginBottom: '6px' }}>
                        REGISTRATION DEADLINE
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Previous:</span>
                          <span style={{ fontSize: '0.82rem', color: '#ef4444', textDecoration: 'line-through', marginLeft: '6px' }}>
                            20 Oct 2026
                          </span>
                        </div>
                        <span style={{ color: '#94a3b8' }}>→</span>
                        <div>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Proposed:</span>
                          <span style={{ fontSize: '0.84rem', color: '#059669', fontWeight: 700, marginLeft: '6px' }}>
                            02 Nov 2026
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#0f172a', marginBottom: '8px' }}>
                      Choose an action
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                      <label
                        style={{
                          border: updateAction === 'accept' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                          background: updateAction === 'accept' ? '#eff6ff' : '#ffffff',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name="update_action"
                          checked={updateAction === 'accept'}
                          onChange={() => setUpdateAction('accept')}
                        />
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>
                          Accept update (Set deadline to 02 Nov 2026)
                        </div>
                      </label>

                      <label
                        style={{
                          border: updateAction === 'keep_current' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                          background: updateAction === 'keep_current' ? '#eff6ff' : '#ffffff',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name="update_action"
                          checked={updateAction === 'keep_current'}
                          onChange={() => setUpdateAction('keep_current')}
                        />
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>
                          Keep current information (Retain 20 Oct 2026)
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={handleSaveResolution}
                  style={{
                    width: '100%',
                    height: '42px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Check size={16} />
                  <span>Save Resolution</span>
                </button>
              </div>
            ) : (
              /* Tab 2: Event Information Tab */
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', marginBottom: '2px' }}>
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={editableTitle}
                      onChange={(e) => setEditableTitle(e.target.value)}
                      style={{
                        width: '100%',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        fontSize: '0.82rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', marginBottom: '2px' }}>
                      Organiser
                    </label>
                    <input
                      type="text"
                      value={editableOrganiser}
                      onChange={(e) => setEditableOrganiser(e.target.value)}
                      style={{
                        width: '100%',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        fontSize: '0.82rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', marginBottom: '2px' }}>
                      Event Date
                    </label>
                    <DatePickerDropdown
                      value={editableDate}
                      onChange={(d) => setEditableDate(d)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', marginBottom: '2px' }}>
                      Registration Deadline
                    </label>
                    <DatePickerDropdown
                      value={editableDeadline}
                      onChange={(d) => setEditableDeadline(d)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', marginBottom: '2px' }}>
                      Venue
                    </label>
                    <input
                      type="text"
                      value={editableVenue}
                      onChange={(e) => setEditableVenue(e.target.value)}
                      style={{
                        width: '100%',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        fontSize: '0.82rem',
                      }}
                    />
                  </div>

                  <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px', fontSize: '0.76rem', color: '#64748b' }}>
                    <div><strong>Category:</strong> {activeEvent.category}</div>
                    <div><strong>Mode:</strong> {activeEvent.isOnline ? 'Online' : 'In-Person'}</div>
                    <div><strong>Status:</strong> {activeEvent.status}</div>
                    {activeEvent.registrationUrl && (
                      <div style={{ marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <strong>Registration URL:</strong>{' '}
                        <a href={activeEvent.registrationUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>
                          {activeEvent.registrationUrl}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveEventInfo}
                  style={{
                    width: '100%',
                    height: '38px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="modal-backdrop" onClick={() => setIsHelpOpen(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px', padding: '24px', background: '#ffffff', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={20} style={{ color: '#2563eb' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Review Help & Guidelines
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
              <div>
                <strong style={{ color: '#0f172a' }}>1. Resolving Date Conflicts:</strong> When two campus events overlap on the same day/time, you can keep one, substitute the other, or reschedule with custom date and time.
              </div>
              <div>
                <strong style={{ color: '#0f172a' }}>2. Missing Details:</strong> Notices captured with missing venues or meeting links are flagged so you can specify in-person auditoriums or virtual stream links.
              </div>
              <div>
                <strong style={{ color: '#0f172a' }}>3. Organizer Updates:</strong> When organizers broadcast date extensions, eligibility shifts, or venue adjustments, compare previous vs proposed values and accept with one click.
              </div>
              <div>
                <strong style={{ color: '#0f172a' }}>4. Single Timeline Consistency:</strong> Any resolution saved here immediately synchronizes with your Overview dashboard, My Timeline, and calendar.
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setIsHelpOpen(false)}
                style={{ borderRadius: '8px', padding: '8px 18px' }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify Sources Modal */}
      {isVerifySourceOpen && (
        <div className="modal-backdrop" onClick={() => setIsVerifySourceOpen(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px', padding: '24px', background: '#ffffff', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LinkIcon size={20} style={{ color: '#059669' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Source Verification
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVerifySourceOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>
              FORWARD verifies ingested announcements by tracing their origin channel, raw message snippet, and publication timestamp.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.82rem' }}>Discord & WhatsApp Feeds</div>
                <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Parsed directly from verified student chapter channels with 94%+ heuristic confidence.</div>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.82rem' }}>Official University Circulars</div>
                <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Received via university relations emails and department noticeboards.</div>
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setIsVerifySourceOpen(false)}
                style={{ borderRadius: '8px', padding: '8px 18px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
