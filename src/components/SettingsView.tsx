import React, { useState, useRef } from 'react';
import type { UserProfile, NotificationSettings, UserPreferences, TimelineDefaultView, TimelineSortOption } from '../types';
import { ChakshuAvatar } from './EventThumbnail';
import {
  Camera,
  Calendar,
  Megaphone,
  Mail,
  List,
  ArrowUpDown,
  Sun,
  Moon,
  Monitor,
  CheckCircle2,
  GraduationCap,
  Landmark,
  Download,
  Trash2,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  X,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface SettingsViewProps {
  userProfile: UserProfile;
  notifications: NotificationSettings;
  preferences: UserPreferences;
  onUpdateProfile: (updated: UserProfile) => void;
  onUpdateNotifications: (updated: NotificationSettings) => void;
  onUpdatePreferences: (updated: UserPreferences) => void;
  onResetDemoData: () => void;
  onDownloadData: () => void;
  onDeleteAccount: () => void;
  addToast: (type: 'success' | 'warning' | 'info', title: string, description?: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userProfile,
  notifications,
  preferences,
  onUpdateProfile,
  onUpdateNotifications,
  onUpdatePreferences,
  onResetDemoData,
  onDownloadData,
  onDeleteAccount,
  addToast
}) => {
  // Local form state for Profile Information
  const [fullName, setFullName] = useState(userProfile.fullName);
  const [role, setRole] = useState(userProfile.role);
  const [institution, setInstitution] = useState(userProfile.institution);
  const [avatarPreview, setAvatarPreview] = useState(userProfile.avatarUrl || '/chakshu_arora.png');
  const [nameError, setNameError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Handle avatar photo selection
  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        addToast('warning', 'Invalid File Type', 'Please upload a valid image file (PNG, JPG, WEBP).');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const resultUrl = reader.result as string;
        setAvatarPreview(resultUrl);
        const updated: UserProfile = {
          ...userProfile,
          avatarUrl: resultUrl
        };
        onUpdateProfile(updated);
        addToast('success', 'Photo Updated', 'Profile photo uploaded successfully.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Save Changes in Profile Form
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setNameError('Full name cannot be empty.');
      addToast('warning', 'Validation Error', 'Please enter your full name.');
      return;
    }
    setNameError('');

    const updated: UserProfile = {
      ...userProfile,
      fullName: fullName.trim(),
      role,
      institution,
      avatarUrl: avatarPreview
    };

    onUpdateProfile(updated);
    addToast('success', 'Profile Updated', 'Your profile information has been saved.');
  };

  // Handle Notification toggles
  const handleToggleNotification = (key: keyof NotificationSettings) => {
    const nextState = !notifications[key];
    const updated: NotificationSettings = {
      ...notifications,
      [key]: nextState
    };
    onUpdateNotifications(updated);

    const labels: Record<keyof NotificationSettings, string> = {
      eventReminders: 'Event reminders',
      newEventAlerts: 'New event alerts',
      importantUpdates: 'Important updates'
    };
    addToast('info', `${labels[key]} ${nextState ? 'Enabled' : 'Disabled'}`);
  };

  // Handle Preferences change
  const handleDefaultViewChange = (val: TimelineDefaultView) => {
    const updated: UserPreferences = {
      ...preferences,
      defaultView: val
    };
    onUpdatePreferences(updated);
    addToast('info', 'Default View Updated', `My Timeline default view set to ${val}.`);
  };

  const handleSortChange = (val: TimelineSortOption) => {
    const updated: UserPreferences = {
      ...preferences,
      sortEventsBy: val
    };
    onUpdatePreferences(updated);
    addToast('info', 'Sort Preference Updated', `Events will be sorted by ${val}.`);
  };

  // Handle Theme change
  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    const updated: UserPreferences = {
      ...preferences,
      theme
    };
    onUpdatePreferences(updated);
    addToast('info', 'Theme Preference Saved', `Switched appearance to ${theme.toUpperCase()}.`);
  };

  // Confirm delete account
  const handleConfirmDelete = () => {
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') {
      addToast('warning', 'Confirmation Required', 'Please type DELETE in capital letters to confirm.');
      return;
    }
    setIsDeleteModalOpen(false);
    onDeleteAccount();
  };

  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* 1. Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-navy, #0f172a)', letterSpacing: '-0.02em', margin: 0 }}>
          Settings
        </h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted, #64748b)', marginTop: '4px', margin: 0 }}>
          Manage your account and preferences.
        </p>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 320px',
          gap: '20px',
          alignItems: 'start'
        }}
        className="settings-layout-grid"
      >
        {/* Left Column: 4 Settings Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Profile Information */}
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border-default, #e2e8f0)',
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            {/* Header row with Save Changes button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-navy, #0f172a)', margin: 0 }}>
                  Profile Information
                </h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', margin: '4px 0 0 0' }}>
                  Update your basic details and profile photo.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveProfile}
                style={{
                  background: 'var(--blue-primary, #2563eb)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 18px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(37,99,235,0.2)',
                  transition: 'background 0.15s ease'
                }}
              >
                Save Changes
              </button>
            </div>

            {/* Profile Form Body */}
            <form onSubmit={handleSaveProfile}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                {/* Avatar with Camera badge */}
                <div style={{ position: 'relative', flexShrink: 0, marginTop: '4px' }}>
                  <div
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid #ffffff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    <ChakshuAvatar size={76} src={avatarPreview} />
                  </div>

                  {/* Camera overlay button */}
                  <button
                    type="button"
                    onClick={handlePhotoClick}
                    title="Change profile photo"
                    aria-label="Change profile photo"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-4px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#475569',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Camera size={15} />
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>

                {/* Form Fields: 2x2 Grid */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (nameError) setNameError('');
                      }}
                      placeholder="Your full name"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        border: nameError ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                        borderRadius: '8px',
                        fontSize: '0.86rem',
                        color: '#0f172a',
                        background: '#ffffff',
                        outline: 'none'
                      }}
                    />
                    {nameError && (
                      <span style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: '4px', display: 'block' }}>
                        {nameError}
                      </span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userProfile.email}
                      disabled
                      title="Managed by college single sign-on"
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.86rem',
                        color: '#64748b',
                        background: '#f8fafc',
                        cursor: 'not-allowed',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Role
                    </label>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 32px 9px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '0.86rem',
                          color: '#0f172a',
                          background: '#ffffff',
                          appearance: 'none',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="Student">Student</option>
                        <option value="Club Lead / Organizer">Club Lead / Organizer</option>
                        <option value="Faculty Advisor">Faculty Advisor</option>
                        <option value="Alumni Mentor">Alumni Mentor</option>
                      </select>
                      <ChevronDown
                        size={16}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#64748b',
                          pointerEvents: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* College / Institution */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      College / Institution
                    </label>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 32px 9px 12px',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '0.86rem',
                          color: '#0f172a',
                          background: '#ffffff',
                          appearance: 'none',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="Delhi University">Delhi University</option>
                        <option value="VIPS (Vivekananda Institute)">VIPS (Vivekananda Institute)</option>
                        <option value="IIT Delhi">IIT Delhi</option>
                        <option value="DTU (Delhi Technological University)">DTU (Delhi Technological University)</option>
                        <option value="NSUT Delhi">NSUT Delhi</option>
                        <option value="IIIT Delhi">IIIT Delhi</option>
                      </select>
                      <ChevronDown
                        size={16}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#64748b',
                          pointerEvents: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Card 2: Notifications */}
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border-default, #e2e8f0)',
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-navy, #0f172a)', margin: 0 }}>
                Notifications
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', margin: '4px 0 0 0' }}>
                Choose what updates you want to receive.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Row 1: Event reminders */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: '#eff6ff',
                      border: '1px solid #dbeafe',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Calendar size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-navy, #0f172a)' }}>
                      Event reminders
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)' }}>
                      Get notified about registration deadlines and upcoming events.
                    </div>
                  </div>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.eventReminders}
                  onClick={() => handleToggleNotification('eventReminders')}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    background: notifications.eventReminders ? '#2563eb' : '#cbd5e1',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: notifications.eventReminders ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      transition: 'left 0.2s ease'
                    }}
                  />
                </button>
              </div>

              {/* Row 2: New event alerts */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: '#eff6ff',
                      border: '1px solid #dbeafe',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Megaphone size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-navy, #0f172a)' }}>
                      New event alerts
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)' }}>
                      Get notified when new events matching your interests are found.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.newEventAlerts}
                  onClick={() => handleToggleNotification('newEventAlerts')}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    background: notifications.newEventAlerts ? '#2563eb' : '#cbd5e1',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: notifications.newEventAlerts ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      transition: 'left 0.2s ease'
                    }}
                  />
                </button>
              </div>

              {/* Row 3: Important updates */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: '#eff6ff',
                      border: '1px solid #dbeafe',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Mail size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-navy, #0f172a)' }}>
                      Important updates
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted, #64748b)' }}>
                      Receive important announcements and product updates.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.importantUpdates}
                  onClick={() => handleToggleNotification('importantUpdates')}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    background: notifications.importantUpdates ? '#2563eb' : '#e2e8f0',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: notifications.importantUpdates ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      transition: 'left 0.2s ease'
                    }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Preferences */}
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border-default, #e2e8f0)',
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-navy, #0f172a)', margin: 0 }}>
                Preferences
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', margin: '4px 0 0 0' }}>
                Customise your timeline experience.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Default View */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Default View
                </label>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b',
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <List size={16} />
                  </div>
                  <select
                    value={preferences.defaultView}
                    onChange={(e) => handleDefaultViewChange(e.target.value as TimelineDefaultView)}
                    style={{
                      width: '100%',
                      padding: '9px 32px 9px 34px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      color: '#0f172a',
                      background: '#ffffff',
                      appearance: 'none',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="List View">List View</option>
                    <option value="Calendar View">Calendar View</option>
                  </select>
                  <ChevronDown
                    size={16}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Sort Events By */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Sort Events By
                </label>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b',
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <ArrowUpDown size={15} />
                  </div>
                  <select
                    value={preferences.sortEventsBy}
                    onChange={(e) => handleSortChange(e.target.value as TimelineSortOption)}
                    style={{
                      width: '100%',
                      padding: '9px 32px 9px 34px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      color: '#0f172a',
                      background: '#ffffff',
                      appearance: 'none',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="Earliest First">Earliest First</option>
                    <option value="Latest First">Latest First</option>
                    <option value="Registration Deadline">Registration Deadline</option>
                    <option value="Recently Added">Recently Added</option>
                  </select>
                  <ChevronDown
                    size={16}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Appearance */}
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border-default, #e2e8f0)',
              borderRadius: '14px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-navy, #0f172a)', margin: 0 }}>
                Appearance
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', margin: '4px 0 0 0' }}>
                Choose your preferred theme.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {/* Option 1: Light */}
              <button
                type="button"
                onClick={() => handleThemeChange('light')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: preferences.theme === 'light' ? '#ffffff' : '#ffffff',
                  border: preferences.theme === 'light' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                  boxShadow: preferences.theme === 'light' ? '0 0 0 1px #2563eb' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sun size={18} style={{ color: preferences.theme === 'light' ? '#2563eb' : '#64748b' }} />
                  <span style={{ fontSize: '0.86rem', fontWeight: preferences.theme === 'light' ? 700 : 500, color: preferences.theme === 'light' ? '#0f172a' : '#334155' }}>
                    Light
                  </span>
                </div>
                {preferences.theme === 'light' && (
                  <CheckCircle2 size={18} style={{ color: '#2563eb' }} />
                )}
              </button>

              {/* Option 2: Dark */}
              <button
                type="button"
                onClick={() => handleThemeChange('dark')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: '#ffffff',
                  border: preferences.theme === 'dark' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                  boxShadow: preferences.theme === 'dark' ? '0 0 0 1px #2563eb' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Moon size={18} style={{ color: preferences.theme === 'dark' ? '#2563eb' : '#64748b' }} />
                  <span style={{ fontSize: '0.86rem', fontWeight: preferences.theme === 'dark' ? 700 : 500, color: preferences.theme === 'dark' ? '#0f172a' : '#334155' }}>
                    Dark
                  </span>
                </div>
                {preferences.theme === 'dark' && (
                  <CheckCircle2 size={18} style={{ color: '#2563eb' }} />
                )}
              </button>

              {/* Option 3: System */}
              <button
                type="button"
                onClick={() => handleThemeChange('system')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: '#ffffff',
                  border: preferences.theme === 'system' ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                  boxShadow: preferences.theme === 'system' ? '0 0 0 1px #2563eb' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Monitor size={18} style={{ color: preferences.theme === 'system' ? '#2563eb' : '#64748b' }} />
                  <span style={{ fontSize: '0.86rem', fontWeight: preferences.theme === 'system' ? 700 : 500, color: preferences.theme === 'system' ? '#0f172a' : '#334155' }}>
                    System
                  </span>
                </div>
                {preferences.theme === 'system' && (
                  <CheckCircle2 size={18} style={{ color: '#2563eb' }} />
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Account Overview & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Account Overview */}
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border-default, #e2e8f0)',
              borderRadius: '14px',
              padding: '22px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <h2 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-navy, #0f172a)', margin: '0 0 16px 0' }}>
              Account Overview
            </h2>

            {/* Profile header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <ChakshuAvatar size={50} src={avatarPreview} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--text-navy, #0f172a)' }}>
                  {userProfile.fullName}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted, #64748b)', marginTop: '2px', wordBreak: 'break-all' }}>
                  {userProfile.email}
                </div>
              </div>
            </div>

            {/* Profile details list with icons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#475569' }}>
                <GraduationCap size={16} style={{ color: '#2563eb', flexShrink: 0 }} />
                <span>{userProfile.role}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#475569' }}>
                <Landmark size={16} style={{ color: '#64748b', flexShrink: 0 }} />
                <span>{userProfile.institution}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#475569' }}>
                <Calendar size={16} style={{ color: '#64748b', flexShrink: 0 }} />
                <span>{userProfile.academicYear}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Actions */}
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border-default, #e2e8f0)',
              borderRadius: '14px',
              padding: '22px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <h2 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-navy, #0f172a)', margin: '0 0 16px 0' }}>
              Quick Actions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Action 1: Download My Data */}
              <button
                type="button"
                onClick={onDownloadData}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#93c5fd')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: '#eff6ff',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Download size={16} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#2563eb' }}>
                      Download My Data
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Get a copy of your events and settings.
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: '#94a3b8' }} />
              </button>

              {/* Action 2: Delete Account */}
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#fca5a5')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: '#fef2f2',
                      color: '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Trash2 size={16} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#ef4444' }}>
                      Delete Account
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Permanently delete your account.
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: '#94a3b8' }} />
              </button>

              {/* Action 3: Privacy Policy */}
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#93c5fd')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: '#eff6ff',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <ShieldCheck size={16} strokeWidth={2.4} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#2563eb' }}>
                      Privacy Policy
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Read our privacy policy.
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: '#94a3b8' }} />
              </button>

              {/* Demo Testing Reset Button */}
              <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <button
                  type="button"
                  onClick={onResetDemoData}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.color = '#0f172a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Restore Reference Mock Data</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsDeleteModalOpen(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '440px', padding: '24px', background: '#ffffff', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#fef2f2',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Delete Account?
                </h3>
                <p style={{ fontSize: '0.76rem', color: '#64748b', margin: 0 }}>
                  Permanent and irreversible action
                </p>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.45, marginBottom: '16px' }}>
              Deleting your account will erase your personalized event timeline, notification settings, circular sync connectors, and task lists.
            </p>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Type <strong style={{ color: '#ef4444' }}>DELETE</strong> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmText('');
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmText.trim().toUpperCase() !== 'DELETE'}
                onClick={handleConfirmDelete}
                style={{
                  background: deleteConfirmText.trim().toUpperCase() === 'DELETE' ? '#ef4444' : '#fca5a5',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: deleteConfirmText.trim().toUpperCase() === 'DELETE' ? 'pointer' : 'not-allowed'
                }}
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {isPrivacyModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsPrivacyModalOpen(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '560px', padding: '24px', background: '#ffffff', borderRadius: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    FORWARD Privacy Policy
                  </h3>
                  <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>
                    Zero tracking · Campus circular privacy · Student data sovereignty
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.5, maxHeight: '360px', overflowY: 'auto', paddingRight: '8px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: '12px 0 4px 0' }}>
                1. Local Storage & Zero Third-Party Brokers
              </h4>
              <p style={{ margin: '0 0 10px 0' }}>
                FORWARD does not sell, broker, or monetize student schedules, hackathon submissions, or academic circulars. All event synchronization operates directly between official university endpoints and your private browser container.
              </p>

              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: '12px 0 4px 0' }}>
                2. Circular Source Provenance & Audit Logs
              </h4>
              <p style={{ margin: '0 0 10px 0' }}>
                When you forward flyers or circulars via WhatsApp, Email, or Discord, FORWARD preserves the original source notice for audit purposes. You retain full control to edit, resolve conflicts, or delete these records at any time.
              </p>

              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: '12px 0 4px 0' }}>
                3. Complete Data Portability
              </h4>
              <p style={{ margin: '0 0 10px 0' }}>
                You can export all registered events, preparation tasks, attention reconciliation logs, and preferences at any time using the <em>Download My Data</em> action in JSON format.
              </p>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={() => setIsPrivacyModalOpen(false)}
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
