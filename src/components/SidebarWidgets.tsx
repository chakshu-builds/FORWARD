import type { EventItem, PrepTask } from '../types';
import { AlertCircle, CheckSquare, Sparkles, ArrowRight, Check } from 'lucide-react';

interface SidebarWidgetsProps {
  conflictedEvents: EventItem[];
  allTasks: { task: PrepTask; eventTitle: string; eventId: string }[];
  onToggleTask: (eventId: string, taskId: string) => void;
  onOpenConflict: (event: EventItem) => void;
}

export const SidebarWidgets: React.FC<SidebarWidgetsProps> = ({
  conflictedEvents,
  allTasks,
  onToggleTask,
  onOpenConflict,
}) => {
  return (
    <aside className="sidebar-column">
      {/* Needs Review Section */}
      <section className="sidebar-card">
        <div className="sidebar-card-header">
          <h3 className="sidebar-card-title">
            <AlertCircle size={16} style={{ color: '#f59e0b' }} />
            <span>Needs Review</span>
          </h3>
          <span className="prototype-tag" style={{ fontSize: '0.65rem' }}>
            {conflictedEvents.length} Discrepancy
          </span>
        </div>

        {conflictedEvents.length === 0 ? (
          <div style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>
            <Sparkles size={20} style={{ color: '#10b981', margin: '0 auto 0.5rem auto' }} />
            <p>All notices reconciled! No pending conflicts across your campus feeds.</p>
          </div>
        ) : (
          conflictedEvents.map((evt) => {
            const conf = evt.conflict;
            if (!conf) return null;
            return (
              <div key={conf.id} className="review-item-card">
                <div className="review-item-header">
                  <strong style={{ color: '#f8fafc' }}>{evt.title}</strong>
                  <span className="badge badge-conflict">{conf.fieldLabel}</span>
                </div>

                <div className="review-diff-preview">
                  <div className="diff-line old">
                    <span>- Current: {conf.currentValue}</span>
                  </div>
                  <div className="diff-line new">
                    <span>+ New Notice: {conf.newValue}</span>
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  Source: {conf.newSource}
                </div>

                <button
                  className="btn-secondary btn-sm"
                  style={{ width: '100%', borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}
                  onClick={() => onOpenConflict(evt)}
                >
                  <span>Review Discrepancy</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            );
          })
        )}
      </section>

      {/* Your Next Moves Checklist */}
      <section className="sidebar-card">
        <div className="sidebar-card-header">
          <h3 className="sidebar-card-title">
            <CheckSquare size={16} style={{ color: '#6366f1' }} />
            <span>Your Next Moves</span>
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            {allTasks.filter((t) => t.task.completed).length}/{allTasks.length} Done
          </span>
        </div>

        <div className="checklist-container">
          {allTasks.map(({ task, eventTitle, eventId }) => (
            <div key={task.id} className="check-item">
              <button
                className={`check-box-btn ${task.completed ? 'checked' : ''}`}
                onClick={() => onToggleTask(eventId, task.id)}
                aria-label={`Toggle task ${task.title}`}
              >
                {task.completed && <Check size={12} strokeWidth={3} />}
              </button>

              <div className="check-item-content">
                <span className={`check-item-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </span>
                <div className="check-item-meta">
                  <span style={{ color: '#818cf8' }}>{eventTitle.split(':')[0]}</span>
                  <span>•</span>
                  <span>Due {task.dueDate}</span>
                  {task.priority === 'High' && (
                    <span style={{ color: '#f43f5e', fontWeight: 600 }}>High Priority</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};
