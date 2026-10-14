import type { ActiveView } from '../types';
import { PlusCircle, Calendar, AlertCircle, LayoutDashboard, Layers, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenCapture: () => void;
  conflictCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenCapture,
  conflictCount,
}) => {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="logo-group">
          <div className="brand-badge" onClick={() => setActiveView('dashboard')} style={{ cursor: 'pointer' }}>
            <div className="brand-icon-box">
              <Sparkles size={18} />
            </div>
            <span>FORWARD</span>
          </div>
          <span className="prototype-tag">HACKSHIFT 2026 · PS4 PROTOTYPE</span>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-tab-btn ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-tab-btn ${activeView === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveView('timeline')}
          >
            <Calendar size={15} />
            <span>Timeline</span>
          </button>

          <button
            className={`nav-tab-btn ${activeView === 'needs-review' ? 'active' : ''}`}
            onClick={() => setActiveView('needs-review')}
          >
            <AlertCircle size={15} />
            <span>Needs Review</span>
            {conflictCount > 0 && (
              <span className="nav-badge-count warn">{conflictCount}</span>
            )}
          </button>

          <button
            className={`nav-tab-btn ${activeView === 'all-events' ? 'active' : ''}`}
            onClick={() => setActiveView('all-events')}
          >
            <Layers size={15} />
            <span>All Opportunities</span>
          </button>
        </nav>

        <div className="header-actions">
          <button className="btn-primary" onClick={onOpenCapture} id="add-event-btn">
            <PlusCircle size={16} />
            <span>Add Event</span>
          </button>

          <div className="user-profile-badge">
            <div className="user-avatar">AS</div>
            <div className="user-meta">
              <span className="user-name">Aarav Sharma</span>
              <span className="user-role">3rd Year CSE · Campus Hub</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
