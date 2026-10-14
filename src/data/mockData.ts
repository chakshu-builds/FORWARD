import type {
  EventItem,
  ExtractionDraft,
  AttentionItem,
  RecentlyAddedItem,
  PrepTask,
  SourceItem,
  SourceActivityItem,
  UserProfile,
  NotificationSettings,
  UserPreferences
} from '../types';
import { INITIAL_EVENTS as REAL_EVENTS, INITIAL_SOURCES as REAL_SOURCES } from './realEventsMock';

// Re-export real events and sources as the canonical datasets
export const INITIAL_EVENTS: EventItem[] = REAL_EVENTS;
export const INITIAL_SOURCES: SourceItem[] = REAL_SOURCES;

export const INITIAL_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-1',
    type: 'conflict',
    title: 'Conflicting dates detected',
    eventTitle: 'Hack On Hills 8.0',
    eventId: 'evt-hack-on-hills-8',
    dateLabel: { month: 'OCT', day: '31' },
    timeAgo: '2 hours ago',
    field: 'event_date',
    explanation: 'Devfolio listing header shows 31 Oct – 2 Nov 2026, while body copy indicates dates to be announced. Please confirm with organizers.',
    conflictingEventId: 'evt-search-central-live-bengaluru-2026',
    conflictingEventTitle: 'Search Central Live Bengaluru 2026',
    conflictingEventDate: '30 Oct 2026',
    conflictingEventTime: '08:45 AM – 5:00 PM',
    status: 'pending'
  },
  {
    id: 'att-2',
    type: 'missing_info',
    title: 'Missing venue information',
    eventTitle: 'Search Fundamentals for News Sites Gurugram 2026',
    eventId: 'evt-search-fundamentals-gurugram-2026',
    dateLabel: { month: 'NOV', day: '02' },
    timeAgo: '5 hours ago',
    field: 'venue',
    explanation: 'Offline event listing lacks specific venue hall address in Gurugram. Please confirm address or livestream link.',
    status: 'pending'
  },
  {
    id: 'att-3',
    type: 'update',
    title: 'Registration deadline closing soon',
    eventTitle: 'Atomic Hack India 2026',
    eventId: 'evt-atomic-hack-india-2026',
    dateLabel: { month: 'OCT', day: '20' },
    timeAgo: '1 day ago',
    field: 'registrationDeadline',
    previousValue: 'Unconfirmed',
    proposedValue: '20 Oct 2026 (23:59 IST)',
    explanation: 'The Indian Express announced qualification round registration cutoff closes on 20 October. Teams must register before cutoff.',
    status: 'pending'
  }
];

export const INITIAL_RECENTLY_ADDED: RecentlyAddedItem[] = [
  {
    id: 'rec-1',
    title: 'Winter of Code 2026',
    organizer: 'Winter of Code / Devfolio',
    eventId: 'evt-winter-of-code-2026',
    timeAgo: 'Just now',
    thumbnailType: 'winter-of-code'
  },
  {
    id: 'rec-2',
    title: 'Atomic Hack India 2026',
    organizer: 'IIT Bombay & Rosatom',
    eventId: 'evt-atomic-hack-india-2026',
    timeAgo: '2h ago',
    thumbnailType: 'atomic-hack'
  },
  {
    id: 'rec-3',
    title: 'Search Central Live Bengaluru 2026',
    organizer: 'Google Search Central',
    eventId: 'evt-search-central-live-bengaluru-2026',
    timeAgo: '5h ago',
    thumbnailType: 'search-central-bengaluru'
  }
];

export const INITIAL_NEXT_MOVES: PrepTask[] = [
  {
    id: 'task-1',
    title: 'Submit project build for CodeStorm 2026: FutureForge',
    dueDate: '2026-10-15',
    completed: false,
    priority: 'High',
    eventId: 'evt-codestorm-futureforge-2026'
  },
  {
    id: 'task-2',
    title: 'Attend kickoff orientation for Winter of Code 2026',
    dueDate: '2026-10-15',
    completed: true,
    priority: 'High',
    eventId: 'evt-winter-of-code-2026'
  },
  {
    id: 'task-3',
    title: 'Form 4-person team for Atomic Hack India 2026',
    dueDate: '2026-10-18',
    completed: false,
    priority: 'High',
    eventId: 'evt-atomic-hack-india-2026'
  },
  {
    id: 'task-4',
    title: 'Review schedule dates for Hack On Hills 8.0',
    dueDate: '2026-10-22',
    completed: false,
    priority: 'High',
    eventId: 'evt-hack-on-hills-8'
  },
  {
    id: 'task-5',
    title: 'Confirm venue location for Google Gurugram workshop',
    dueDate: '2026-10-25',
    completed: false,
    priority: 'Medium',
    eventId: 'evt-search-fundamentals-gurugram-2026'
  }
];

export const INITIAL_SOURCE_ACTIVITIES: SourceActivityItem[] = [
  {
    id: 'act-1',
    sourceName: 'Devfolio',
    logoType: 'devfolio',
    actionText: '6 verified events synchronized',
    timeAgo: '2 hours ago',
    status: 'success'
  },
  {
    id: 'act-2',
    sourceName: 'Google Search Central Events',
    logoType: 'google-developers',
    actionText: '2 developer events verified',
    timeAgo: '5 hours ago',
    status: 'success'
  },
  {
    id: 'act-3',
    sourceName: 'The Indian Express (Education Desk)',
    logoType: 'custom-website',
    actionText: 'Atomic Hack India announcement processed',
    timeAgo: '1 day ago',
    status: 'success'
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  fullName: 'Chakshu Arora',
  email: 'chakshu.arora@college.edu.in',
  role: 'Student',
  institution: 'Delhi University',
  academicYear: '3rd Year CSE',
  avatarUrl: ''
};

export const INITIAL_NOTIFICATIONS: NotificationSettings = {
  eventReminders: true,
  newEventAlerts: true,
  importantUpdates: true
};

export const INITIAL_PREFERENCES: UserPreferences = {
  defaultView: 'List View',
  sortEventsBy: 'Earliest First',
  theme: 'light'
};

export const SAMPLE_CAPTURE_PRESETS = {
  textSnippet: `🚨 OFFICIAL ANNOUNCEMENT: CODESTORM 2026 SUBMISSIONS!
Team CodeStorm / Devfolio
Attention Participants:
Final project submissions for CodeStorm 2026: FutureForge close on 15 October 2026 at 23:59 IST.
- Category: Open Innovation, AI & Web Development
- Mode: Online (Discord Community)
- Submission: GitHub Repository + 3-minute video walk-through`,

  sampleUrl: 'https://winter-of-code-4.devfolio.co/',
  linkUrl: 'https://winter-of-code-4.devfolio.co/',

  flyerName: 'Winter_of_Code_2026_Flyer.pdf',
  flyerDescription: 'Winter of Code 2026 Official Poster: Open-source developer contribution program starting October 15, 2026.'
};

export const SAMPLE_EXTRACTION_RESULT: ExtractionDraft = {
  title: 'CodeStorm 2026: FutureForge (Final Submission)',
  organizer: 'Team CodeStorm',
  category: 'Hackathons',
  eventStartDate: '2026-10-15T00:00:00',
  eventEndDate: '2026-10-15T23:59:00',
  registrationDeadline: '2026-10-15T23:59:00',
  reportingTime: 'Online Discord community',
  venue: 'Online (Discord community)',
  registrationUrl: 'https://codestorm-futureforge.devfolio.co/',
  sourceText: 'Final project submissions for CodeStorm 2026 close on 15 October 2026 at 23:59 IST. Submit GitHub repository link and demo.',
  sourceChannel: 'Web Link',
  confidenceScore: 0.98,
  lowConfidenceFields: []
};
