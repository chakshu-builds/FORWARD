import React, { useRef, useEffect } from 'react';
import { Search, Bell, Check, AlertCircle, RefreshCw, LogOut, RotateCcw, User } from 'lucide-react';
import { ChakshuAvatar } from './EventThumbnail';

interface TopHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  onResetDemoData: () => void;
  onSelectNotificationItem?: (eventId: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isNotificationsOpen,
  setIsNotificationsOpen,
  isProfileOpen,
  setIsProfileOpen,
  onResetDemoData,
  onSelectNotificationItem
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Ctrl+K keyboard shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsNotificationsOpen, setIsProfileOpen]);

  return (
    <header className="top-header" ref={headerRef}>
      {/* Search Input */}
      <div className="search-bar-container">
        <Search size={18} className="search-bar-icon" />
        <input
          ref={searchInputRef}
          type="text"
          className="search-bar-input"
          placeholder="Search events, organisers, venues or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="search-shortcut-pill" onClick={() => searchInputRef.current?.focus()}>
          <span>Ctrl</span>
          <span>K</span>
        </div>
      </div>

      {/* Header Right Controls */}
      <div className="header-right-controls">
        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="icon-button notification-bell-btn"
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.8} />
            <span className="unread-dot" />
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="header-dropdown notifications-dropdown">
              <div className="dropdown-header">
                <span className="dropdown-title">Campus Notifications</span>
                <span className="dropdown-subtitle">3 Unread alerts</span>
              </div>
              <div className="dropdown-items-list">
                <div
                  className="dropdown-item alert"
                  onClick={() => {
                    onSelectNotificationItem?.('evt-developer-summit');
                    setIsNotificationsOpen(false);
                  }}
                >
                  <AlertCircle size={16} className="text-red" />
                  <div className="dropdown-item-texts">
                    <strong>Conflicting date detected</strong>
                    <span>Developer Summit schedule updated to 28 Oct</span>
                    <span className="dropdown-time">2h ago</span>
                  </div>
                </div>

                <div
                  className="dropdown-item warning"
                  onClick={() => {
                    onSelectNotificationItem?.('evt-tech-conclave-2026');
                    setIsNotificationsOpen(false);
                  }}
                >
                  <AlertCircle size={16} className="text-orange" />
                  <div className="dropdown-item-texts">
                    <strong>Missing venue information</strong>
                    <span>Tech Conclave 2026 circular lacks venue</span>
                    <span className="dropdown-time">5h ago</span>
                  </div>
                </div>

                <div
                  className="dropdown-item info"
                  onClick={() => {
                    onSelectNotificationItem?.('evt-google-winter-internship');
                    setIsNotificationsOpen(false);
                  }}
                >
                  <RefreshCw size={16} className="text-blue" />
                  <div className="dropdown-item-texts">
                    <strong>New update available</strong>
                    <span>Google Winter Internship deadline confirmed</span>
                    <span className="dropdown-time">1d ago</span>
                  </div>
                </div>
              </div>
              <div className="dropdown-footer">
                <button
                  className="dropdown-footer-action"
                  onClick={() => setIsNotificationsOpen(false)}
                >
                  <Check size={14} />
                  <span>Mark all as read</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div style={{ position: 'relative' }}>
          <button
            className="user-avatar-button"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            aria-label="User profile menu"
          >
            <ChakshuAvatar size={34} />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="header-dropdown profile-dropdown">
              <div className="profile-dropdown-user">
                <ChakshuAvatar size={42} />
                <div>
                  <strong className="profile-name">Chakshu Arora</strong>
                  <div className="profile-email">chakshu.arora@campus.edu</div>
                  <span className="profile-badge">Student · CSE 3rd Year</span>
                </div>
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-items-list">
                <button className="profile-menu-item" onClick={() => setIsProfileOpen(false)}>
                  <User size={16} />
                  <span>Account & Preferences</span>
                </button>
                <button
                  className="profile-menu-item"
                  onClick={() => {
                    onResetDemoData();
                    setIsProfileOpen(false);
                  }}
                >
                  <RotateCcw size={16} />
                  <span>Reset Prototype State</span>
                </button>
                <div className="dropdown-divider" />
                <button className="profile-menu-item text-red" onClick={() => setIsProfileOpen(false)}>
                  <LogOut size={16} />
                  <span>Sign out (Demo)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
