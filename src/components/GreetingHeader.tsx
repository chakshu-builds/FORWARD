import React from 'react';
import { Plus } from 'lucide-react';

interface GreetingHeaderProps {
  onOpenAddEvent: () => void;
  dateString?: string;
  userName?: string;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({
  onOpenAddEvent,
  dateString = 'Tue, 14 Oct 2026',
  userName = 'Chakshu'
}) => {
  return (
    <div className="greeting-header flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="greeting-text-area">
        <div className="greeting-date inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">{dateString}</div>
        <h1 className="greeting-title text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Good morning, {userName} <span className="greeting-wave inline-block transform hover:rotate-12 transition-transform duration-200">👋</span>
        </h1>
        <p className="greeting-subtitle text-slate-500 text-sm md:text-base max-w-xl">
          Your campus, at a glance. Everything happening around you, in one place.
        </p>
      </div>

      <div className="greeting-action-area flex items-center gap-3">
        <button
          className="btn-add-event inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md active:scale-95 transition-all duration-150 cursor-pointer"
          onClick={onOpenAddEvent}
          id="btn-add-event-primary"
        >
          <Plus size={18} strokeWidth={2.4} />
          <span>Add Event</span>
        </button>
      </div>
    </div>
  );
};
