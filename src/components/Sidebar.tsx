import React from 'react';
import type { ActiveView } from '../types';
import {
  House,
  CalendarDays,
  CirclePlus,
  FileWarning,
  Folder,
  Settings,
  MoreVertical,
  ChevronsRight
} from 'lucide-react';
import { ChakshuAvatar } from './EventThumbnail';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenCapture: () => void;
  conflictCount: number;
  onProfileMenuClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onOpenCapture,
  conflictCount,
  onProfileMenuClick
}) => {
  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand-wrap" onClick={() => setActiveView('overview')}>
        <div className="sidebar-brand-icon">
          <ChevronsRight size={24} strokeWidth={2.8} />
        </div>
        <span className="sidebar-brand-text">FORWARD</span>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        <button
          className={`sidebar-nav-item ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          <House size={18} strokeWidth={activeView === 'overview' ? 2.2 : 1.8} />
          <span>Overview</span>
        </button>

        <button
          className={`sidebar-nav-item ${activeView === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveView('timeline')}
        >
          <CalendarDays size={18} strokeWidth={activeView === 'timeline' ? 2.2 : 1.8} />
          <span>My Timeline</span>
        </button>

        <button
          className="sidebar-nav-item"
          onClick={onOpenCapture}
        >
          <CirclePlus size={18} strokeWidth={1.8} />
          <span>Add Event</span>
        </button>

        <button
          className={`sidebar-nav-item ${activeView === 'needs-review' ? 'active' : ''}`}
          onClick={() => setActiveView('needs-review')}
        >
          <div className="sidebar-nav-item-inner">
            <FileWarning size={18} strokeWidth={activeView === 'needs-review' ? 2.2 : 1.8} />
            <span>Needs Review</span>
          </div>
          {conflictCount > 0 && (
            <span className="sidebar-badge-count">{conflictCount}</span>
          )}
        </button>

        <button
          className={`sidebar-nav-item ${activeView === 'sources' ? 'active' : ''}`}
          onClick={() => setActiveView('sources')}
        >
          <Folder size={18} strokeWidth={activeView === 'sources' ? 2.2 : 1.8} />
          <span>Sources</span>
        </button>

        <button
          className={`sidebar-nav-item ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveView('settings')}
        >
          <Settings size={18} strokeWidth={activeView === 'settings' ? 2.2 : 1.8} />
          <span>Settings</span>
        </button>
      </nav>

      {/* User Profile Footer */}
      <div className="sidebar-profile-footer" onClick={onProfileMenuClick}>
        <div className="sidebar-profile-info">
          <ChakshuAvatar size={36} />
          <div className="sidebar-profile-texts">
            <div className="sidebar-profile-name">Chakshu Arora</div>
            <div className="sidebar-profile-role">Student</div>
          </div>
        </div>
        <button className="sidebar-profile-more-btn" aria-label="Profile options">
          <MoreVertical size={16} />
        </button>
      </div>
    </aside>
  );
};
