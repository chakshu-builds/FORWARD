import { useState, useMemo, useEffect } from 'react';
import type {
  EventItem,
  EventStatus,
  ExtractionDraft,
  ActiveView,
  AttentionItem,
  RecentlyAddedItem,
  PrepTask
} from './types';
import {
  INITIAL_EVENTS,
  INITIAL_ATTENTION_ITEMS,
  INITIAL_RECENTLY_ADDED,
  INITIAL_NEXT_MOVES,
  SAMPLE_EXTRACTION_RESULT
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { GreetingHeader } from './components/GreetingHeader';
import { MetricsRow } from './components/MetricsRow';
import { UpcomingEventsSection } from './components/UpcomingEventsSection';
import { NeedsAttentionCard } from './components/NeedsAttentionCard';
import { RecentlyAddedCard } from './components/RecentlyAddedCard';
import { CalendarPanel } from './components/CalendarPanel';
import { NextMovesPanel } from './components/NextMovesPanel';

import { CaptureModal } from './components/CaptureModal';
import { ExtractionReviewModal } from './components/ExtractionReviewModal';
import { EventDetailModal } from './components/EventDetailModal';
import { ConflictModal } from './components/ConflictModal';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import {
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export function App() {
  // Main Data States with localStorage persistence fallback
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('forward_events_v2');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [attentionItems, setAttentionItems] = useState<AttentionItem[]>(() => {
    const saved = localStorage.getItem('forward_attention_v2');
    return saved ? JSON.parse(saved) : INITIAL_ATTENTION_ITEMS;
  });

  const [recentlyAdded, setRecentlyAdded] = useState<RecentlyAddedItem[]>(() => {
    const saved = localStorage.getItem('forward_recent_v2');
    return saved ? JSON.parse(saved) : INITIAL_RECENTLY_ADDED;
  });

  const [nextMoves, setNextMoves] = useState<PrepTask[]>(() => {
    const saved = localStorage.getItem('forward_moves_v2');
    return saved ? JSON.parse(saved) : INITIAL_NEXT_MOVES;
  });

  // Navigation & Search State
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date>(new Date(2026, 9, 14)); // Oct 14, 2026

  // Header Dropdowns State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Modals State
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);
  const [isExtractionReviewOpen, setIsExtractionReviewOpen] = useState(false);
  const [extractionDraft, setExtractionDraft] = useState<ExtractionDraft>(SAMPLE_EXTRACTION_RESULT);
  const [detailEventId, setDetailEventId] = useState<string | null>(null);
  const [conflictEventId, setConflictEventId] = useState<string | null>(null);

  // Filter state for My Timeline view
  const [timelineCategory, setTimelineCategory] = useState<string>('All');
  const [timelineStatus, setTimelineStatus] = useState<string>('All');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('forward_events_v2', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('forward_attention_v2', JSON.stringify(attentionItems));
  }, [attentionItems]);

  useEffect(() => {
    localStorage.setItem('forward_recent_v2', JSON.stringify(recentlyAdded));
  }, [recentlyAdded]);

  useEffect(() => {
    localStorage.setItem('forward_moves_v2', JSON.stringify(nextMoves));
  }, [nextMoves]);

  // Global Escape key listener to dismiss open modals or dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCaptureOpen(false);
        setIsExtractionReviewOpen(false);
        setDetailEventId(null);
        setConflictEventId(null);
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (type: 'success' | 'warning' | 'info', title: string, description?: string) => {
    const newToast: ToastMessage = {
      id: 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5),
      type,
      title,
      description
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset demo data
  const handleResetDemoData = () => {
    localStorage.removeItem('forward_events_v2');
    localStorage.removeItem('forward_attention_v2');
    localStorage.removeItem('forward_recent_v2');
    localStorage.removeItem('forward_moves_v2');
    setEvents(INITIAL_EVENTS);
    setAttentionItems(INITIAL_ATTENTION_ITEMS);
    setRecentlyAdded(INITIAL_RECENTLY_ADDED);
    setNextMoves(INITIAL_NEXT_MOVES);
    addToast('info', 'Prototype Reset', 'Restored default reference dashboard state.');
  };

  // Selected event getters
  const selectedDetailEvent = useMemo(
    () => events.find((e) => e.id === detailEventId) || null,
    [events, detailEventId]
  );

  const selectedConflictEvent = useMemo(
    () => events.find((e) => e.id === conflictEventId) || null,
    [events, conflictEventId]
  );

  // Conflicted events for badge
  const pendingConflicts = useMemo(
    () => events.filter((e) => e.conflict && e.conflict.status === 'Pending'),
    [events]
  );

  // Filtered events based on search query
  const searchedEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const q = searchQuery.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [events, searchQuery]);

  // Actions
  const handleExtractionComplete = (draft: ExtractionDraft) => {
    setIsCaptureOpen(false);
    setExtractionDraft(draft);
    setIsExtractionReviewOpen(true);
    addToast('info', 'Extraction Ready', 'Review parsed notice before confirming to timeline.');
  };

  const handleConfirmExtractedEvent = (finalData: ExtractionDraft) => {
    setIsExtractionReviewOpen(false);

    const newEvent: EventItem = {
      id: 'evt-' + Date.now(),
      title: finalData.title,
      organizer: finalData.organizer,
      category: finalData.category,
      status: 'Open',
      registrationDeadline: finalData.registrationDeadline,
      eventStartDate: finalData.eventStartDate,
      eventEndDate: finalData.eventEndDate,
      timeRange: '10:00 AM – 5:00 PM',
      dateLabel: { month: 'NOV', day: '04' },
      reportingTime: finalData.reportingTime,
      venue: finalData.venue,
      isOnline: false,
      registrationUrl: finalData.registrationUrl,
      summary: 'Extracted campus event notice.',
      daysRemaining: 21,
      thumbnailType: 'product-sprint',
      tags: ['Hackathon', 'Campus'],
      sourceNotice: {
        id: 'src-' + Date.now(),
        channel: finalData.sourceChannel,
        receivedAt: 'Just now',
        senderOrSource: 'Imported notice',
        rawSnippet: finalData.sourceText,
        confidenceScore: finalData.confidenceScore
      },
      changeHistory: [
        {
          id: 'h-' + Date.now(),
          timestamp: 'Just now',
          changeType: 'Created',
          description: 'Added via extraction flow',
          actor: 'User Manual'
        }
      ],
      tasks: []
    };

    setEvents((prev) => [newEvent, ...prev]);

    // Also add to recently added
    setRecentlyAdded((prev) => [
      {
        id: 'rec-' + Date.now(),
        title: finalData.title,
        organizer: finalData.organizer,
        eventId: newEvent.id,
        timeAgo: 'Just now',
        thumbnailType: 'product-sprint'
      },
      ...prev
    ]);

    addToast('success', 'Event Confirmed', `${finalData.title} added to your timeline.`);
  };

  const handleResolveConflict = (decision: 'keep' | 'update' | 'manual', manualValue?: string) => {
    if (!conflictEventId) return;

    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== conflictEventId || !evt.conflict) return evt;

        let resolvedValue = evt.venue;
        let auditNote = '';

        if (decision === 'keep') {
          resolvedValue = evt.conflict.currentValue;
          auditNote = `Kept previous record: ${evt.conflict.currentValue}`;
        } else if (decision === 'update') {
          resolvedValue = evt.conflict.newValue;
          auditNote = `Accepted update: ${evt.conflict.newValue}`;
        } else if (decision === 'manual' && manualValue) {
          resolvedValue = manualValue;
          auditNote = `Applied manual override: ${manualValue}`;
        }

        return {
          ...evt,
          venue: evt.conflict.field === 'venue' ? resolvedValue : evt.venue,
          eventStartDate: evt.conflict.field === 'event_date' ? '2026-10-28T09:30:00' : evt.eventStartDate,
          dateLabel: evt.conflict.field === 'event_date' ? { month: 'OCT', day: '28' } : evt.dateLabel,
          conflict: {
            ...evt.conflict,
            status: 'Resolved',
            resolutionDecision: decision === 'keep' ? 'kept_current' : decision === 'update' ? 'accepted_new' : 'manual_override'
          },
          changeHistory: [
            {
              id: 'h-' + Date.now(),
              timestamp: 'Just now',
              changeType: 'Conflict Resolved',
              description: auditNote,
              actor: 'User Manual'
            },
            ...evt.changeHistory
          ]
        };
      })
    );

    // Remove from attention items if present
    setAttentionItems((prev) => prev.filter((item) => item.eventId !== conflictEventId));

    setConflictEventId(null);
    addToast(
      'success',
      'Discrepancy Reconciled',
      decision === 'keep'
        ? 'Retained original value.'
        : decision === 'update'
        ? 'Updated schedule from latest circular.'
        : `Manual override applied: ${manualValue}`
    );
  };

  const handleToggleNextMove = (taskId: string) => {
    setNextMoves((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const nextState = !task.completed;
          addToast(
            nextState ? 'success' : 'info',
            nextState ? 'Task Completed' : 'Task Marked Pending',
            task.title
          );
          return { ...task, completed: nextState };
        }
        return task;
      })
    );
  };

  const handleToggleTaskInEvent = (eventId: string, taskId: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        return {
          ...evt,
          tasks: evt.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, completed: !task.completed };
            }
            return task;
          })
        };
      })
    );
  };

  const handleAddTaskToEvent = (eventId: string, title: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        const newTask = {
          id: 't-' + Date.now(),
          title,
          dueDate: '2026-10-25',
          completed: false,
          priority: 'Medium' as const
        };
        return {
          ...evt,
          tasks: [...evt.tasks, newTask]
        };
      })
    );
    addToast('success', 'Task Added', title);
  };

  const handleUpdateStatus = (eventId: string, newStatus: EventStatus) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        return {
          ...evt,
          status: newStatus,
          changeHistory: [
            {
              id: 'h-' + Date.now(),
              timestamp: 'Just now',
              changeType: 'Status Changed',
              description: `Status changed to ${newStatus}`,
              actor: 'User Manual'
            },
            ...evt.changeHistory
          ]
        };
      })
    );
    addToast('info', 'Status Updated', `Event marked as "${newStatus}"`);
  };

  const handleAttentionItemClick = (item: AttentionItem) => {
    if (item.type === 'conflict') {
      const evt = events.find((e) => e.id === item.eventId);
      if (evt && evt.conflict) {
        setConflictEventId(evt.id);
      } else {
        setDetailEventId(item.eventId);
      }
    } else {
      setDetailEventId(item.eventId);
    }
  };

  return (
    <div className="app-layout">
      {/* 1. Left Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCapture={() => setIsCaptureOpen(true)}
        conflictCount={pendingConflicts.length}
        onProfileMenuClick={() => setIsProfileOpen(true)}
      />

      {/* 2. Main Viewport */}
      <div className="app-main-viewport">
        {/* Top Search & Profile Bar */}
        <TopHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isNotificationsOpen={isNotificationsOpen}
          setIsNotificationsOpen={setIsNotificationsOpen}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          onResetDemoData={handleResetDemoData}
          onSelectNotificationItem={(eventId) => setDetailEventId(eventId)}
        />

        {/* Dynamic Page Views */}
        <div className="dashboard-scroll-content">
          {activeView === 'overview' && (
            <>
              {/* Greeting Header */}
              <GreetingHeader
                onOpenAddEvent={() => setIsCaptureOpen(true)}
                dateString="Tue, 14 Oct 2026"
                userName="Chakshu"
              />

              {/* 4 Summary Metric Cards */}
              <MetricsRow
                upcomingCount={12}
                deadlinesCount={5}
                needsReviewCount={pendingConflicts.length}
                registeredCount={events.filter((e) => e.status === 'Registered').length}
                onCardClick={(type) => {
                  if (type === 'upcoming') setActiveView('timeline');
                  else if (type === 'deadlines') {
                    setActiveView('timeline');
                    setTimelineStatus('In Progress');
                  } else if (type === 'needs-review') setActiveView('needs-review');
                  else if (type === 'registered') {
                    setActiveView('timeline');
                    setTimelineStatus('Registered');
                  }
                }}
              />

              {/* Main 2-Column Dashboard Layout */}
              <div className="dashboard-main-grid">
                {/* Left Column: Upcoming Events & Bottom Split */}
                <div className="dashboard-left-col">
                  {/* Upcoming Events Panel */}
                  <UpcomingEventsSection
                    events={searchedEvents}
                    onSelectEvent={(evt) => setDetailEventId(evt.id)}
                    onViewAll={() => setActiveView('timeline')}
                  />

                  {/* Bottom Split Row: Needs Attention & Recently Added */}
                  <div className="split-panels-row">
                    <NeedsAttentionCard
                      items={attentionItems}
                      onSelectItem={handleAttentionItemClick}
                      onViewAll={() => setActiveView('needs-review')}
                    />

                    <RecentlyAddedCard
                      items={recentlyAdded}
                      onSelectItem={(item) => setDetailEventId(item.eventId)}
                      onViewAll={() => setActiveView('timeline')}
                    />
                  </div>
                </div>

                {/* Right Column: Calendar & Your Next Moves */}
                <div className="dashboard-right-col">
                  {/* Calendar Panel */}
                  <CalendarPanel
                    events={events}
                    selectedDate={selectedCalendarDate}
                    onSelectDate={(d) => {
                      setSelectedCalendarDate(d);
                      const matchingEvt = events.find((e) =>
                        e.eventStartDate.startsWith(
                          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
                        )
                      );
                      if (matchingEvt) {
                        addToast('info', matchingEvt.title, matchingEvt.timeRange || matchingEvt.venue);
                      }
                    }}
                    onOpenEvent={(evt) => setDetailEventId(evt.id)}
                  />

                  {/* Your Next Moves Panel */}
                  <NextMovesPanel
                    tasks={nextMoves}
                    onToggleTask={handleToggleNextMove}
                    onOpenTaskEvent={(eventId) => eventId && setDetailEventId(eventId)}
                  />
                </div>
              </div>
            </>
          )}

          {/* View: My Timeline */}
          {activeView === 'timeline' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a' }}>My Timeline</h1>
                  <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
                    All verified campus opportunities sorted by chronological cutoff dates.
                  </p>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => setIsCaptureOpen(true)}
                >
                  + Add Event
                </button>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <select
                  value={timelineCategory}
                  onChange={(e) => setTimelineCategory(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="All">All Categories</option>
                  <option value="Hackathons">Hackathons</option>
                  <option value="Competitions">Competitions</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Internships">Internships</option>
                  <option value="Conferences">Conferences</option>
                </select>

                <select
                  value={timelineStatus}
                  onChange={(e) => setTimelineStatus(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="All">All Statuses</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Registered">Registered</option>
                  <option value="Interested">Interested</option>
                  <option value="Open">Open</option>
                </select>

                {(timelineCategory !== 'All' || timelineStatus !== 'All') && (
                  <button
                    className="btn-secondary btn-sm"
                    onClick={() => {
                      setTimelineCategory('All');
                      setTimelineStatus('All');
                    }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {searchedEvents
                  .filter((e) => (timelineCategory === 'All' ? true : e.category.includes(timelineCategory)))
                  .filter((e) => (timelineStatus === 'All' ? true : e.status === timelineStatus))
                  .map((evt) => (
                    <div
                      key={evt.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e9edf2',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                      onClick={() => setDetailEventId(evt.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div className="event-date-box">
                          <span className="event-date-month">{evt.dateLabel?.month || 'OCT'}</span>
                          <span className="event-date-day">{evt.dateLabel?.day || '14'}</span>
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>{evt.title}</strong>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{evt.organizer} · {evt.venue}</div>
                          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                            {evt.tags.map((t) => (
                              <span key={t} className="event-tag-pill">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className={`status-badge badge-${evt.status.toLowerCase().replace(' ', '-')}`}>
                          {evt.status}
                        </span>
                        <ArrowRight size={16} color="#94a3b8" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* View: Needs Review */}
          {activeView === 'needs-review' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a' }}>Needs Review Workspace</h1>
                <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
                  Notices flagged for date shifts, venue changes, or ambiguous reporting requirements.
                </p>
              </div>

              {pendingConflicts.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', background: '#ffffff', borderRadius: '12px', border: '1px solid #e9edf2' }}>
                  <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 12px auto' }} />
                  <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>All Notices Reconciled</h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>No discrepancies detected across your campus feeds.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {pendingConflicts.map((evt) => {
                    const conf = evt.conflict;
                    if (!conf) return null;
                    return (
                      <div
                        key={evt.id}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #fee2e2',
                          borderRadius: '12px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className="attention-icon-box bg-red-tint">
                              <AlertCircle size={20} className="text-red" />
                            </div>
                            <div>
                              <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{evt.title}</strong>
                              <span style={{ fontSize: '0.8rem', color: '#dc2626', marginLeft: '10px' }}>
                                Conflicting field: <strong>{conf.fieldLabel}</strong>
                              </span>
                            </div>
                          </div>

                          <button
                            className="btn-primary btn-sm"
                            onClick={() => setConflictEventId(evt.id)}
                          >
                            Resolve Discrepancy
                          </button>
                        </div>

                        <div className="conflict-comparison-grid">
                          <div className="comparison-box">
                            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>CURRENT VALUE</span>
                            <strong style={{ color: '#dc2626' }}>{conf.currentValue}</strong>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Source: {conf.currentSource}</span>
                          </div>

                          <div className="comparison-box incoming">
                            <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600 }}>NEWLY DETECTED UPDATE</span>
                            <strong style={{ color: '#059669' }}>{conf.newValue}</strong>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Source: {conf.newSource}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* View: Sources */}
          {activeView === 'sources' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a' }}>Campus Feeds & Sources</h1>
                <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
                  Channels forwarding event announcements and flyers to your FORWARD pipeline.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {[
                  { name: 'VIPS Tech Circle Official', channel: 'WhatsApp', notices: 14, active: true },
                  { name: 'University Placement Cell (TPC)', channel: 'Email', notices: 8, active: true },
                  { name: 'GDSC Delhi Announcements', channel: 'Discord', notices: 23, active: true },
                  { name: 'IIT Delhi Academic Hub', channel: 'PDF Circulars', notices: 6, active: true },
                  { name: 'Unstop & Devfolio Portals', channel: 'Web RSS', notices: 19, active: true }
                ].map((src, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e9edf2',
                      borderRadius: '12px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.94rem', color: '#0f172a' }}>{src.name}</strong>
                      <span className="event-tag-pill">{src.channel}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {src.notices} circulars ingested and verified
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#059669', marginTop: '6px' }}>
                      <CheckCircle2 size={13} />
                      <span>Active sync connection</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* View: Settings */}
          {activeView === 'settings' && (
            <div style={{ maxWidth: '640px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a' }}>Settings & Demo Controls</h1>
                <p style={{ fontSize: '0.86rem', color: '#64748b' }}>
                  Manage student profile preferences and prototype testing parameters.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e9edf2', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>Active Demo Date</label>
                  <p style={{ fontSize: '0.76rem', color: '#64748b', marginBottom: '8px' }}>Aligned with Hackathon reference evaluation date.</p>
                  <input
                    type="text"
                    className="form-input"
                    value="14 October 2026"
                    disabled
                    style={{ background: '#f8fafc', color: '#64748b' }}
                  />
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>Reset Prototype State</label>
                  <p style={{ fontSize: '0.76rem', color: '#64748b', marginBottom: '12px' }}>
                    Restores default 12 opportunities, 3 attention alerts, and 5 next move tasks from reference.
                  </p>
                  <button
                    className="btn-secondary"
                    onClick={handleResetDemoData}
                  >
                    Restore Reference Mock Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Modals */}
      <CaptureModal
        isOpen={isCaptureOpen}
        onClose={() => setIsCaptureOpen(false)}
        onExtractionSuccess={handleExtractionComplete}
      />

      <ExtractionReviewModal
        isOpen={isExtractionReviewOpen}
        draft={extractionDraft}
        onClose={() => setIsExtractionReviewOpen(false)}
        onConfirm={handleConfirmExtractedEvent}
        onTriggerConflictReview={() => {
          setIsExtractionReviewOpen(false);
          if (pendingConflicts.length > 0) {
            setConflictEventId(pendingConflicts[0].id);
          } else {
            setConflictEventId(events[0].id);
          }
        }}
      />

      <EventDetailModal
        isOpen={!!detailEventId}
        event={selectedDetailEvent}
        onClose={() => setDetailEventId(null)}
        onUpdateStatus={handleUpdateStatus}
        onToggleTask={handleToggleTaskInEvent}
        onAddTask={handleAddTaskToEvent}
        onOpenConflict={(e) => {
          setDetailEventId(null);
          setConflictEventId(e.id);
        }}
      />

      <ConflictModal
        isOpen={!!conflictEventId}
        event={selectedConflictEvent}
        onClose={() => setConflictEventId(null)}
        onResolve={handleResolveConflict}
      />

      {/* Toast Stack */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
