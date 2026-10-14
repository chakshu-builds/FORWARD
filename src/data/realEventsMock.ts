/**
 * Real-event seed dataset for the current UI.
 *
 * These are STATIC SEED/MOCK RECORDS compiled from publicly visible event listings
 * checked on 14 Oct 2026. They are NOT a live scraper or verified live database.
 * Source links are retained so the UI can show users where each record came from.
 *
 * Unknown registration deadlines, end times, or venues are deliberately left blank
 * instead of being fabricated. Re-check source links before relying on any details.
 *
 * Drop this file where your existing constants file lives, then update imports.
 */
import type { EventItem, SourceItem } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-winter-of-code-2026',
    title: 'Winter of Code 2026',
    organizer: 'Winter of Code / Devfolio listing',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '',
    eventStartDate: '2026-10-15T00:00:00',
    eventEndDate: '2026-12-01T23:59:00',
    timeRange: '15 Oct – 1 Dec 2026 · Online',
    dateLabel: { month: 'OCT', day: '15' },
    reportingTime: 'Online',
    venue: 'Online',
    isOnline: true,
    registrationUrl: 'https://winter-of-code-4.devfolio.co/',
    summary: 'An open-source contribution program for students and developers to work with real projects, fix issues, improve documentation, and collaborate with maintainers. Public listing states the program runs from 15 October to 1 December 2026.',
    daysRemaining: 1,
    deadlineFormatted: 'Not published on listing',
    deadlineDaysLeft: -1,
    timelineGroup: 'Tomorrow',
    isUrgent: false,
    thumbnailType: 'code-create',
    tags: ['Open Source', 'Developer Program', 'Online'],
    sourceNotice: {
      id: 'src-woc-2026',
      channel: 'Web Link',
      receivedAt: '2026-10-14',
      senderOrSource: 'Devfolio — Winter of Code 2026',
      rawSnippet: 'Runs from Oct 15 – Dec 1, 2026. Online. Open-source contribution program.',
      confidenceScore: 0.98
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-woc-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from public Devfolio event page; registration deadline not listed in captured details.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-codestorm-futureforge-2026',
    title: 'CodeStorm 2026: FutureForge',
    organizer: 'Team CodeStorm',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '2026-10-15T23:59:00',
    eventStartDate: '2026-08-01T00:00:00',
    eventEndDate: '2026-10-15T23:59:00',
    timeRange: 'Online · Ends 15 Oct 2026',
    dateLabel: { month: 'OCT', day: '15' },
    reportingTime: 'Online',
    venue: 'Online (Discord community)',
    isOnline: true,
    registrationUrl: 'https://codestorm-futureforge.devfolio.co/',
    summary: 'Student-focused open-innovation hackathon covering AI, web development, cybersecurity, edtech, sustainability, mobile applications, productivity tools, and other technology solutions. The official listing states it runs 1 August – 15 October 2026.',
    daysRemaining: 0,
    deadlineFormatted: '15 Oct 2026',
    deadlineDaysLeft: 1,
    timelineGroup: 'Today',
    isUrgent: true,
    thumbnailType: 'product-sprint',
    tags: ['Hackathon', 'AI', 'Web Development', 'Cybersecurity'],
    sourceNotice: {
      id: 'src-codestorm-2026',
      channel: 'Web Link',
      receivedAt: '2026-10-14',
      senderOrSource: 'Devfolio — CodeStorm 2026: FutureForge',
      rawSnippet: 'Runs from Aug 1 – Oct 15, 2026; online through the community Discord.',
      confidenceScore: 0.98
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-codestorm-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from public Devfolio event page.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-atomic-hack-india-2026',
    title: 'Atomic Hack India 2026',
    organizer: 'IIT Bombay, Rosatom and partner organisations',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '2026-10-20T23:59:00',
    eventStartDate: '2026-10-20T00:00:00',
    eventEndDate: '2026-12-06T23:59:00',
    timeRange: 'Online qualification: 20–28 Oct · Finale: 4–6 Dec 2026',
    dateLabel: { month: 'OCT', day: '20' },
    reportingTime: 'Check official registration page',
    venue: 'Online qualification; grand finale at IIT Bombay, Mumbai',
    isOnline: false,
    registrationUrl: 'https://indianexpress.com/article/education/iit-bombay-rosatom-launch-atomic-hack-india-2026-registration-closes-prizes-internship-opportunity-how-to-apply-10915719/',
    summary: 'National engineering innovation challenge focused on power-grid protection for a 220 kV transmission line integrating nuclear and renewable energy. The published report says registration closes 20 October; online qualification runs 20–28 October, with a 48-hour finale at IIT Bombay from 4–6 December.',
    daysRemaining: 6,
    deadlineFormatted: '20 Oct 2026',
    deadlineDaysLeft: 6,
    timelineGroup: 'This Week',
    isUrgent: true,
    thumbnailType: 'research-symposium',
    tags: ['Hackathon', 'Energy', 'Engineering', 'Digital Twin'],
    sourceNotice: {
      id: 'src-atomic-hack-2026',
      channel: 'Web Link',
      receivedAt: '2026-10-14',
      senderOrSource: 'The Indian Express — education report',
      rawSnippet: 'Registration open until 20 Oct 2026. Online qualification 20–28 Oct; grand finale at IIT Bombay 4–6 Dec.',
      confidenceScore: 0.96
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-atomic-1', timestamp: '2026-10-14', changeType: 'Created', description: "Seeded from a published report. Follow the organiser's official registration route for final details.", actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-hack-on-hills-8',
    title: 'Hack On Hills 8.0',
    organizer: 'App Team, NIT Hamirpur',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '',
    eventStartDate: '2026-10-31T00:00:00',
    eventEndDate: '2026-11-02T23:59:00',
    timeRange: '31 Oct – 2 Nov 2026 · Listing date needs confirmation',
    dateLabel: { month: 'OCT', day: '31' },
    reportingTime: 'To be confirmed',
    venue: 'NIT Hamirpur, Himachal Pradesh',
    isOnline: false,
    registrationUrl: 'https://hackonhills8.devfolio.co/',
    summary: 'A 48-hour student hackathon focused on AI and autonomous agents, blockchain/Web3, sustainability, social impact, and open innovation. Note: the page header shows 31 Oct–2 Nov, while body copy also says dates are to be announced; confirm the schedule with organisers.',
    daysRemaining: 17,
    deadlineFormatted: 'Not published on listing',
    deadlineDaysLeft: -1,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'product-sprint',
    tags: ['Hackathon', 'AI Agents', 'Web3', 'North India'],
    sourceNotice: {
      id: 'src-hack-on-hills-8',
      channel: 'Web Link',
      receivedAt: '2026-10-14',
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
    id: 'evt-hacker-house-goa-2026',
    title: 'HACKER HOUSE GOA 2026',
    organizer: 'Hacker House Goa organisers',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '',
    eventStartDate: '2026-10-28T00:00:00',
    eventEndDate: '',
    timeRange: 'Starts 28 Oct 2026 · Duration not confirmed',
    dateLabel: { month: 'OCT', day: '28' },
    reportingTime: 'To be confirmed',
    venue: 'Goa, India',
    isOnline: false,
    registrationUrl: 'https://hacker-house-goa-2026.devfolio.co/',
    summary: 'An in-person hackathon listed on Devfolio with Blockchain and AI themes. The listing shows a 28 October 2026 start; registration deadline and duration were not present in the captured listing.',
    daysRemaining: 14,
    deadlineFormatted: 'Not published on listing',
    deadlineDaysLeft: -1,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'unstop-ui',
    tags: ['Hackathon', 'AI', 'Blockchain', 'Goa'],
    sourceNotice: {
      id: 'src-hacker-house-goa',
      channel: 'Web Link',
      receivedAt: '2026-10-14',
      senderOrSource: 'Devfolio — HACKER HOUSE GOA 2026',
      rawSnippet: 'Public listing shows Offline, Open, Starts 28/10/26; Blockchain and AI themes.',
      confidenceScore: 0.91
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-hhg-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from public Devfolio listing; missing deadline and duration left blank.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-innosprint-20',
    title: 'Innosprint 2.0',
    organizer: 'Innosprint organisers',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '',
    eventStartDate: '2026-10-24T00:00:00',
    eventEndDate: '',
    timeRange: 'Starts 24 Oct 2026 · Duration not confirmed',
    dateLabel: { month: 'OCT', day: '24' },
    reportingTime: 'To be confirmed',
    venue: 'Offline venue not specified in captured listing',
    isOnline: false,
    registrationUrl: 'https://innosprint-3.devfolio.co/',
    summary: 'An in-person hackathon listed as open on Devfolio, starting 24 October 2026. The captured listing does not provide a registration deadline, detailed description, or venue.',
    daysRemaining: 10,
    deadlineFormatted: 'Not published on listing',
    deadlineDaysLeft: -1,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'code-create',
    tags: ['Hackathon', 'Innovation'],
    sourceNotice: {
      id: 'src-innosprint-20',
      channel: 'Web Link',
      receivedAt: '2026-10-14',
      senderOrSource: 'Devfolio — Innosprint 2.0',
      rawSnippet: 'Public listing shows Offline, Open, Starts 24/10/26.',
      confidenceScore: 0.87
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-innosprint-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from public Devfolio listing; unspecified fields left blank.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-search-central-live-bengaluru-2026',
    title: 'Search Central Live Bengaluru 2026',
    organizer: 'Google Search Central',
    category: 'Conferences',
    status: 'Open',
    registrationDeadline: '',
    eventStartDate: '2026-10-30T00:00:00',
    eventEndDate: '',
    timeRange: '30 Oct 2026 · Time not listed in captured directory',
    dateLabel: { month: 'OCT', day: '30' },
    reportingTime: 'Check official event page',
    venue: 'Bengaluru, India',
    isOnline: false,
    registrationUrl: 'https://developers.google.com/search/events',
    summary: 'Google Search Central event in Bengaluru covering Search, crawling and indexing, structured data, search quality, Q&A, and networking. The official event directory lists the date as 30 October 2026.',
    daysRemaining: 16,
    deadlineFormatted: 'Not published on directory',
    deadlineDaysLeft: -1,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'google-winter',
    tags: ['Conference', 'Google', 'Search', 'Bengaluru'],
    sourceNotice: {
      id: 'src-search-central-bengaluru',
      channel: 'Web Link',
      receivedAt: '2026-10-14',
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
    id: 'evt-search-fundamentals-gurugram-2026',
    title: 'Search Fundamentals for News Sites Gurugram 2026',
    organizer: 'Google Search Central',
    category: 'Workshops',
    status: 'Open',
    registrationDeadline: '',
    eventStartDate: '2026-11-02T00:00:00',
    eventEndDate: '',
    timeRange: '2 Nov 2026 · Time not listed in captured directory',
    dateLabel: { month: 'NOV', day: '02' },
    reportingTime: 'Check official event page',
    venue: 'Gurugram, India',
    isOnline: false,
    registrationUrl: 'https://developers.google.com/search/events',
    summary: 'A Google Search Central event for news sites in Gurugram. The official directory lists presentations and Q&A with Gary Illyes and Cherry Prommawin on 2 November 2026.',
    daysRemaining: 19,
    deadlineFormatted: 'Not published on directory',
    deadlineDaysLeft: -1,
    timelineGroup: 'Next Month',
    isUrgent: false,
    thumbnailType: 'research-symposium',
    tags: ['Workshop', 'Google', 'SEO', 'Gurugram'],
    sourceNotice: {
      id: 'src-search-fundamentals-gurugram',
      channel: 'Web Link',
      receivedAt: '2026-10-14',
      senderOrSource: 'Google Search Central official events directory',
      rawSnippet: 'Search Fundamentals for News Sites Gurugram 2026 — November 2, 2026.',
      confidenceScore: 0.98
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-sfg-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from Google Search Central official event directory.', actor: 'Seed Dataset' }
    ]
  },
  {
    id: 'evt-q-hack-india-2026',
    title: 'Q-HACK INDIA 2026',
    organizer: 'Q-HACK INDIA organisers',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '',
    eventStartDate: '2026-10-30T00:00:00',
    eventEndDate: '',
    timeRange: 'Starts 30 Oct 2026 · Duration not confirmed',
    dateLabel: { month: 'OCT', day: '30' },
    reportingTime: 'To be confirmed',
    venue: 'Offline venue not specified in captured listing',
    isOnline: false,
    registrationUrl: 'https://based-india.devfolio.co/hackathons',
    summary: 'Q-HACK INDIA 2026 appears in Devfolio’s public open-hackathon directory with an offline start date of 30 October 2026. The directory snapshot did not provide the direct event page or registration deadline.',
    daysRemaining: 16,
    deadlineFormatted: 'Not published on listing',
    deadlineDaysLeft: -1,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'product-sprint',
    tags: ['Hackathon', 'India'],
    sourceNotice: {
      id: 'src-qhack-india',
      channel: 'Web Link',
      receivedAt: '2026-10-14',
      senderOrSource: 'Devfolio public hackathon directory',
      rawSnippet: 'Q-HACK INDIA 2026 — Offline, Open, Starts 30/10/26.',
      confidenceScore: 0.82
    },
    tasks: [],
    changeHistory: [
      { id: 'hist-qhi-1', timestamp: '2026-10-14', changeType: 'Created', description: 'Seeded from Devfolio directory; generic directory link used until a direct listing URL is confirmed.', actor: 'Seed Dataset' }
    ]
  }
];

/**
 * Source entries below are seed metadata for UI display only.
 * "Connected" means a source has a known public listing URL, NOT an API integration.
 */
export const INITIAL_SOURCES: SourceItem[] = [
  {
    id: 'src-devfolio',
    name: 'Devfolio',
    description: 'Public hackathon listings and individual event pages',
    categories: ['Hackathons', 'Competitions'],
    status: 'Connected',
    lastSyncedText: 'Seeded 14 Oct 2026',
    eventsFoundCount: 6,
    autoSyncEnabled: false,
    sourceType: 'platform',
    url: 'https://based-india.devfolio.co/hackathons',
    logoType: 'devfolio'
  },
  {
    id: 'src-google-search-central',
    name: 'Google Search Central Events',
    description: 'Official Google Search Central events directory',
    categories: ['Workshops', 'Conferences'],
    status: 'Connected',
    lastSyncedText: 'Seeded 14 Oct 2026',
    eventsFoundCount: 2,
    autoSyncEnabled: false,
    sourceType: 'platform',
    url: 'https://developers.google.com/search/events',
    logoType: 'google-developers'
  },
  {
    id: 'src-indian-express-atomic-hack',
    name: 'The Indian Express (event announcement)',
    description: 'Published announcement used to seed Atomic Hack India dates and description',
    categories: ['Hackathons'],
    status: 'Connected',
    lastSyncedText: 'Seeded 14 Oct 2026',
    eventsFoundCount: 1,
    autoSyncEnabled: false,
    sourceType: 'website',
    url: 'https://indianexpress.com/article/education/iit-bombay-rosatom-launch-atomic-hack-india-2026-registration-closes-prizes-internship-opportunity-how-to-apply-10915719/',
    logoType: 'custom-website'
  }
];
