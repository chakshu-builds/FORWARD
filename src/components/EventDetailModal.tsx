import React, { useState, useEffect, useRef, useId } from 'react';
import type { EventItem, EventStatus, PrepTask } from '../types';
import { EventThumbnail } from './EventThumbnail';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  AlertTriangle,
  CheckSquare,
  History,
  FileText,
  Check,
  Plus,
  AlertCircle,
  ChevronDown,
  Link2
} from 'lucide-react';

interface EventDetailModalProps {
  isOpen: boolean;
  event: EventItem | null;
  onClose: () => void;
  onUpdateStatus: (eventId: string, newStatus: EventStatus) => void;
  onToggleTask: (eventId: string, taskId: string) => void;
  onAddTask: (
    eventId: string,
    title: string,
    dueDate?: string,
    priority?: 'High' | 'Medium' | 'Low'
  ) => void;
  onOpenConflict: (event: EventItem) => void;
}

interface DialogContentProps {
  event: EventItem;
  onClose: () => void;
  onUpdateStatus: (eventId: string, newStatus: EventStatus) => void;
  onToggleTask: (eventId: string, taskId: string) => void;
  onAddTask: (
    eventId: string,
    title: string,
    dueDate?: string,
    priority?: 'High' | 'Medium' | 'Low'
  ) => void;
  onOpenConflict: (event: EventItem) => void;
}

// Format date with exact time matching reference: e.g. "Oct 15, 2026, 11:59 PM"
const formatKeyDateTime = (isoString?: string): string => {
  if (!isoString) return 'TBA';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const day = d.getDate();
    const year = d.getFullYear();
    const time = d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return `${month} ${day}, ${year}, ${time}`;
  } catch {
    return isoString;
  }
};

// Format task due date: e.g. "Oct 15, 2026"
const formatTaskDue = (dateStr?: string): string => {
  if (!dateStr) return 'TBA';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

// Format history timestamp: e.g. "14 Oct 2026"
const formatHistoryTimestamp = (ts?: string): string => {
  if (!ts) return 'Recent';
  if (ts.includes('-') && ts.length === 10) {
    try {
      const d = new Date(ts);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      }
    } catch {
      // Fallback
    }
  }
  return ts;
};

// Status indicator dot color
const getStatusColor = (status: EventStatus): string => {
  switch (status) {
    case 'Registered':
    case 'Open':
      return '#10b981'; // emerald green
    case 'In Progress':
      return '#3b82f6'; // blue
    case 'Submitted':
      return '#8b5cf6'; // purple
    case 'Interested':
      return '#f59e0b'; // amber
    case 'Completed':
      return '#6366f1'; // indigo
    default:
      return '#94a3b8'; // slate
  }
};

const EventDetailModalContent: React.FC<DialogContentProps> = ({
  event,
  onClose,
  onUpdateStatus,
  onToggleTask,
  onAddTask,
  onOpenConflict
}) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState(
    event.registrationDeadline ? event.registrationDeadline.split('T')[0] : '2026-10-25'
  );
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [taskError, setTaskError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const taskInputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  // Focus input when inline task form opens
  useEffect(() => {
    if (showAddTaskForm && taskInputRef.current) {
      taskInputRef.current.focus();
    }
  }, [showAddTaskForm]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showAddTaskForm) {
          setShowAddTaskForm(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAddTaskForm, onClose]);

  const completedTasks = event.tasks.filter((t) => t.completed).length;
  const totalTasks = event.tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTaskTitle.trim();
    if (!trimmed) {
      setTaskError('Please enter a task title');
      return;
    }
    setTaskError('');
    onAddTask(event.id, trimmed, newTaskDueDate || undefined, newTaskPriority);
    setNewTaskTitle('');
    setShowAddTaskForm(false);
  };

  return (
    <div
      className="event-detail-modal-card"
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <header className="event-detail-header">
        <div className="event-detail-header-left">
          <div className="event-detail-thumbnail-wrap">
            <EventThumbnail
              type={event.thumbnailType || event.id}
              size={52}
              className="event-detail-logo-thumb"
            />
          </div>
          <div className="event-detail-header-info">
            <span className="event-detail-category-badge">{event.category}</span>
            <h2 id={titleId} className="event-detail-title">
              {event.title}
            </h2>
            <p className="event-detail-organizer">Organized by {event.organizer}</p>
          </div>
        </div>
        <button
          type="button"
          className="event-detail-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      </header>

      {/* Status & Portal Link Row */}
      <div className="event-detail-action-bar">
        <div className="event-detail-status-pill-box">
          <span className="event-detail-status-label">Event Status</span>
          <div className="event-detail-status-select-wrap">
            <span
              className="event-detail-status-dot"
              style={{ backgroundColor: getStatusColor(event.status) }}
            />
            <span className="event-detail-status-text">{event.status}</span>
            <ChevronDown size={14} style={{ color: '#64748b' }} />
            <select
              className="event-detail-status-select"
              value={event.status}
              onChange={(e) => onUpdateStatus(event.id, e.target.value as EventStatus)}
              aria-label="Change event status"
            >
              <option value="Registered">Registered</option>
              <option value="In Progress">In Progress</option>
              <option value="Submitted">Submitted</option>
              <option value="Interested">Interested</option>
              <option value="Completed">Completed</option>
              <option value="Open">Open</option>
              <option value="Not Registered">Not Registered</option>
            </select>
          </div>
        </div>

        {event.conflict && event.conflict.status === 'Pending' && (
          <button
            type="button"
            className="event-detail-conflict-btn"
            onClick={() => onOpenConflict(event)}
            title="Resolve conflicting dates or venue"
          >
            <AlertTriangle size={15} />
            <span>Resolve Discrepancy</span>
          </button>
        )}

        {event.registrationUrl ? (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="event-detail-portal-btn"
            title={`Open ${event.title} registration portal`}
          >
            <span>Portal Link</span>
            <ExternalLink size={15} />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="event-detail-portal-btn disabled"
            title="No registration portal URL available for this listing"
          >
            <span>Portal Link</span>
            <ExternalLink size={15} />
          </button>
        )}
      </div>

      {/* Modal Scrollable Body */}
      <div className="event-detail-body">
        {/* Section: Overview & Objectives */}
        <section className="event-detail-section">
          <h3 className="event-detail-section-title">
            <FileText size={17} className="event-detail-section-icon" />
            <span>Overview & Objectives</span>
          </h3>
          <p className="event-detail-overview-text">
            {event.summary ||
              'Student-focused open-innovation program covering development, engineering, and collaboration. Official guidelines and submission requirements published by the organizing team.'}
          </p>
        </section>

        {/* Section: Key Dates & Timing */}
        <section className="event-detail-section">
          <h3 className="event-detail-section-title">
            <Calendar size={17} className="event-detail-section-icon" />
            <span>Key Dates & Timing</span>
          </h3>
          <div className="event-detail-dates-card">
            {/* Cutoff Deadline */}
            <div className="event-detail-date-item">
              <div className="event-detail-date-icon-box">
                <Clock size={18} style={{ color: '#f59e0b' }} />
              </div>
              <div className="event-detail-date-texts">
                <span className="event-detail-date-label">Cutoff Deadline</span>
                <span className="event-detail-date-value">
                  {formatKeyDateTime(event.registrationDeadline)}
                </span>
              </div>
            </div>

            {/* Event Kickoff */}
            <div className="event-detail-date-item">
              <div className="event-detail-date-icon-box">
                <Calendar size={18} style={{ color: '#6366f1' }} />
              </div>
              <div className="event-detail-date-texts">
                <span className="event-detail-date-label">Event Kickoff</span>
                <span className="event-detail-date-value">
                  {formatKeyDateTime(event.eventStartDate)}
                </span>
              </div>
            </div>

            {/* Reporting Time */}
            <div className="event-detail-date-item">
              <div className="event-detail-date-icon-box">
                <Clock size={18} style={{ color: '#0284c7' }} />
              </div>
              <div className="event-detail-date-texts">
                <span className="event-detail-date-label">Reporting Time</span>
                <span className="event-detail-date-value">
                  {event.reportingTime || event.timeRange || '10:00 AM – 5:00 PM'}
                </span>
              </div>
            </div>

            {/* Venue */}
            <div className="event-detail-date-item">
              <div className="event-detail-date-icon-box">
                <MapPin size={18} style={{ color: '#10b981' }} />
              </div>
              <div className="event-detail-date-texts">
                <span className="event-detail-date-label">Venue</span>
                <span className="event-detail-date-value">
                  {event.venue || (event.isOnline ? 'Online' : 'To Be Announced')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Preparation Checklist */}
        <section className="event-detail-section">
          <div className="event-detail-section-header">
            <h3 className="event-detail-section-title">
              <CheckSquare size={17} className="event-detail-section-icon" />
              <span>
                Preparation Checklist ({completedTasks}/{totalTasks} Completed — {progressPercent}%)
              </span>
            </h3>
            {!showAddTaskForm && (
              <button
                type="button"
                className="event-detail-add-task-btn"
                onClick={() => setShowAddTaskForm(true)}
              >
                <Plus size={14} />
                <span>Add Checklist Item</span>
              </button>
            )}
          </div>

          {/* Inline Add Task Form */}
          {showAddTaskForm && (
            <form onSubmit={handleCreateTask} className="event-detail-add-task-form">
              <div>
                <input
                  ref={taskInputRef}
                  type="text"
                  className="event-detail-add-task-input"
                  placeholder="Enter checklist task title (e.g., Submit GitHub repository link)..."
                  value={newTaskTitle}
                  onChange={(e) => {
                    setNewTaskTitle(e.target.value);
                    if (taskError) setTaskError('');
                  }}
                />
                {taskError && (
                  <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                    {taskError}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <label style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
                    Due:
                  </label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    style={{
                      padding: '5px 8px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: '#0f172a',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <label style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
                    Priority:
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) =>
                      setNewTaskPriority(e.target.value as 'High' | 'Medium' | 'Low')
                    }
                    style={{
                      padding: '5px 8px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: '#0f172a',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddTaskForm(false)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '6px 16px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: 'none',
                      borderRadius: '6px',
                      background: '#2563eb',
                      color: '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Checklist items */}
          {event.tasks.length > 0 ? (
            <div className="event-detail-checklist-list">
              {event.tasks.map((task: PrepTask) => (
                <div key={task.id} className="event-detail-checklist-item">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={task.completed}
                    className={`event-detail-checkbox ${task.completed ? 'checked' : ''}`}
                    onClick={() => onToggleTask(event.id, task.id)}
                    aria-label={`Mark task ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
                  >
                    {task.completed && <Check size={13} strokeWidth={3} />}
                  </button>

                  <div className="event-detail-task-content">
                    <span
                      className={`event-detail-task-title ${task.completed ? 'completed' : ''}`}
                    >
                      {task.title}
                    </span>
                    <div className="event-detail-task-meta">
                      <span className="event-detail-task-due">
                        Due: {formatTaskDue(task.dueDate)}
                      </span>
                      {task.priority === 'High' && (
                        <span className="event-detail-priority-badge high">
                          <AlertCircle size={11} strokeWidth={2.5} />
                          <span>High priority</span>
                        </span>
                      )}
                      {task.priority === 'Medium' && (
                        <span className="event-detail-priority-badge medium">
                          Medium priority
                        </span>
                      )}
                      {task.priority === 'Low' && (
                        <span className="event-detail-priority-badge low">Low priority</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: '16px',
                border: '1px dashed #cbd5e1',
                borderRadius: '10px',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '0.84rem'
              }}
            >
              No preparation checklist items added yet. Click &ldquo;+ Add Checklist Item&rdquo; to track deadlines or deliverables.
            </div>
          )}
        </section>

        {/* Section: Source Notice & Evidence */}
        <section className="event-detail-section">
          <h3 className="event-detail-section-title">
            <FileText size={17} className="event-detail-section-icon" />
            <span>Source Notice &amp; Evidence</span>
          </h3>
          <div className="event-detail-evidence-card">
            <div className="event-detail-evidence-top">
              <div className="event-detail-evidence-channel">
                <Link2 size={15} style={{ color: '#2563eb' }} />
                <span>
                  Channel: {event.sourceNotice?.channel || 'Web Link'} (
                  {event.sourceNotice?.senderOrSource || event.organizer})
                </span>
              </div>
              <div className="event-detail-evidence-time">
                Captured: {event.sourceNotice?.receivedAt || '14 Oct 2026, 09:30'}
              </div>
            </div>
            <p className="event-detail-evidence-snippet">
              &ldquo;{event.sourceNotice?.rawSnippet || event.summary}&rdquo;
            </p>
          </div>
        </section>

        {/* Section: Version & Audit History */}
        <section className="event-detail-section">
          <h3 className="event-detail-section-title">
            <History size={17} className="event-detail-section-icon" />
            <span>Version &amp; Audit History</span>
          </h3>
          <div className="event-detail-history-timeline">
            <div className="event-detail-history-line" />
            {event.changeHistory && event.changeHistory.length > 0 ? (
              event.changeHistory.map((item) => (
                <div key={item.id} className="event-detail-history-item">
                  <span className="event-detail-history-node" />
                  <div className="event-detail-history-header">
                    <span>{item.changeType}</span>
                    <span>•</span>
                    <span>{formatHistoryTimestamp(item.timestamp)}</span>
                    <span>•</span>
                    <span style={{ color: '#2563eb' }}>{item.actor}</span>
                  </div>
                  <p className="event-detail-history-desc">{item.description}</p>
                </div>
              ))
            ) : (
              <div className="event-detail-history-item">
                <span className="event-detail-history-node" />
                <div className="event-detail-history-header">
                  <span>Created • 14 Oct 2026 • Seed Dataset</span>
                </div>
                <p className="event-detail-history-desc">
                  Seeded from public event listing page.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal Footer */}
      <footer className="event-detail-footer">
        <button
          type="button"
          className="event-detail-close-action-btn"
          onClick={onClose}
        >
          Close
        </button>
      </footer>
    </div>
  );
};

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  event,
  onClose,
  onUpdateStatus,
  onToggleTask,
  onAddTask,
  onOpenConflict
}) => {
  if (!isOpen || !event) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <EventDetailModalContent
        key={event.id}
        event={event}
        onClose={onClose}
        onUpdateStatus={onUpdateStatus}
        onToggleTask={onToggleTask}
        onAddTask={onAddTask}
        onOpenConflict={onOpenConflict}
      />
    </div>
  );
};
