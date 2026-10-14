import React, { useRef, useEffect } from 'react';
import { Search, Bell, Check, AlertCircle, RefreshCw, LogOut, RotateCcw, User } from 'lucide-react';
import { ChakshuAvatar } from './EventThumbnail';
import type { UserProfile } from '../types';

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
  userProfile?: UserProfile;
  onOpenSettings?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isNotificationsOpen,
  setIsNotificationsOpen,
  isProfileOpen,
  setIsProfileOpen,
  onResetDemoData,
  onSelectNotificationItem,
  userProfile,
  onOpenSettings
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
    <header className="top-header flex items-center justify-between gap-4 px-6 py-3.5 bg-white border-b border-slate-200/80 sticky top-0 z-30" ref={headerRef}>
      {/* Search Input */}
      <div className="search-bar-container relative flex items-center flex-1 max-w-xl transition-all duration-150 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl">
        <Search size={18} className="search-bar-icon text-slate-400 absolute left-3.5 pointer-events-none" />
        <input
          ref={searchInputRef}
          type="text"
          className="search-bar-input w-full pl-10 pr-16 py-2 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 transition-colors outline-none"
          placeholder="Search events, organisers, venues or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="search-shortcut-pill absolute right-3 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-400 bg-white border border-slate-200 select-none cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => searchInputRef.current?.focus()}>
          <span>Ctrl</span>
          <span>K</span>
        </div>
      </div>

      {/* Header Right Controls */}
      <div className="header-right-controls flex items-center gap-3">
        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="icon-button notification-bell-btn relative p-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-all text-slate-600 hover:text-slate-900 cursor-pointer"
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.8} />
            <span className="unread-dot absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
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
                    onSelectNotificationItem?.('evt-hack-on-hills-8');
                    setIsNotificationsOpen(false);
                  }}
                >
                  <AlertCircle size={16} className="text-red" />
                  <div className="dropdown-item-texts">
                    <strong>Conflicting date detected</strong>
                    <span>Hack On Hills 8.0 schedule updated on Devfolio</span>
                    <span className="dropdown-time">2h ago</span>
                  </div>
                </div>

                <div
                  className="dropdown-item warning"
                  onClick={() => {
                    onSelectNotificationItem?.('evt-search-fundamentals-gurugram-2026');
                    setIsNotificationsOpen(false);
                  }}
                >
                  <AlertCircle size={16} className="text-orange" />
                  <div className="dropdown-item-texts">
                    <strong>Missing venue information</strong>
                    <span>Search Fundamentals Gurugram lacks venue hall</span>
                    <span className="dropdown-time">5h ago</span>
                  </div>
                </div>

                <div
                  className="dropdown-item info"
                  onClick={() => {
                    onSelectNotificationItem?.('evt-atomic-hack-india-2026');
                    setIsNotificationsOpen(false);
                  }}
                >
                  <RefreshCw size={16} className="text-blue" />
                  <div className="dropdown-item-texts">
                    <strong>Registration closing soon</strong>
                    <span>Atomic Hack India qualification registration closes in 6d</span>
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
            <ChakshuAvatar size={34} src={userProfile?.avatarUrl} />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="header-dropdown profile-dropdown">
              <div className="profile-dropdown-user">
                <ChakshuAvatar size={42} src={userProfile?.avatarUrl} />
                <div>
                  <strong className="profile-name">{userProfile?.fullName || 'Chakshu Arora'}</strong>
                  <div className="profile-email">{userProfile?.email || 'chakshu.arora@college.edu.in'}</div>
                  <span className="profile-badge">{userProfile?.role || 'Student'} · {userProfile?.institution || 'Delhi University'}</span>
                </div>
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-items-list">
                <button
                  className="profile-menu-item"
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (onOpenSettings) onOpenSettings();
                  }}
                >
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
