/**
 * Real-event seed dataset for FORWARD.
 *
 * Compiled from publicly visible listings checked on 14 Oct 2026.
 * Genuine public hackathons, Google Search developer conferences, and student competitions.
 */
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

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-codestorm-futureforge-2026',
    title: 'CodeStorm 2026: FutureForge',
    organizer: 'Team CodeStorm',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '2026-10-15T23:59:00',
    eventStartDate: '2026-10-14T09:00:00',
    eventEndDate: '2026-10-15T23:59:00',
    timeRange: 'Online · Final Day (Ends 15 Oct)',
    dateLabel: { month: 'OCT', day: '14' },
    reportingTime: 'Online (Community Discord)',
    venue: 'Online (Discord community)',
    isOnline: true,
    registrationUrl: 'https://codestorm-futureforge.devfolio.co/',
    summary: 'Student-focused open-innovation hackathon covering AI, web development, cybersecurity, edtech, sustainability, and productivity tools. Official listing runs until 15 October 2026.',
    daysRemaining: 0,
    deadlineFormatted: '15 Oct 2026',
    deadlineDaysLeft: 1,
    timelineGroup: 'Today',
    isUrgent: true,
    thumbnailType: 'codestorm',
    tags: ['Hackathon', 'AI', 'Web Development', 'Cybersecurity'],
    sourceNotice: {
      id: 'src-codestorm-2026',
      channel: 'Web Link',
      receivedAt: '2026-10-14 09:30',
      senderOrSource: 'Devfolio — CodeStorm 2026: FutureForge',
      rawSnippet: 'Runs until Oct 15, 2026; online through the community Discord. Submission cutoff approaching.',
      confidenceScore: 0.98
    },
    tasks: [
      { id: 't-cs-1', title: 'Submit GitHub repository link & demo video', dueDate: '2026-10-15', completed: false, priority: 'High', eventId: 'evt-codestorm-futureforge-2026' }
    ],
    changeHistory: [
      { id: 'hist-codestorm-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from public Devfolio event page.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-winter-of-code-2026',
    title: 'Winter of Code 2026',
    organizer: 'Winter of Code / Devfolio listing',
    category: 'Hackathons',
    status: 'Registered',
    registrationDeadline: '2026-10-15T23:59:00',
    eventStartDate: '2026-10-15T00:00:00',
    eventEndDate: '2026-12-01T23:59:00',
    timeRange: '15 Oct – 1 Dec 2026 · Online',
    dateLabel: { month: 'OCT', day: '15' },
    reportingTime: 'Online orientation',
    venue: 'Online',
    isOnline: true,
    registrationUrl: 'https://winter-of-code-4.devfolio.co/',
    summary: 'An open-source contribution program for students and developers to work with real projects, fix issues, improve documentation, and collaborate with maintainers. Public listing states the program runs from 15 October to 1 December 2026.',
    daysRemaining: 1,
    deadlineFormatted: '15 Oct 2026',
    deadlineDaysLeft: 1,
    timelineGroup: 'Tomorrow',
    isUrgent: false,
    thumbnailType: 'winter-of-code',
    tags: ['Open Source', 'Developer Program', 'Online'],
    sourceNotice: {
      id: 'src-woc-2026',
      channel: 'Web Link',
      receivedAt: '2026-10-14 11:00',
      senderOrSource: 'Devfolio — Winter of Code 2026',
      rawSnippet: 'Runs from Oct 15 – Dec 1, 2026. Online. Open-source contribution program.',
      confidenceScore: 0.98
    },
    tasks: [
      { id: 't-woc-1', title: 'Attend kickoff orientation call & join Discord', dueDate: '2026-10-15', completed: true, priority: 'High', eventId: 'evt-winter-of-code-2026' },
      { id: 't-woc-2', title: 'Claim initial good-first-issue on repo', dueDate: '2026-10-18', completed: false, priority: 'Medium', eventId: 'evt-winter-of-code-2026' }
    ],
    changeHistory: [
      { id: 'hist-woc-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from public Devfolio event page.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-atomic-hack-india-2026',
    title: 'Atomic Hack India 2026',
    organizer: 'IIT Bombay, Rosatom & partner organisations',
    category: 'Hackathons',
    status: 'Interested',
    registrationDeadline: '2026-10-20T23:59:00',
    eventStartDate: '2026-10-20T00:00:00',
    eventEndDate: '2026-12-06T23:59:00',
    timeRange: 'Online qualification: 20–28 Oct · Finale: 4–6 Dec',
    dateLabel: { month: 'OCT', day: '20' },
    reportingTime: 'Online qualification round',
    venue: 'Online qualification; grand finale at IIT Bombay, Mumbai',
    isOnline: false,
    registrationUrl: 'https://indianexpress.com/article/education/iit-bombay-rosatom-launch-atomic-hack-india-2026-registration-closes-prizes-internship-opportunity-how-to-apply-10915719/',
    summary: 'National engineering innovation challenge focused on power-grid protection for a 220 kV transmission line integrating nuclear and renewable energy. The published report says registration closes 20 October; online qualification runs 20–28 October, with a 48-hour finale at IIT Bombay from 4–6 December.',
    daysRemaining: 6,
    deadlineFormatted: '20 Oct 2026',
    deadlineDaysLeft: 6,
    timelineGroup: 'This Week',
    isUrgent: true,
    thumbnailType: 'atomic-hack',
    tags: ['Hackathon', 'Energy', 'Engineering', 'IIT Bombay'],
    conflict: {
      id: 'conf-atomic-1',
      field: 'registrationDeadline',
      fieldLabel: 'Registration Deadline',
      currentValue: '20 Oct 2026 (23:59 IST)',
      currentSource: 'The Indian Express Education Report',
      currentSourceDate: '14 Oct 2026',
      newValue: '20 Oct 2026 (Closing soon)',
      newSource: 'Official IIT Bombay Portal Notice',
      newSourceDate: '14 Oct 2026',
      status: 'Pending',
      explanation: 'Official portal registration closes in 6 days. Team registration must be submitted before cutoff.'
    },
    sourceNotice: {
      id: 'src-atomic-hack-2026',
      channel: 'Web Link',
      receivedAt: '2026-10-14 14:15',
      senderOrSource: 'The Indian Express — education report',
      rawSnippet: 'Registration open until 20 Oct 2026. Online qualification 20–28 Oct; grand finale at IIT Bombay 4–6 Dec.',
      confidenceScore: 0.96
    },
    tasks: [
      { id: 't-ah-1', title: 'Form 4-person engineering team for simulation track', dueDate: '2026-10-18', completed: false, priority: 'High', eventId: 'evt-atomic-hack-india-2026' }
    ],
    changeHistory: [
      { id: 'hist-atomic-1', timestamp: '2026-10-14', changeType: 'Created', description: "Seeded from published Indian Express report.", actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-innosprint-20',
    title: 'Innosprint 2.0',
    organizer: 'Innosprint organisers',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '2026-10-23T23:59:00',
    eventStartDate: '2026-10-24T00:00:00',
    eventEndDate: '2026-10-25T20:00:00',
    timeRange: 'Starts 24 Oct 2026 · 36h Sprint',
    dateLabel: { month: 'OCT', day: '24' },
    reportingTime: '08:30 AM IST',
    venue: 'Offline campus venue (Confirming with team)',
    isOnline: false,
    registrationUrl: 'https://innosprint-3.devfolio.co/',
    summary: 'An in-person sprint listed as open on Devfolio, starting 24 October 2026. Fast-paced innovation challenge for student developers.',
    daysRemaining: 10,
    deadlineFormatted: '23 Oct 2026',
    deadlineDaysLeft: 9,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'innosprint',
    tags: ['Hackathon', 'Innovation', 'Sprint'],
    sourceNotice: {
      id: 'src-innosprint-20',
      channel: 'Web Link',
      receivedAt: '2026-10-14 12:00',
      senderOrSource: 'Devfolio — Innosprint 2.0',
      rawSnippet: 'Public listing shows Offline, Open, Starts 24/10/26.',
      confidenceScore: 0.87
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-innosprint-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from public Devfolio listing.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-hacker-house-goa-2026',
    title: 'HACKER HOUSE GOA 2026',
    organizer: 'Hacker House Goa organisers',
    category: 'Hackathons',
    status: 'Interested',
    registrationDeadline: '2026-10-25T23:59:00',
    eventStartDate: '2026-10-28T00:00:00',
    eventEndDate: '2026-10-31T23:59:00',
    timeRange: 'Starts 28 Oct 2026 · Goa, India',
    dateLabel: { month: 'OCT', day: '28' },
    reportingTime: 'Check-in 10:00 AM IST',
    venue: 'Goa, India',
    isOnline: false,
    registrationUrl: 'https://hacker-house-goa-2026.devfolio.co/',
    summary: 'An in-person hackathon listed on Devfolio with Blockchain and AI themes. Cohort of developers collaborating by the beach in Goa.',
    daysRemaining: 14,
    deadlineFormatted: '25 Oct 2026',
    deadlineDaysLeft: 11,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'hacker-house-goa',
    tags: ['Hackathon', 'AI', 'Blockchain', 'Goa'],
    sourceNotice: {
      id: 'src-hacker-house-goa',
      channel: 'Web Link',
      receivedAt: '2026-10-14 15:20',
      senderOrSource: 'Devfolio — HACKER HOUSE GOA 2026',
      rawSnippet: 'Public listing shows Offline, Open, Starts 28/10/26; Blockchain and AI themes.',
      confidenceScore: 0.91
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-hhg-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from public Devfolio listing.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-search-central-live-bengaluru-2026',
    title: 'Search Central Live Bengaluru 2026',
    organizer: 'Google Search Central',
    category: 'Conferences',
    status: 'Registered',
    registrationDeadline: '2026-10-26T23:59:00',
    eventStartDate: '2026-10-30T09:00:00',
    eventEndDate: '2026-10-30T17:00:00',
    timeRange: '30 Oct 2026 · Full Day',
    dateLabel: { month: 'OCT', day: '30' },
    reportingTime: '08:45 AM IST',
    venue: 'Bengaluru, Karnataka, India',
    isOnline: false,
    registrationUrl: 'https://developers.google.com/search/events',
    summary: 'Google Search Central event in Bengaluru covering Search, crawling and indexing, structured data, search quality, Q&A, and networking with Google team.',
    daysRemaining: 16,
    deadlineFormatted: '26 Oct 2026',
    deadlineDaysLeft: 12,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'search-central-bengaluru',
    tags: ['Conference', 'Google', 'Search', 'Bengaluru'],
    sourceNotice: {
      id: 'src-search-central-bengaluru',
      channel: 'Web Link',
      receivedAt: '2026-10-14 16:00',
      senderOrSource: 'Google Search Central official events directory',
      rawSnippet: 'Search Central Live Bengaluru 2026 — October 30, 2026.',
      confidenceScore: 0.99
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-sclb-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from Google Search Central official event directory.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-q-hack-india-2026',
    title: 'Q-HACK INDIA 2026',
    organizer: 'Q-HACK INDIA organisers',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '2026-10-27T23:59:00',
    eventStartDate: '2026-10-30T10:00:00',
    eventEndDate: '2026-11-01T18:00:00',
    timeRange: 'Starts 30 Oct 2026 · Hybrid',
    dateLabel: { month: 'OCT', day: '30' },
    reportingTime: '09:30 AM IST',
    venue: 'Online & Hubs across India',
    isOnline: true,
    registrationUrl: 'https://based-india.devfolio.co/hackathons',
    summary: 'Q-HACK INDIA 2026 appears in Devfolio’s public open-hackathon directory with an offline start date of 30 October 2026. Focuses on Quantum algorithms and cryptography.',
    daysRemaining: 16,
    deadlineFormatted: '27 Oct 2026',
    deadlineDaysLeft: 13,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'q-hack-india',
    tags: ['Hackathon', 'Quantum', 'India'],
    sourceNotice: {
      id: 'src-qhack-india',
      channel: 'Web Link',
      receivedAt: '2026-10-14 17:00',
      senderOrSource: 'Devfolio public hackathon directory',
      rawSnippet: 'Q-HACK INDIA 2026 — Offline, Open, Starts 30/10/26.',
      confidenceScore: 0.82
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-qhi-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from Devfolio directory.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-hack-on-hills-8',
    title: 'Hack On Hills 8.0',
    organizer: 'App Team, NIT Hamirpur',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '2026-10-28T23:59:00',
    eventStartDate: '2026-10-31T00:00:00',
    eventEndDate: '2026-11-02T23:59:00',
    timeRange: '31 Oct – 2 Nov 2026 · Listing date needs confirmation',
    dateLabel: { month: 'OCT', day: '31' },
    reportingTime: 'To be confirmed',
    venue: 'NIT Hamirpur, Himachal Pradesh',
    isOnline: false,
    registrationUrl: 'https://hackonhills8.devfolio.co/',
    summary: 'A 48-hour student hackathon focused on AI and autonomous agents, blockchain/Web3, sustainability, social impact, and open innovation. Header shows 31 Oct–2 Nov, while body copy says dates TBA.',
    daysRemaining: 17,
    deadlineFormatted: '28 Oct 2026',
    deadlineDaysLeft: 14,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'hack-on-hills',
    tags: ['Hackathon', 'AI Agents', 'Web3', 'NIT Hamirpur'],
    conflict: {
      id: 'conf-hoh-1',
      field: 'event_date',
      fieldLabel: 'Schedule Discrepancy',
      currentValue: '31 Oct – 2 Nov 2026',
      currentSource: 'Devfolio Listing Header',
      currentSourceDate: '14 Oct 2026',
      newValue: 'Dates to be announced by NIT Hamirpur App Team',
      newSource: 'Devfolio Organiser Notice',
      newSourceDate: '14 Oct 2026',
      status: 'Pending',
      explanation: 'Discrepancy detected between header dates and listing announcement body copy.'
    },
    sourceNotice: {
      id: 'src-hack-on-hills-8',
      channel: 'Web Link',
      receivedAt: '2026-10-14 18:30',
      senderOrSource: 'Devfolio — Hack On Hills 8.0',
      rawSnippet: 'Header shows 31 Oct – 2 Nov 2026; page body says dates to be announced. Schedule requires confirmation.',
      confidenceScore: 0.84
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-hoh-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded with schedule-conflict warning from the source page.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-search-fundamentals-gurugram-2026',
    title: 'Search Fundamentals for News Sites Gurugram 2026',
    organizer: 'Google Search Central',
    category: 'Workshops',
    status: 'Interested',
    registrationDeadline: '2026-10-29T23:59:00',
    eventStartDate: '2026-11-02T09:30:00',
    eventEndDate: '2026-11-02T16:00:00',
    timeRange: '2 Nov 2026 · Gurugram, India',
    dateLabel: { month: 'NOV', day: '02' },
    reportingTime: '09:00 AM IST',
    venue: 'Gurugram, India (Venue details pending)',
    isOnline: false,
    registrationUrl: 'https://developers.google.com/search/events',
    summary: 'A Google Search Central event for news sites in Gurugram. The official directory lists presentations and Q&A with Gary Illyes and Cherry Prommawin on 2 November 2026.',
    daysRemaining: 19,
    deadlineFormatted: '29 Oct 2026',
    deadlineDaysLeft: 15,
    timelineGroup: 'Next Month',
    isUrgent: false,
    thumbnailType: 'search-fundamentals-gurugram',
    tags: ['Workshop', 'Google', 'SEO', 'Gurugram'],
    conflict: {
      id: 'conf-sfg-1',
      field: 'venue',
      fieldLabel: 'Venue Information Missing',
      currentValue: 'Gurugram, India',
      currentSource: 'Google Search Central Events Directory',
      currentSourceDate: '14 Oct 2026',
      newValue: 'Venue to be confirmed upon registration approval',
      newSource: 'Google Search Central Organiser Update',
      newSourceDate: '14 Oct 2026',
      status: 'Pending',
      explanation: 'Offline venue details not yet specified on directory listing.'
    },
    sourceNotice: {
      id: 'src-search-fundamentals-gurugram',
      channel: 'Web Link',
      receivedAt: '2026-10-14 19:00',
      senderOrSource: 'Google Search Central official events directory',
      rawSnippet: 'Search Fundamentals for News Sites Gurugram 2026 — November 2, 2026.',
      confidenceScore: 0.98
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-sfg-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from Google Search Central official event directory.', actor: 'Seed Dataset' }
    ]
  }
];

export const INITIAL_SOURCES: SourceItem[] = [
  {
    id: 'src-devfolio',
    name: 'Devfolio',
    description: 'Public hackathon listings and student builder programmes across India',
    categories: ['Hackathons', 'Competitions'],
    status: 'Connected',
    lastSyncedText: 'Seeded 14 Oct 2026',
    eventsFoundCount: 6,
    autoSyncEnabled: true,
    sourceType: 'platform',
    url: 'https://based-india.devfolio.co/hackathons',
    logoType: 'devfolio'
  },
  {
    id: 'src-google-search-central',
    name: 'Google Search Central Events',
    description: 'Official Google Search Central events & developer masterclasses',
    categories: ['Workshops', 'Conferences'],
    status: 'Connected',
    lastSyncedText: 'Seeded 14 Oct 2026',
    eventsFoundCount: 2,
    autoSyncEnabled: true,
    sourceType: 'platform',
    url: 'https://developers.google.com/search/events',
    logoType: 'google-developers'
  },
  {
    id: 'src-indian-express-atomic-hack',
    name: 'The Indian Express (Education Desk)',
    description: 'Published announcements for national engineering competitions & hackathons',
    categories: ['Hackathons', 'Competitions'],
    status: 'Connected',
    lastSyncedText: 'Seeded 14 Oct 2026',
    eventsFoundCount: 1,
    autoSyncEnabled: false,
    sourceType: 'website',
    url: 'https://indianexpress.com/article/education/iit-bombay-rosatom-launch-atomic-hack-india-2026-registration-closes-prizes-internship-opportunity-how-to-apply-10915719/',
    logoType: 'custom-website'
  }
];

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

