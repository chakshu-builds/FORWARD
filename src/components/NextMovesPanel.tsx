import React from 'react';
import type { PrepTask } from '../types';
import { CalendarCheck, Check } from 'lucide-react';

interface NextMovesPanelProps {
  tasks: PrepTask[];
  onToggleTask: (taskId: string) => void;
  onOpenTaskEvent?: (eventId?: string) => void;
}

export const NextMovesPanel: React.FC<NextMovesPanelProps> = ({
  tasks,
  onToggleTask,
  onOpenTaskEvent
}) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="dashboard-panel next-moves-panel">
      {/* Header */}
      <div className="panel-header-row">
        <div className="next-moves-title-group">
          <CalendarCheck size={20} className="text-navy" strokeWidth={2} />
          <h3 className="panel-title">Your Next Moves</h3>
        </div>
        <span className="next-moves-progress-badge">
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* Task List */}
      <div className="next-moves-list">
        {tasks.map((task) => (
          <div key={task.id} className="next-moves-item">
            <button
              type="button"
              className={`next-moves-checkbox ${task.completed ? 'checked' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleTask(task.id);
              }}
              aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
            >
              {task.completed && <Check size={13} strokeWidth={3} />}
            </button>

            <span
              className={`next-moves-task-text ${task.completed ? 'completed' : ''}`}
              onClick={() => task.eventId && onOpenTaskEvent?.(task.eventId)}
              title={task.eventId ? 'Click to view event details' : undefined}
            >
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
