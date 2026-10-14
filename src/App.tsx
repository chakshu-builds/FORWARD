import { useState, useMemo, useEffect } from 'react';
import type { EventItem, EventStatus, ExtractionDraft, ActiveView } from './types';
import { INITIAL_EVENTS, SAMPLE_EXTRACTION_RESULT } from './data/mockData';
import { Navbar } from './components/Navbar';
import { WorkflowBar } from './components/WorkflowBar';
import { NextDeadlineHero } from './components/NextDeadlineHero';
import { EventCard } from './components/EventCard';
import { SidebarWidgets } from './components/SidebarWidgets';
import { CaptureModal } from './components/CaptureModal';
import { ExtractionReviewModal } from './components/ExtractionReviewModal';
import { EventDetailModal } from './components/EventDetailModal';
import { ConflictModal } from './components/ConflictModal';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import {
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';

export function App() {
  // State
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'deadline' | 'title'>('deadline');

  // Modals state
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);
  const [isExtractionReviewOpen, setIsExtractionReviewOpen] = useState(false);
  const [extractionDraft, setExtractionDraft] = useState<ExtractionDraft>(SAMPLE_EXTRACTION_RESULT);
  const [detailEventId, setDetailEventId] = useState<string | null>(null);
  const [conflictEventId, setConflictEventId] = useState<string | null>(null);

  // Global Escape key support to dismiss modals cleanly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCaptureOpen(false);
        setIsExtractionReviewOpen(false);
        setDetailEventId(null);
        setConflictEventId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([
    {
      id: 'toast-welcome',
      type: 'info',
      title: 'FORWARD Prototype Loaded',
      description: 'Simulating unified timeline with 6 campus opportunities and 1 pending discrepancy.'
    }
  ]);

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
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
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

  // Conflicted events
  const conflictedEvents = useMemo(
    () => events.filter((e) => e.conflict && e.conflict.status === 'Pending'),
    [events]
  );

  // Upcoming critical deadline event (Goldman Sachs CodeSprint or nearest)
  const urgentDeadlineEvent = useMemo(() => {
    return events.find((e) => e.isUrgent) || events[0];
  }, [events]);

  // Aggregated checklist tasks
  const allTasks = useMemo(() => {
    return events.flatMap((e) =>
      e.tasks.map((task) => ({
        task,
        eventTitle: e.title,
        eventId: e.id
      }))
    );
  }, [events]);

  // Filtered & Sorted events
  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (activeView === 'needs-review') {
      result = result.filter((e) => e.conflict && e.conflict.status === 'Pending');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((e) => e.category === selectedCategory);
    }

    if (selectedStatus !== 'All') {
      result = result.filter((e) => e.status === selectedStatus);
    }

    result.sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime();
      }
      return a.title.localeCompare(b.title);
    });

    return result;
  }, [events, activeView, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // ==========================================
  // Interactive Prototype Actions (Zero Dead Buttons)
  // ==========================================

  // Step 1 -> Step 2: Extraction completed from CaptureModal
  const handleExtractionComplete = (draft: ExtractionDraft) => {
    setIsCaptureOpen(false);
    setExtractionDraft(draft);
    setIsExtractionReviewOpen(true);
    addToast('info', 'Simulated Extraction Ready', 'Parsed dates, venue, and reporting schedule.');
  };

  // Step 3: Confirm extracted event into Timeline
  const handleConfirmExtractedEvent = (finalData: ExtractionDraft) => {
    setIsExtractionReviewOpen(false);

    // Update existing or add new
    const existingIndex = events.findIndex((e) => e.title.includes('HackShift'));

    if (existingIndex >= 0) {
      const updatedEvents = [...events];
      const target = updatedEvents[existingIndex];
      updatedEvents[existingIndex] = {
        ...target,
        venue: finalData.venue,
        reportingTime: finalData.reportingTime,
        registrationDeadline: finalData.registrationDeadline,
        changeHistory: [
          {
            id: 'h-' + Date.now(),
            timestamp: 'Just now (Simulated)',
            changeType: 'Field Updated',
            description: 'Confirmed new details from verified WhatsApp circular notice',
            actor: 'User Manual'
          },
          ...target.changeHistory
        ]
      };
      setEvents(updatedEvents);
      addToast('success', 'Event Confirmed & Timeline Updated', `Synced ${finalData.title}`);
    } else {
      const newEvent: EventItem = {
        id: 'evt-' + Date.now(),
        title: finalData.title,
        organizer: finalData.organizer,
        category: finalData.category,
        status: 'Interested',
        registrationDeadline: finalData.registrationDeadline,
        eventStartDate: finalData.eventStartDate,
        eventEndDate: finalData.eventEndDate,
        reportingTime: finalData.reportingTime,
        venue: finalData.venue,
        registrationUrl: finalData.registrationUrl,
        summary: 'Extracted campus event notice.',
        daysRemaining: 14,
        tags: [finalData.category, 'Campus Notice'],
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
            description: 'Created through verified extraction flow',
            actor: 'User Manual'
          }
        ],
        tasks: [
          {
            id: 't-' + Date.now(),
            title: 'Verify team registration on portal',
            dueDate: finalData.registrationDeadline.split('T')[0],
            completed: false,
            priority: 'High'
          }
        ]
      };
      setEvents([newEvent, ...events]);
      addToast('success', 'New Opportunity Added', `${finalData.title} added to your timeline.`);
    }
  };

  // Step 4: Resolve Conflict
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
          auditNote = `Accepted updated notice: ${evt.conflict.newValue}`;
        } else if (decision === 'manual' && manualValue) {
          resolvedValue = manualValue;
          auditNote = `Applied manual override: ${manualValue}`;
        }

        return {
          ...evt,
          venue: resolvedValue.split(',')[0],
          reportingTime: resolvedValue.includes(',') ? resolvedValue.split(',')[1].trim() : evt.reportingTime,
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

    setConflictEventId(null);
    addToast(
      'success',
      'Discrepancy Reconciled',
      decision === 'keep'
        ? 'Retained original notice details.'
        : decision === 'update'
        ? 'Timeline updated with latest circular details.'
        : `Manual override applied: ${manualValue}`
    );
  };

  // Toggle checklist item
  const handleToggleTask = (eventId: string, taskId: string) => {
    let taskName = '';
    let isNowCompleted = false;

    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        return {
          ...evt,
          tasks: evt.tasks.map((task) => {
            if (task.id === taskId) {
              taskName = task.title;
              isNowCompleted = !task.completed;
              return { ...task, completed: !task.completed };
            }
            return task;
          })
        };
      })
    );

    if (taskName) {
      addToast(
        isNowCompleted ? 'success' : 'info',
        isNowCompleted ? 'Task Marked Completed' : 'Task Marked Pending',
        taskName
      );
    }
  };

  // Add new prep task
  const handleAddTask = (eventId: string, title: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        const newTask = {
          id: 't-' + Date.now(),
          title,
          dueDate: '2026-03-30',
          completed: false,
          priority: 'Medium' as const
        };
        return {
          ...evt,
          tasks: [...evt.tasks, newTask]
        };
      })
    );

    addToast('success', 'Checklist Item Added', title);
  };

  // Update Event Status
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

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCapture={() => setIsCaptureOpen(true)}
        conflictCount={conflictedEvents.length}
      />

      <main className="main-content">
        {/* Workflow Concept Banner */}
        <WorkflowBar
          onStageClick={(stage) => {
            if (stage === 'Capture') setIsCaptureOpen(true);
            else if (stage === 'Extract') {
              setIsExtractionReviewOpen(true);
            } else if (stage === 'Reconcile') {
              if (conflictedEvents.length > 0) {
                setConflictEventId(conflictedEvents[0].id);
              } else {
                addToast('info', 'All Notices Reconciled', 'No pending conflicts in feeds.');
              }
            } else if (stage === 'Verify') {
              setIsExtractionReviewOpen(true);
            } else if (stage === 'Act') {
              setActiveView('timeline');
            }
          }}
        />

        {/* Welcome Heading & Product Intro */}
        <div className="welcome-header">
          <div className="welcome-row">
            <div>
              <h1 className="welcome-title">
                One Timeline. All Opportunities.
              </h1>
              <p className="welcome-subtitle">
                Organize hackathons, workshops, and application deadlines scattered across WhatsApp messages,
                PDF flyers, emails, and portals into a single verified, actionable timeline.
              </p>
            </div>

            <div className="welcome-stats-row">
              <div className="stat-pill">
                <Calendar size={14} style={{ color: '#818cf8' }} />
                <span>Tracked: <strong>{events.length} Opportunities</strong></span>
              </div>
              <div className={`stat-pill ${conflictedEvents.length > 0 ? 'alert' : ''}`}>
                <AlertCircle size={14} />
                <span>Needs Review: <strong>{conflictedEvents.length} Discrepancy</strong></span>
              </div>
              <div className="stat-pill">
                <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                <span>Action Moves: <strong>{allTasks.filter(t => t.task.completed).length}/{allTasks.length} Completed</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Upcoming Deadline Banner */}
        {activeView === 'dashboard' && (
          <NextDeadlineHero
            event={urgentDeadlineEvent}
            onOpenDetails={(evt) => setDetailEventId(evt.id)}
          />
        )}

        {/* Active View Specific Content */}
        {activeView === 'needs-review' && (
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <AlertCircle size={18} style={{ color: '#f59e0b' }} />
              <strong style={{ color: '#fcd34d' }}>Needs Review Workspace</strong>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '0.25rem' }}>
              Showing campus opportunities where overlapping circulars or revised flyers detected conflicting deadlines, venues, or reporting guidelines.
            </p>
          </div>
        )}

        {/* Main 2-Column Grid */}
        <div className="dashboard-grid">
          {/* Left Column: Search, Filters, and Timeline Cards */}
          <div className="events-column">
            {/* Filter and Search Controls */}
            <div className="controls-card">
              <div className="search-input-wrap">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by title, department, venue, or tag (e.g. HackShift, DSA, BCI, GDG)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-tags-row">
                <div className="category-pills">
                  {['All', 'Hackathon', 'Workshop', 'Competition', 'Conference'].map((cat) => (
                    <button
                      key={cat}
                      className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="status-select-wrap">
                  <Filter size={13} style={{ color: '#94a3b8' }} />
                  <select
                    className="select-dropdown"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    aria-label="Filter by Status"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Registered">Registered</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Interested">Interested</option>
                  </select>

                  <ArrowUpDown size={13} style={{ color: '#94a3b8', marginLeft: '0.25rem' }} />
                  <select
                    className="select-dropdown"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'deadline' | 'title')}
                    aria-label="Sort by"
                  >
                    <option value="deadline">Earliest Deadline</option>
                    <option value="title">Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Event Timeline Cards List */}
            <div className="timeline-list">
              {filteredEvents.length === 0 ? (
                <div style={{ padding: '3rem 1.5rem', textAlign: 'center', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                  <Info size={28} style={{ color: '#64748b', margin: '0 auto 0.75rem auto' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>No opportunities matching your filter</h4>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                    Try clearing your search query or selecting "All" categories.
                  </p>
                  <button
                    className="btn-secondary btn-sm"
                    style={{ marginTop: '0.85rem' }}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedStatus('All');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    onOpenDetails={(e) => setDetailEventId(e.id)}
                    onOpenConflict={(e) => setConflictEventId(e.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Column: Needs Review & Next Moves Checklist */}
          <SidebarWidgets
            conflictedEvents={conflictedEvents}
            allTasks={allTasks}
            onToggleTask={handleToggleTask}
            onOpenConflict={(e) => setConflictEventId(e.id)}
          />
        </div>
      </main>

      {/* Floating Interactive Toast Feedback */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Capture Modal (Text / File / Link) */}
      <CaptureModal
        isOpen={isCaptureOpen}
        onClose={() => setIsCaptureOpen(false)}
        onExtractionSuccess={handleExtractionComplete}
      />

      {/* Review Extraction Modal */}
      <ExtractionReviewModal
        isOpen={isExtractionReviewOpen}
        draft={extractionDraft}
        onClose={() => setIsExtractionReviewOpen(false)}
        onConfirm={handleConfirmExtractedEvent}
        onTriggerConflictReview={() => {
          setIsExtractionReviewOpen(false);
          if (conflictedEvents.length > 0) {
            setConflictEventId(conflictedEvents[0].id);
          } else {
            setConflictEventId(events[0].id);
          }
        }}
      />

      {/* Event Details Modal */}
      <EventDetailModal
        isOpen={!!detailEventId}
        event={selectedDetailEvent}
        onClose={() => setDetailEventId(null)}
        onUpdateStatus={handleUpdateStatus}
        onToggleTask={handleToggleTask}
        onAddTask={handleAddTask}
        onOpenConflict={(e) => {
          setDetailEventId(null);
          setConflictEventId(e.id);
        }}
      />

      {/* Conflict Resolution Side-by-Side Modal */}
      <ConflictModal
        isOpen={!!conflictEventId}
        event={selectedConflictEvent}
        onClose={() => setConflictEventId(null)}
        onResolve={handleResolveConflict}
      />
    </div>
  );
}

export default App;
