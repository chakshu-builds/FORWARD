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
    <div className="dashboard-panel next-moves-panel rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs transition-shadow hover:shadow-sm">
      {/* Header */}
      <div className="panel-header-row flex items-center justify-between mb-4">
        <div className="next-moves-title-group flex items-center gap-2.5">
          <CalendarCheck size={20} className="text-slate-800" strokeWidth={2} />
          <h3 className="panel-title text-base font-bold text-slate-900 tracking-tight">Your Next Moves</h3>
        </div>
        <span className="next-moves-progress-badge inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* Task List */}
      <div className="next-moves-list flex flex-col gap-2.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="next-moves-item group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <button
              type="button"
              className={`next-moves-checkbox shrink-0 mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${
                task.completed
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-slate-300 hover:border-blue-500'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleTask(task.id);
              }}
              aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
            >
              {task.completed && <Check size={13} strokeWidth={3} />}
            </button>

            <span
              className={`next-moves-task-text text-sm font-medium leading-snug cursor-pointer transition-all ${
                task.completed
                  ? 'text-slate-400 line-through'
                  : 'text-slate-800 group-hover:text-blue-600'
              }`}
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
