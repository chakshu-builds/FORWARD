import { useState, useMemo, useEffect } from 'react';
import type {
  EventItem,
  EventStatus,
  ExtractionDraft,
  ActiveView,
  AttentionItem,
  RecentlyAddedItem,
  PrepTask,
  SourceItem,
  SourceActivityItem,
  UserProfile,
  NotificationSettings,
  UserPreferences
} from './types';
import {
  INITIAL_EVENTS,
  INITIAL_ATTENTION_ITEMS,
  INITIAL_RECENTLY_ADDED,
  INITIAL_NEXT_MOVES,
  SAMPLE_EXTRACTION_RESULT,
  INITIAL_SOURCES,
  INITIAL_SOURCE_ACTIVITIES,
  INITIAL_USER_PROFILE,
  INITIAL_NOTIFICATIONS,
  INITIAL_PREFERENCES
} from './data/realEventsMock';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { GreetingHeader } from './components/GreetingHeader';
import { MetricsRow } from './components/MetricsRow';
import { UpcomingEventsSection } from './components/UpcomingEventsSection';
import { NeedsAttentionCard } from './components/NeedsAttentionCard';
import { RecentlyAddedCard } from './components/RecentlyAddedCard';
import { CalendarPanel } from './components/CalendarPanel';
import { NextMovesPanel } from './components/NextMovesPanel';
import { MyTimelineView } from './components/MyTimelineView';
import { AddEventView } from './components/AddEventView';
import { NeedsReviewView } from './components/NeedsReviewView';
import { SourcesView } from './components/SourcesView';
import { SettingsView } from './components/SettingsView';

import { CaptureModal } from './components/CaptureModal';
import { ExtractionReviewModal } from './components/ExtractionReviewModal';
import { EventDetailModal } from './components/EventDetailModal';
import { ConflictModal } from './components/ConflictModal';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';

export function App() {
  // Clean up legacy mock data storage keys once to guarantee real dataset is used
  useEffect(() => {
    ['forward_events_v2', 'forward_events_v1', 'forward_attention_v2', 'forward_recent_v2', 'forward_moves_v2', 'forward_sources_v1'].forEach((k) => {
      localStorage.removeItem(k);
    });
  }, []);

  // Main Data States with localStorage persistence fallback
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('forward_events_v3_real');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [attentionItems, setAttentionItems] = useState<AttentionItem[]>(() => {
    const saved = localStorage.getItem('forward_attention_v3_real');
    return saved ? JSON.parse(saved) : INITIAL_ATTENTION_ITEMS;
  });

  const [recentlyAdded, setRecentlyAdded] = useState<RecentlyAddedItem[]>(() => {
    const saved = localStorage.getItem('forward_recent_v3_real');
    return saved ? JSON.parse(saved) : INITIAL_RECENTLY_ADDED;
  });

  const [nextMoves, setNextMoves] = useState<PrepTask[]>(() => {
    const saved = localStorage.getItem('forward_moves_v3_real');
    return saved ? JSON.parse(saved) : INITIAL_NEXT_MOVES;
  });

  const [sources, setSources] = useState<SourceItem[]>(() => {
    const saved = localStorage.getItem('forward_sources_v3_real');
    return saved ? JSON.parse(saved) : INITIAL_SOURCES;
  });

  const [sourceActivities, setSourceActivities] = useState<SourceActivityItem[]>(() => {
    const saved = localStorage.getItem('forward_activities_v3_real');
    return saved ? JSON.parse(saved) : INITIAL_SOURCE_ACTIVITIES;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('forward_profile_v3_real');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('forward_notifications_v3_real');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('forward_preferences_v3_real');
    return saved ? JSON.parse(saved) : INITIAL_PREFERENCES;
  });

  // Navigation & Search State
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date>(new Date(2026, 9, 14)); // Oct 14, 2026

  // Header Dropdowns State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Modals State
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);
  const [isExtractionReviewOpen, setIsExtractionReviewOpen] = useState(false);
  const [extractionDraft, setExtractionDraft] = useState<ExtractionDraft>(SAMPLE_EXTRACTION_RESULT);
  const [detailEventId, setDetailEventId] = useState<string | null>(null);
  const [conflictEventId, setConflictEventId] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('forward_events_v3_real', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('forward_attention_v3_real', JSON.stringify(attentionItems));
  }, [attentionItems]);

  useEffect(() => {
    localStorage.setItem('forward_recent_v3_real', JSON.stringify(recentlyAdded));
  }, [recentlyAdded]);

  useEffect(() => {
    localStorage.setItem('forward_moves_v3_real', JSON.stringify(nextMoves));
  }, [nextMoves]);

  useEffect(() => {
    localStorage.setItem('forward_sources_v3_real', JSON.stringify(sources));
  }, [sources]);

  useEffect(() => {
    localStorage.setItem('forward_activities_v3_real', JSON.stringify(sourceActivities));
  }, [sourceActivities]);

  useEffect(() => {
    localStorage.setItem('forward_profile_v3_real', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('forward_notifications_v3_real', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('forward_preferences_v3_real', JSON.stringify(preferences));

    // Theme application to documentElement
    const theme = preferences.theme;
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else if (theme === 'system') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  }, [preferences]);

  // Global Escape key listener to dismiss open modals or dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCaptureOpen(false);
        setIsExtractionReviewOpen(false);
        setDetailEventId(null);
        setConflictEventId(null);
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (type: 'success' | 'warning' | 'info', title: string, description?: string) => {
    const newToast: ToastMessage = {
      id: 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5),
      type,
      title,
      description
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset demo data
  const handleResetDemoData = () => {
    [
      'forward_events_v3_real',
      'forward_attention_v3_real',
      'forward_recent_v3_real',
      'forward_moves_v3_real',
      'forward_sources_v3_real',
      'forward_activities_v3_real',
      'forward_profile_v3_real',
      'forward_notifications_v3_real',
      'forward_preferences_v3_real'
    ].forEach((k) => localStorage.removeItem(k));
    setEvents(INITIAL_EVENTS);
    setAttentionItems(INITIAL_ATTENTION_ITEMS);
    setRecentlyAdded(INITIAL_RECENTLY_ADDED);
    setNextMoves(INITIAL_NEXT_MOVES);
    setSources(INITIAL_SOURCES);
    setSourceActivities(INITIAL_SOURCE_ACTIVITIES);
    setUserProfile(INITIAL_USER_PROFILE);
    setNotifications(INITIAL_NOTIFICATIONS);
    setPreferences(INITIAL_PREFERENCES);
    addToast('info', 'Prototype Reset', 'Restored real event seed dataset.');
  };

  // Selected event getters
  const selectedDetailEvent = useMemo(
    () => events.find((e) => e.id === detailEventId) || null,
    [events, detailEventId]
  );

  const selectedConflictEvent = useMemo(
    () => events.find((e) => e.id === conflictEventId) || null,
    [events, conflictEventId]
  );

  // Conflicted events for badge
  const pendingConflicts = useMemo(
    () => events.filter((e) => e.conflict && e.conflict.status === 'Pending'),
    [events]
  );

  // Filtered events based on search query
  const searchedEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const q = searchQuery.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [events, searchQuery]);

  // Actions
  const handleExtractionComplete = (draft: ExtractionDraft) => {
    setIsCaptureOpen(false);
    setExtractionDraft(draft);
    setIsExtractionReviewOpen(true);
    addToast('info', 'Extraction Ready', 'Review parsed notice before confirming to timeline.');
  };

  const handleConfirmExtractedEvent = (finalData: ExtractionDraft) => {
    setIsExtractionReviewOpen(false);

    const newEvent: EventItem = {
      id: 'evt-' + Date.now(),
      title: finalData.title,
      organizer: finalData.organizer,
      category: finalData.category,
      status: 'Open',
      registrationDeadline: finalData.registrationDeadline,
      eventStartDate: finalData.eventStartDate,
      eventEndDate: finalData.eventEndDate,
      timeRange: '10:00 AM – 5:00 PM',
      dateLabel: { month: 'NOV', day: '04' },
      reportingTime: finalData.reportingTime,
      venue: finalData.venue,
      isOnline: false,
      registrationUrl: finalData.registrationUrl,
      summary: 'Extracted campus event notice.',
      daysRemaining: 21,
      thumbnailType: 'product-sprint',
      tags: ['Hackathon', 'Campus'],
      sourceNotice: {
        id: 'src-' + Date.now(),
        channel: finalData.sourceChannel,
        receivedAt: 'Just now',
        senderOrSource: 'Imported notice',
        rawSnippet: finalData.sourceText,
        confidenceScore: finalData.confidenceScore
      },
      changeHistory: [
        {
          id: 'h-' + Date.now(),
          timestamp: 'Just now',
          changeType: 'Created',
          description: 'Added via extraction flow',
          actor: 'User Manual'
        }
      ],
      tasks: []
    };

    setEvents((prev) => [newEvent, ...prev]);

    // Also add to recently added
    setRecentlyAdded((prev) => [
      {
        id: 'rec-' + Date.now(),
        title: finalData.title,
        organizer: finalData.organizer,
        eventId: newEvent.id,
        timeAgo: 'Just now',
        thumbnailType: 'product-sprint'
      },
      ...prev
    ]);

    addToast('success', 'Event Confirmed', `${finalData.title} added to your timeline.`);
  };

  const handleResolveConflict = (decision: 'keep' | 'update' | 'manual', manualValue?: string) => {
    if (!conflictEventId) return;

    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== conflictEventId || !evt.conflict) return evt;

        let resolvedValue = evt.venue;
        let auditNote = '';

        if (decision === 'keep') {
          resolvedValue = evt.conflict.currentValue;
          auditNote = `Kept previous record: ${evt.conflict.currentValue}`;
        } else if (decision === 'update') {
          resolvedValue = evt.conflict.newValue;
          auditNote = `Accepted update: ${evt.conflict.newValue}`;
        } else if (decision === 'manual' && manualValue) {
          resolvedValue = manualValue;
          auditNote = `Applied manual override: ${manualValue}`;
        }

        return {
          ...evt,
          venue: evt.conflict.field === 'venue' ? resolvedValue : evt.venue,
          eventStartDate: evt.conflict.field === 'event_date' ? '2026-10-28T09:30:00' : evt.eventStartDate,
          dateLabel: evt.conflict.field === 'event_date' ? { month: 'OCT', day: '28' } : evt.dateLabel,
          conflict: {
            ...evt.conflict,
            status: 'Resolved',
            resolutionDecision: decision === 'keep' ? 'kept_current' : decision === 'update' ? 'accepted_new' : 'manual_override'
          },
          changeHistory: [
            {
              id: 'h-' + Date.now(),
              timestamp: 'Just now',
              changeType: 'Conflict Resolved',
              description: auditNote,
              actor: 'User Manual'
            },
            ...evt.changeHistory
          ]
        };
      })
    );

    // Remove from attention items if present
    setAttentionItems((prev) => prev.filter((item) => item.eventId !== conflictEventId));

    setConflictEventId(null);
    addToast(
      'success',
      'Discrepancy Reconciled',
      decision === 'keep'
        ? 'Retained original value.'
        : decision === 'update'
        ? 'Updated schedule from latest circular.'
        : `Manual override applied: ${manualValue}`
    );
  };

  const handleToggleNextMove = (taskId: string) => {
    setNextMoves((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const nextState = !task.completed;
          addToast(
            nextState ? 'success' : 'info',
            nextState ? 'Task Completed' : 'Task Marked Pending',
            task.title
          );
          return { ...task, completed: nextState };
        }
        return task;
      })
    );
  };

  const handleToggleTaskInEvent = (eventId: string, taskId: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        return {
          ...evt,
          tasks: evt.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, completed: !task.completed };
            }
            return task;
          })
        };
      })
    );
  };

  const handleAddTaskToEvent = (
    eventId: string,
    title: string,
    dueDate?: string,
    priority?: 'High' | 'Medium' | 'Low'
  ) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        const newTask = {
          id: 't-' + Date.now(),
          title,
          dueDate: dueDate || '2026-10-25',
          completed: false,
          priority: priority || ('Medium' as const),
          eventId
        };
        const auditEntry = {
          id: 'h-' + Date.now(),
          timestamp: 'Just now',
          changeType: 'Field Updated' as const,
          description: `Added checklist task: ${title}`,
          actor: 'User Manual' as const
        };
        return {
          ...evt,
          tasks: [...evt.tasks, newTask],
          changeHistory: [auditEntry, ...evt.changeHistory]
        };
      })
    );
    addToast('success', 'Task Added', title);
  };

  const handleUpdateStatus = (eventId: string, newStatus: EventStatus) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        return {
          ...evt,
          status: newStatus,
          changeHistory: [
            {
              id: 'h-' + Date.now(),
              timestamp: 'Just now',
              changeType: 'Status Changed',
              description: `Status changed to ${newStatus}`,
              actor: 'User Manual'
            },
            ...evt.changeHistory
          ]
        };
      })
    );
    addToast('info', 'Status Updated', `Event marked as "${newStatus}"`);
  };

  const handleRemoveEvent = (eventId: string) => {
    const target = events.find((e) => e.id === eventId);
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setAttentionItems((prev) => prev.filter((a) => a.eventId !== eventId));
    setRecentlyAdded((prev) => prev.filter((r) => r.eventId !== eventId));
    if (target) {
      addToast('info', 'Event Removed', `"${target.title}" was removed from your timeline.`);
    }
  };

  const handleAddNewEvent = (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
    const recentItem: RecentlyAddedItem = {
      id: 'rec-' + Date.now(),
      title: newEvent.title,
      organizer: newEvent.organizer,
      eventId: newEvent.id,
      timeAgo: 'Just now',
      thumbnailType: newEvent.thumbnailType || 'default'
    };
    setRecentlyAdded((prev) => [recentItem, ...prev]);
    setActiveView('timeline');
  };

  const unresolvedAttentionCount = useMemo(
    () => attentionItems.filter((item) => item.status !== 'resolved').length,
    [attentionItems]
  );

  const handleResolveAttentionIssue = (
    issueId: string,
    action: string,
    details?: {
      rescheduledDate?: string;
      rescheduledStartTime?: string;
      rescheduledEndTime?: string;
      venue?: string;
      mode?: 'Online' | 'In-Person' | 'Hybrid';
      meetingUrl?: string;
      acceptedValue?: string;
    }
  ) => {
    setAttentionItems((prev) =>
      prev.map((item) => {
        if (item.id === issueId) {
          return { ...item, status: 'resolved' };
        }
        return item;
      })
    );

    const targetItem = attentionItems.find((i) => i.id === issueId);
    if (!targetItem) return;

    if (action === 'reschedule' && details?.rescheduledDate) {
      setEvents((prev) =>
        prev.map((evt) => {
          if (evt.id === targetItem.eventId) {
            const parsedDate = new Date(details.rescheduledDate!);
            const monthStr = parsedDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const dayStr = String(parsedDate.getDate());
            return {
              ...evt,
              eventStartDate: `${details.rescheduledDate}T09:00:00`,
              dateLabel: { month: monthStr, day: dayStr },
              timeRange:
                details.rescheduledStartTime && details.rescheduledEndTime
                  ? `${details.rescheduledStartTime} – ${details.rescheduledEndTime}`
                  : evt.timeRange,
              timelineGroup: 'Later This Month',
              conflict: undefined,
            };
          }
          return evt;
        })
      );
    } else if (action === 'add_venue' && details?.venue) {
      setEvents((prev) =>
        prev.map((evt) => {
          if (evt.id === targetItem.eventId) {
            return {
              ...evt,
              venue: details.venue!,
              isOnline: details.mode === 'Online',
            };
          }
          return evt;
        })
      );
    } else if (action === 'accept_update' && details?.acceptedValue) {
      setEvents((prev) =>
        prev.map((evt) => {
          if (evt.id === targetItem.eventId) {
            return {
              ...evt,
              registrationDeadline: `${details.acceptedValue}T23:59:00`,
              deadlineFormatted: details.acceptedValue,
            };
          }
          return evt;
        })
      );
    }
  };

  const handleUpdateEvent = (updatedEvent: EventItem) => {
    setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
  };

  const handleAttentionItemClick = (_item: AttentionItem) => {
    setActiveView('needs-review');
  };

  const handleAddSource = (newSource: SourceItem) => {
    setSources((prev) => [newSource, ...prev]);
    const newAct: SourceActivityItem = {
      id: 'act-' + Date.now(),
      sourceName: newSource.name,
      logoType: newSource.logoType,
      actionText: 'Source connected',
      timeAgo: 'Just now',
      status: 'success'
    };
    setSourceActivities((prev) => [newAct, ...prev]);
    addToast('success', 'Source Added', `${newSource.name} has been connected.`);
  };

  const handleUpdateSource = (updated: SourceItem) => {
    setSources((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleRemoveSource = (id: string) => {
    const target = sources.find((s) => s.id === id);
    setSources((prev) => prev.filter((s) => s.id !== id));
    if (target) {
      const newAct: SourceActivityItem = {
        id: 'act-' + Date.now(),
        sourceName: target.name,
        logoType: target.logoType,
        actionText: 'Source removed',
        timeAgo: 'Just now',
        status: 'warning'
      };
      setSourceActivities((prev) => [newAct, ...prev]);
    }
  };

  const handleSyncSource = (id: string) => {
    const target = sources.find((s) => s.id === id);
    if (!target) return;

    // Set syncing state
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Syncing' as const } : s))
    );

    // Simulate real sync completion after 1.2s
    setTimeout(() => {
      const isFailed = target.id === 'src-6'; // Custom website test case
      const newFoundCount = isFailed ? target.eventsFoundCount : target.eventsFoundCount + Math.floor(Math.random() * 3 + 1);

      setSources((prev) =>
        prev.map((s) => {
          if (s.id === id) {
            return {
              ...s,
              status: isFailed ? ('Disconnected' as const) : ('Connected' as const),
              lastSyncedText: isFailed ? 'Sync failed (timeout)' : 'Just now',
              eventsFoundCount: newFoundCount
            };
          }
          return s;
        })
      );

      const newAct: SourceActivityItem = {
        id: 'act-' + Date.now(),
        sourceName: target.name,
        logoType: target.logoType,
        actionText: isFailed ? 'Sync failed' : `${newFoundCount - target.eventsFoundCount} new events found`,
        timeAgo: 'Just now',
        status: isFailed ? 'error' : 'success'
      };
      setSourceActivities((prev) => [newAct, ...prev]);

      if (isFailed) {
        addToast('warning', 'Sync Failed', `${target.name}: RSS endpoint timed out. Check URL.`);
      } else {
        addToast('success', 'Sync Completed', `${target.name}: Discovered ${newFoundCount - target.eventsFoundCount} new opportunities.`);
      }
    }, 1200);
  };

  const handleImportDiscoveredEvents = (sourceName: string) => {
    const importedEvents: EventItem[] = [
      {
        id: 'disc-' + Date.now() + '-1',
        title: `${sourceName} Innovation Challenge 2026`,
        organizer: sourceName,
        category: 'Hackathons',
        eventStartDate: '2026-11-15T09:00:00',
        dateLabel: { month: 'NOV', day: '15' },
        timeRange: '9:00 AM – 6:00 PM',
        venue: 'Main Campus Hall & Online',
        isOnline: false,
        registrationUrl: 'https://unstop.com',
        summary: `Auto-discovered opportunity from ${sourceName} feed.`,
        status: 'Interested',
        registrationDeadline: '2026-11-10T23:59:59',
        daysRemaining: 27,
        tags: ['Hackathon', 'Builder', 'Team'],
        sourceNotice: {
          id: 'sn-disc-1',
          channel: 'Web Link',
          receivedAt: 'Just now',
          senderOrSource: sourceName,
          rawSnippet: 'Official event announcement verified from sync channel.',
          confidenceScore: 0.95
        },
        tasks: [
          { id: 't1', title: 'Form team of 4 members', dueDate: '2026-11-05', completed: false, priority: 'High' }
        ],
        changeHistory: [
          {
            id: 'ch-1',
            timestamp: 'Just now',
            changeType: 'Created',
            description: `Auto-discovered and imported via ${sourceName} sync`,
            actor: 'Reconciliation Engine'
          }
        ],
        thumbnailType: 'hackathon'
      }
    ];

    setEvents((prev) => [...importedEvents, ...prev]);
    addToast('success', 'Events Imported', `Added 1 new event from ${sourceName} to your timeline.`);
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
  };

  const handleUpdateNotifications = (updated: NotificationSettings) => {
    setNotifications(updated);
  };

  const handleUpdatePreferences = (updated: UserPreferences) => {
    setPreferences(updated);
  };

  const handleDownloadData = () => {
    try {
      const exportData = {
        exportedAt: new Date().toISOString(),
        application: 'FORWARD — Campus Timeline & Opportunity Hub',
        user: userProfile,
        preferences,
        notifications,
        timelineEvents: events,
        attentionItems,
        nextMoveTasks: nextMoves,
        connectedSources: sources,
        sourceActivities
      };

      const jsonStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `forward_user_data_export_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      addToast('success', 'Data Export Ready', 'Downloaded your events, sources, and preferences JSON.');
    } catch {
      addToast('warning', 'Export Failed', 'Unable to create downloadable export.');
    }
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    setEvents(INITIAL_EVENTS);
    setAttentionItems(INITIAL_ATTENTION_ITEMS);
    setRecentlyAdded(INITIAL_RECENTLY_ADDED);
    setNextMoves(INITIAL_NEXT_MOVES);
    setSources(INITIAL_SOURCES);
    setSourceActivities(INITIAL_SOURCE_ACTIVITIES);
    setUserProfile(INITIAL_USER_PROFILE);
    setNotifications(INITIAL_NOTIFICATIONS);
    setPreferences(INITIAL_PREFERENCES);
    setActiveView('overview');
    addToast('info', 'Account Reset', 'All personalized data was cleared and default demo restored.');
  };

  return (
    <div className="app-layout">
      {/* 1. Left Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCapture={() => setActiveView('add-event')}
        conflictCount={unresolvedAttentionCount}
        userProfile={userProfile}
        onProfileMenuClick={() => setIsProfileOpen(true)}
      />

      {/* 2. Main Viewport */}
      <div className="app-main-viewport">
        {/* Top Search & Profile Bar */}
        <TopHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isNotificationsOpen={isNotificationsOpen}
          setIsNotificationsOpen={setIsNotificationsOpen}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          onResetDemoData={handleResetDemoData}
          onSelectNotificationItem={(eventId) => setDetailEventId(eventId)}
          userProfile={userProfile}
          onOpenSettings={() => setActiveView('settings')}
        />

        {/* Dynamic Page Views */}
        <div className="dashboard-scroll-content">
          {activeView === 'overview' && (
            <>
              {/* Greeting Header */}
              <GreetingHeader
                onOpenAddEvent={() => setActiveView('add-event')}
                dateString="Tue, 14 Oct 2026"
                userName="Chakshu"
              />

              {/* 4 Summary Metric Cards */}
              <MetricsRow
                upcomingCount={events.length}
                deadlinesCount={events.filter((e) => e.deadlineDaysLeft !== undefined && e.deadlineDaysLeft >= 0 && e.deadlineDaysLeft <= 7).length}
                needsReviewCount={unresolvedAttentionCount}
                registeredCount={events.filter((e) => e.status === 'Registered').length}
                onCardClick={(type) => {
                  if (type === 'upcoming') setActiveView('timeline');
                  else if (type === 'deadlines') setActiveView('timeline');
                  else if (type === 'needs-review') setActiveView('needs-review');
                  else if (type === 'registered') setActiveView('timeline');
                }}
              />

              {/* Main 2-Column Dashboard Layout */}
              <div className="dashboard-main-grid">
                {/* Left Column: Upcoming Events & Bottom Split */}
                <div className="dashboard-left-col">
                  {/* Upcoming Events Panel */}
                  <UpcomingEventsSection
                    events={searchedEvents}
                    onSelectEvent={(evt) => setDetailEventId(evt.id)}
                    onViewAll={() => setActiveView('timeline')}
                  />

                  {/* Bottom Split Row: Needs Attention & Recently Added */}
                  <div className="split-panels-row">
                    <NeedsAttentionCard
                      items={attentionItems}
                      onSelectItem={handleAttentionItemClick}
                      onViewAll={() => setActiveView('needs-review')}
                    />

                    <RecentlyAddedCard
                      items={recentlyAdded}
                      onSelectItem={(item) => setDetailEventId(item.eventId)}
                      onViewAll={() => setActiveView('timeline')}
                    />
                  </div>
                </div>

                {/* Right Column: Calendar & Your Next Moves */}
                <div className="dashboard-right-col">
                  {/* Calendar Panel */}
                  <CalendarPanel
                    events={events}
                    selectedDate={selectedCalendarDate}
                    onSelectDate={(d) => {
                      setSelectedCalendarDate(d);
                      const matchingEvt = events.find((e) =>
                        e.eventStartDate.startsWith(
                          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
                        )
                      );
                      if (matchingEvt) {
                        addToast('info', matchingEvt.title, matchingEvt.timeRange || matchingEvt.venue);
                      }
                    }}
                    onOpenEvent={(evt) => setDetailEventId(evt.id)}
                  />

                  {/* Your Next Moves Panel */}
                  <NextMovesPanel
                    tasks={nextMoves}
                    onToggleTask={handleToggleNextMove}
                    onOpenTaskEvent={(eventId) => eventId && setDetailEventId(eventId)}
                  />
                </div>
              </div>
            </>
          )}

          {/* View: My Timeline */}
          {activeView === 'timeline' && (
            <MyTimelineView
              events={searchedEvents}
              nextMoves={nextMoves}
              onOpenAddEvent={() => setActiveView('add-event')}
              onSelectEvent={(evt) => setDetailEventId(evt.id)}
              onUpdateStatus={handleUpdateStatus}
              onRemoveEvent={handleRemoveEvent}
              onToggleNextMove={handleToggleNextMove}
            />
          )}

          {/* View: Add Event */}
          {activeView === 'add-event' && (
            <AddEventView
              onClose={() => setActiveView('overview')}
              onSaveEvent={handleAddNewEvent}
              existingEvents={events}
              addToast={addToast}
            />
          )}

          {/* View: Needs Review */}
          {activeView === 'needs-review' && (
            <NeedsReviewView
              attentionItems={attentionItems}
              events={events}
              onResolveIssue={handleResolveAttentionIssue}
              onUpdateEvent={handleUpdateEvent}
              addToast={addToast}
            />
          )}

          {/* View: Sources */}
          {activeView === 'sources' && (
            <SourcesView
              sources={sources}
              activities={sourceActivities}
              onAddSource={handleAddSource}
              onUpdateSource={handleUpdateSource}
              onRemoveSource={handleRemoveSource}
              onSyncSource={handleSyncSource}
              onImportDiscoveredEvents={handleImportDiscoveredEvents}
              addToast={addToast}
            />
          )}

          {/* View: Settings */}
          {activeView === 'settings' && (
            <SettingsView
              userProfile={userProfile}
              notifications={notifications}
              preferences={preferences}
              onUpdateProfile={handleUpdateProfile}
              onUpdateNotifications={handleUpdateNotifications}
              onUpdatePreferences={handleUpdatePreferences}
              onResetDemoData={handleResetDemoData}
              onDownloadData={handleDownloadData}
              onDeleteAccount={handleDeleteAccount}
              addToast={addToast}
            />
          )}
        </div>
      </div>

      {/* Interactive Modals */}
      <CaptureModal
        isOpen={isCaptureOpen}
        onClose={() => setIsCaptureOpen(false)}
        onExtractionSuccess={handleExtractionComplete}
      />

      <ExtractionReviewModal
        isOpen={isExtractionReviewOpen}
        draft={extractionDraft}
        onClose={() => setIsExtractionReviewOpen(false)}
        onConfirm={handleConfirmExtractedEvent}
        onTriggerConflictReview={() => {
          setIsExtractionReviewOpen(false);
          if (pendingConflicts.length > 0) {
            setConflictEventId(pendingConflicts[0].id);
          } else {
            setConflictEventId(events[0].id);
          }
        }}
      />

      <EventDetailModal
        isOpen={!!detailEventId}
        event={selectedDetailEvent}
        onClose={() => setDetailEventId(null)}
        onUpdateStatus={handleUpdateStatus}
        onToggleTask={handleToggleTaskInEvent}
        onAddTask={handleAddTaskToEvent}
        onOpenConflict={(e) => {
          setDetailEventId(null);
          setConflictEventId(e.id);
        }}
      />

      <ConflictModal
        isOpen={!!conflictEventId}
        event={selectedConflictEvent}
        onClose={() => setConflictEventId(null)}
        onResolve={handleResolveConflict}
      />

      {/* Toast Stack */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
