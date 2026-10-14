import { useState } from 'react';
import type { EventItem, EventStatus } from '../types';
import { X, Calendar, Clock, MapPin, ExternalLink, AlertTriangle, CheckSquare, History, FileText, Check, Plus } from 'lucide-react';

interface EventDetailModalProps {
  isOpen: boolean;
  event: EventItem | null;
  onClose: () => void;
  onUpdateStatus: (eventId: string, newStatus: EventStatus) => void;
  onToggleTask: (eventId: string, taskId: string) => void;
  onAddTask: (eventId: string, title: string) => void;
  onOpenConflict: (event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  event,
  onClose,
  onUpdateStatus,
  onToggleTask,
  onAddTask,
  onOpenConflict,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTaskInput, setShowAddTaskInput] = useState(false);

  if (!isOpen || !event) return null;

  const completedTasks = event.tasks.filter((t) => t.completed).length;
  const totalTasks = event.tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(event.id, newTaskTitle.trim());
    setNewTaskTitle('');
    setShowAddTaskInput(false);
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container large" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="badge badge-category">{event.category}</span>
            <div>
              <h2 className="modal-title">{event.title}</h2>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Organized by {event.organizer}
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Status & Quick Action Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Event Status:</span>
              <select
                className="select-dropdown"
                value={event.status}
                onChange={(e) => onUpdateStatus(event.id, e.target.value as EventStatus)}
                style={{ fontWeight: 600 }}
              >
                <option value="Registered">Registered</option>
                <option value="In Progress">In Progress</option>
                <option value="Submitted">Submitted</option>
                <option value="Interested">Interested</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {event.conflict && event.conflict.status === 'Pending' && (
                <button
                  className="btn-secondary btn-sm"
                  style={{ borderColor: 'rgba(245, 158, 11, 0.5)', color: '#fbbf24' }}
                  onClick={() => onOpenConflict(event)}
                >
                  <AlertTriangle size={13} />
                  <span>Resolve Discrepancy</span>
                </button>
              )}

              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary btn-sm"
              >
                <span>Portal Link</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Overview text */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.3rem' }}>
              Overview & Objectives
            </h4>
            <p style={{ fontSize: '0.83rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              {event.summary}
            </p>
          </div>

          {/* Important Dates Grid */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.5rem' }}>
              Key Dates & Timings
            </h4>
            <div className="event-card-meta-grid">
              <div className="meta-item">
                <Clock size={14} style={{ color: '#f59e0b' }} />
                <span>Cutoff Deadline: <strong>{formatDate(event.registrationDeadline)}</strong></span>
              </div>
              <div className="meta-item">
                <Calendar size={14} style={{ color: '#6366f1' }} />
                <span>Event Kickoff: <strong>{formatDate(event.eventStartDate)}</strong></span>
              </div>
              <div className="meta-item">
                <Clock size={14} style={{ color: '#38bdf8' }} />
                <span>Reporting Time: <strong>{event.reportingTime}</strong></span>
              </div>
              <div className="meta-item">
                <MapPin size={14} style={{ color: '#10b981' }} />
                <span>Venue: <strong>{event.venue}</strong></span>
              </div>
            </div>
          </div>

          {/* Action & Preparation Checklist */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckSquare size={16} style={{ color: '#6366f1' }} />
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                  Preparation Checklist ({completedTasks}/{totalTasks} Completed — {progressPercent}%)
                </h4>
              </div>

              {!showAddTaskInput && (
                <button
                  className="btn-secondary btn-sm"
                  onClick={() => setShowAddTaskInput(true)}
                >
                  <Plus size={13} />
                  <span>Add Checklist Item</span>
                </button>
              )}
            </div>

            <div className="checklist-container">
              {event.tasks.map((task) => (
                <div key={task.id} className="check-item">
                  <button
                    className={`check-box-btn ${task.completed ? 'checked' : ''}`}
                    onClick={() => onToggleTask(event.id, task.id)}
                    aria-label={`Toggle task ${task.title}`}
                  >
                    {task.completed && <Check size={12} strokeWidth={3} />}
                  </button>

                  <div className="check-item-content">
                    <span className={`check-item-title ${task.completed ? 'completed' : ''}`}>
                      {task.title}
                    </span>
                    <div className="check-item-meta">
                      <span>Due {task.dueDate}</span>
                      <span>•</span>
                      <span style={{ color: task.priority === 'High' ? '#f43f5e' : '#94a3b8' }}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {showAddTaskInput && (
                <form onSubmit={handleCreateTask} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter new preparation task..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    autoFocus
                    style={{ flex: 1 }}
                  />
                  <button type="submit" className="btn-primary btn-sm">Add</button>
                  <button
                    type="button"
                    className="btn-secondary btn-sm"
                    onClick={() => setShowAddTaskInput(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Source Notice & Text Snippet */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.4rem' }}>
              Source Notice & Evidence Grounding
            </h4>
            <div className="source-evidence-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', color: '#94a3b8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={13} />
                  <span>Channel: {event.sourceNotice.channel} ({event.sourceNotice.senderOrSource})</span>
                </span>
                <span>Captured: {event.sourceNotice.receivedAt}</span>
              </div>
              <p style={{ color: '#f1f5f9', whiteSpace: 'pre-line' }}>
                "{event.sourceNotice.rawSnippet}"
              </p>
            </div>
          </div>

          {/* Change History Timeline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
              <History size={15} style={{ color: '#818cf8' }} />
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                Version & Audit History
              </h4>
            </div>

            <div className="history-timeline">
              {event.changeHistory.map((item) => (
                <div key={item.id} className="history-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ color: '#f8fafc' }}>{item.changeType}</strong>
                    <span className="history-time">{item.timestamp}</span>
                    <span className="badge badge-source">{item.actor}</span>
                  </div>
                  <div style={{ color: '#94a3b8', marginTop: '0.15rem' }}>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
