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
    <div className="greeting-header">
      <div className="greeting-text-area">
        <div className="greeting-date">{dateString}</div>
        <h1 className="greeting-title">
          Good morning, {userName} <span className="greeting-wave">👋</span>
        </h1>
        <p className="greeting-subtitle">
          Your campus, at a glance. Everything happening around you, in one place.
        </p>
      </div>

      <div className="greeting-action-area">
        <button
          className="btn-add-event"
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
