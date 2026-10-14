import type { EventItem, ExtractionDraft, AttentionItem, RecentlyAddedItem, PrepTask, SourceItem, SourceActivityItem, UserProfile, NotificationSettings, UserPreferences } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-product-sprint',
    title: 'Product Sprint',
    organizer: 'TechVerse',
    category: 'Hackathons',
    status: 'In Progress',
    registrationDeadline: '2026-10-14T09:30:00',
    eventStartDate: '2026-10-14T10:00:00',
    eventEndDate: '2026-10-14T17:00:00',
    timeRange: '10:00 AM – 5:00 PM',
    dateLabel: { month: 'OCT', day: '14' },
    reportingTime: '09:45 AM IST',
    venue: 'VIPS, Delhi',
    isOnline: false,
    registrationUrl: 'https://techverse.dev/product-sprint-2026',
    summary: 'A fast-paced 1-day product incubation and UI/UX design sprint. Build working prototypes solving campus logistics and peer collaboration problems.',
    daysRemaining: 0,
    deadlineFormatted: '16 Oct 2026',
    deadlineDaysLeft: 2,
    timelineGroup: 'Today',
    isUrgent: true,
    thumbnailType: 'product-sprint',
    tags: ['Hackathon', 'Product'],
    sourceNotice: {
      id: 'src-ps-1',
      channel: 'WhatsApp',
      receivedAt: '2026-10-12 16:30',
      senderOrSource: 'VIPS Tech Circle Official',
      rawSnippet: '🚀 Product Sprint starts today at VIPS, Delhi! Registration check-in opens at 9:45 AM. Teams must report to Lab 4.',
      confidenceScore: 0.98
    },
    tasks: [
      { id: 't-1', title: 'Register for Product Sprint', dueDate: '2026-10-14', completed: true, priority: 'High' },
      { id: 't-1b', title: 'Confirm team seating in Lab 4', dueDate: '2026-10-14', completed: true, priority: 'Medium' }
    ],
    changeHistory: [
      { id: 'h-1', timestamp: '2026-10-12 16:35', changeType: 'Created', description: 'Extracted from VIPS Tech Circle circular', actor: 'Auto-Extracted' },
      { id: 'h-2', timestamp: '2026-10-14 09:15', changeType: 'Status Changed', description: 'Marked In Progress upon morning check-in', actor: 'User Manual' }
    ]
  },
  {
    id: 'evt-ai-for-good-workshop',
    title: 'AI for Good Workshop',
    organizer: 'Eonics Club',
    category: 'Workshops',
    status: 'Registered',
    registrationDeadline: '2026-10-19T23:59:00',
    eventStartDate: '2026-10-14T14:00:00',
    eventEndDate: '2026-10-14T16:00:00',
    timeRange: '2:00 PM – 4:00 PM',
    dateLabel: { month: 'OCT', day: '14' },
    reportingTime: '01:45 PM IST',
    venue: 'Online',
    isOnline: true,
    registrationUrl: 'https://eonics.club/ai-for-good',
    summary: 'Hands-on workshop exploring open source LLMs and accessibility solutions for speech and visual impairments.',
    daysRemaining: 5,
    deadlineFormatted: '19 Oct 2026',
    deadlineDaysLeft: 5,
    timelineGroup: 'Today',
    isUrgent: false,
    thumbnailType: 'ai-good',
    tags: ['Workshop', 'AI'],
    sourceNotice: {
      id: 'src-ag-1',
      channel: 'Discord',
      receivedAt: '2026-10-13 14:00',
      senderOrSource: '#workshops in Eonics Discord',
      rawSnippet: 'AI for Good Workshop kicks off online today at 2:00 PM. Registered attendees check email for Google Meet links.',
      confidenceScore: 0.99
    },
    tasks: [],
    changeHistory: [
      { id: 'h-ag-1', timestamp: '2026-10-13 14:05', changeType: 'Created', description: 'Extracted from Discord announcement', actor: 'Auto-Extracted' }
    ]
  },
  {
    id: 'evt-build-the-next-big-ui',
    title: 'Build The Next Big UI',
    organizer: 'Unstop',
    category: 'Competitions',
    status: 'Registered',
    registrationDeadline: '2026-10-18T18:00:00',
    eventStartDate: '2026-10-15T11:00:00',
    eventEndDate: '2026-10-15T14:00:00',
    timeRange: '11:00 AM – 2:00 PM',
    dateLabel: { month: 'OCT', day: '15' },
    reportingTime: '10:45 AM IST',
    venue: 'Online',
    isOnline: true,
    registrationUrl: 'https://unstop.com/competitions/build-the-next-big-ui',
    summary: 'National design challenge to create responsive dashboard components, design systems, and fluid micro-interactions.',
    daysRemaining: 1,
    deadlineFormatted: '18 Oct 2026',
    deadlineDaysLeft: 3,
    timelineGroup: 'Tomorrow',
    isUrgent: true,
    thumbnailType: 'unstop-ui',
    tags: ['Competition', 'Design'],
    sourceNotice: {
      id: 'src-ui-1',
      channel: 'Web Link',
      receivedAt: '2026-10-10 14:00',
      senderOrSource: 'Unstop Design Portal',
      rawSnippet: 'Build The Next Big UI: Online submission window closes on Oct 15 at 2:00 PM. Figma prototype and Loom demo video required.',
      confidenceScore: 0.99
    },
    tasks: [
      { id: 't-2', title: 'Complete application for Build The Next Big UI', dueDate: '2026-10-15', completed: true, priority: 'High' },
      { id: 't-2b', title: 'Record 2-minute Loom walkthrough of UI components', dueDate: '2026-10-15', completed: false, priority: 'Medium' }
    ],
    changeHistory: [
      { id: 'h-3', timestamp: '2026-10-10 14:05', changeType: 'Created', description: 'Captured from Unstop competition link', actor: 'Auto-Extracted' },
      { id: 'h-4', timestamp: '2026-10-13 18:00', changeType: 'Status Changed', description: 'Registered after team submission approval', actor: 'User Manual' }
    ]
  },
  {
    id: 'evt-google-winter-internship',
    title: 'Google Winter Internship',
    organizer: 'Google',
    category: 'Internships',
    status: 'Interested',
    registrationDeadline: '2026-10-20T23:59:00',
    eventEndDate: '2026-10-20T18:00:00',
    reportingTime: 'Online Portal Open',
    venue: 'Online',
    isOnline: true,
    registrationUrl: 'https://careers.google.com/students/winter-2027',
    summary: 'Applications open for Software Engineering Winter Internships (January – June 2027 cycle) across Bangalore and Hyderabad engineering campuses.',
    daysRemaining: 4,
    deadlineFormatted: '30 Oct 2026',
    deadlineDaysLeft: 12,
    timelineGroup: 'This Week',
    timeRange: 'All day',
    dateLabel: { month: 'OCT', day: '18' },
    eventStartDate: '2026-10-18T09:00:00',
    isUrgent: false,
    thumbnailType: 'google-winter',
    tags: ['Internship', 'Career'],
    sourceNotice: {
      id: 'src-gw-1',
      channel: 'Email',
      receivedAt: '2026-10-13 10:00',
      senderOrSource: 'university-relations@google.com',
      rawSnippet: 'Notice: Google Winter 2027 Internship application deadline updated. All eligible 3rd and 4th year students must apply by 20 Oct 2026.',
      confidenceScore: 0.97
    },
    tasks: [
      { id: 't-4', title: 'Prepare for Google Winter Internship', dueDate: '2026-10-20', completed: false, priority: 'High' },
      { id: 't-4b', title: 'Update resume with recent open source PRs and DSA projects', dueDate: '2026-10-19', completed: false, priority: 'Medium' }
    ],
    changeHistory: [
      { id: 'h-5', timestamp: '2026-10-13 10:05', changeType: 'Created', description: 'Ingested from university placement circular email', actor: 'Auto-Extracted' }
    ]
  },
  {
    id: 'evt-research-symposium',
    title: 'Research Symposium',
    organizer: 'IIIT Delhi',
    category: 'Conferences',
    status: 'Open',
    registrationDeadline: '2026-11-03T23:59:00',
    eventStartDate: '2026-10-19T10:00:00',
    eventEndDate: '2026-10-19T14:00:00',
    timeRange: '10:00 AM – 2:00 PM',
    dateLabel: { month: 'OCT', day: '19' },
    reportingTime: '09:30 AM IST',
    venue: 'IIIT Delhi',
    isOnline: false,
    registrationUrl: 'https://iiitd.ac.in/symposium-2026',
    summary: 'International symposium on Distributed Systems and Machine Learning architectures with keynote speakers from top labs.',
    daysRemaining: 5,
    deadlineFormatted: '3 Nov 2026',
    deadlineDaysLeft: 20,
    timelineGroup: 'This Week',
    isUrgent: false,
    thumbnailType: 'research-symposium',
    tags: ['Conference', 'Research'],
    sourceNotice: {
      id: 'src-rs-1',
      channel: 'Web Link',
      receivedAt: '2026-10-14 10:45',
      senderOrSource: 'IIITD Department Portal',
      rawSnippet: 'Student delegate registration for Research Symposium open until Nov 3.',
      confidenceScore: 0.95
    },
    tasks: [],
    changeHistory: [
      { id: 'h-12', timestamp: '2026-10-14 10:50', changeType: 'Created', description: 'Extracted from university research portal', actor: 'Auto-Extracted' }
    ]
  },
  {
    id: 'evt-developer-summit',
    title: 'Developer Summit',
    organizer: 'GDSC Delhi',
    category: 'Conferences',
    status: 'Open',
    registrationDeadline: '2026-10-25T10:00:00',
    eventStartDate: '2026-10-20T10:00:00',
    eventEndDate: '2026-10-20T18:00:00',
    timeRange: '10:00 AM – 6:00 PM',
    dateLabel: { month: 'OCT', day: '20' },
    reportingTime: '09:30 AM IST',
    venue: 'Bengaluru',
    isOnline: false,
    registrationUrl: 'https://gdsc.community.dev/events/delhi-summit-2026',
    summary: 'Annual Google Developer Student Clubs Summit with keynotes on Cloud Native architectures, GenAI APIs, and system design patterns.',
    daysRemaining: 6,
    deadlineFormatted: '25 Oct 2026',
    deadlineDaysLeft: 11,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'developer-summit',
    tags: ['Conference', 'Development'],
    conflict: {
      id: 'conf-ds-1',
      field: 'event_date',
      fieldLabel: 'Event Date & Schedule',
      currentValue: '25 Oct 2026, 10:00 AM – 6:00 PM',
      currentSource: 'Initial Meetup Poster (Oct 08)',
      currentSourceDate: '2026-10-08',
      newValue: '28 Oct 2026, 09:30 AM – 5:30 PM',
      newSource: 'Faculty Coordinator WhatsApp Notice (Oct 14, 2h ago)',
      newSourceDate: '2026-10-14',
      status: 'Pending',
      explanation: 'Faculty coordinator notified of date shift from 25 Oct to 28 Oct due to semester midterm examinations.'
    },
    sourceNotice: {
      id: 'src-ds-1',
      channel: 'Discord',
      receivedAt: '2026-10-14 14:00',
      senderOrSource: '#announcements in GDSC Delhi Discord',
      rawSnippet: '⚠️ Attention: Developer Summit schedule updated. Check portal for adjusted timing and registration status.',
      confidenceScore: 0.94
    },
    tasks: [
      { id: 't-3', title: 'Review conflicting date (Developer Summit)', dueDate: '2026-10-16', completed: false, priority: 'High' }
    ],
    changeHistory: [
      { id: 'h-6', timestamp: '2026-10-08 11:20', changeType: 'Created', description: 'Extracted from GDSC community page', actor: 'Auto-Extracted' },
      { id: 'h-7', timestamp: '2026-10-14 14:02', changeType: 'Field Updated', description: 'Discrepancy flagged: conflicting event date detected', actor: 'Reconciliation Engine' }
    ]
  },
  {
    id: 'evt-innovate-for-bharat',
    title: 'Innovate for Bharat',
    organizer: 'IIT Delhi',
    category: 'Hackathons',
    status: 'Open',
    registrationDeadline: '2026-10-30T23:59:00',
    eventStartDate: '2026-11-02T09:00:00',
    eventEndDate: '2026-11-03T18:00:00',
    timeRange: 'All day',
    dateLabel: { month: 'OCT', day: '25' },
    reportingTime: '08:30 AM IST',
    venue: 'IIT Delhi',
    isOnline: false,
    registrationUrl: 'https://iitd.ac.in/innovate-for-bharat',
    summary: 'Flagship national hackathon solving grassroots problems in public health, education accessibility, and rural supply chains.',
    daysRemaining: 19,
    deadlineFormatted: '2 Nov 2026',
    deadlineDaysLeft: 19,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'innovate-bharat',
    tags: ['Hackathon', 'Social Impact'],
    conflict: {
      id: 'conf-ib-1',
      field: 'venue',
      fieldLabel: 'Reporting Venue',
      currentValue: 'Seminar Hall 1, Main Campus',
      currentSource: 'Initial Circular PDF',
      currentSourceDate: '2026-10-05',
      newValue: 'Dogra Hall & Senate Arcade, IIT Delhi',
      newSource: 'IITD Academic Circular #44',
      newSourceDate: '2026-10-13',
      status: 'Pending',
      explanation: 'Relocated to Dogra Hall to accommodate 500+ participants.'
    },
    sourceNotice: {
      id: 'src-ib-1',
      channel: 'PDF Flyer',
      receivedAt: '2026-10-13 18:30',
      senderOrSource: 'IITD_Innovate_Circular_v2.pdf',
      rawSnippet: 'Innovate for Bharat: Updated venue is Dogra Hall, IIT Delhi. 2 Nov 2026 kickoff.',
      confidenceScore: 0.98
    },
    tasks: [
      { id: 't-5', title: 'Check updated venue for Innovate for Bharat', dueDate: '2026-10-25', completed: false, priority: 'Medium' }
    ],
    changeHistory: [
      { id: 'h-8', timestamp: '2026-10-05 12:00', changeType: 'Created', description: 'Extracted from noticeboard flyer', actor: 'Auto-Extracted' }
    ]
  },
  {
    id: 'evt-tech-conclave-2026',
    title: 'Tech Conclave 2026',
    organizer: 'VIPS-TC',
    category: 'Conferences',
    status: 'Not Registered',
    registrationDeadline: '2026-11-08T23:59:00',
    eventStartDate: '2026-10-28T11:00:00',
    eventEndDate: '2026-10-28T16:00:00',
    timeRange: '11:00 AM – 4:00 PM',
    dateLabel: { month: 'OCT', day: '28' },
    reportingTime: '10:30 AM IST',
    venue: 'VIPS, Delhi',
    isOnline: false,
    registrationUrl: 'https://vips.edu/tech-conclave',
    summary: 'Annual research conclave showcasing student publications, patents, and faculty-sponsored deeptech startups.',
    daysRemaining: 25,
    deadlineFormatted: '8 Nov 2026',
    deadlineDaysLeft: 25,
    timelineGroup: 'Later This Month',
    isUrgent: false,
    thumbnailType: 'code-create',
    tags: ['Conference', 'Technology'],
    sourceNotice: {
      id: 'src-tc-1',
      channel: 'WhatsApp',
      receivedAt: '2026-10-14 11:00',
      senderOrSource: 'Inter-College Tech Broadcast',
      rawSnippet: 'Tech Conclave 2026 scheduled for Oct 27. Registration deadline Oct 22. Venue will be confirmed shortly in follow-up notice.',
      confidenceScore: 0.88
    },
    tasks: [],
    changeHistory: [
      { id: 'h-9', timestamp: '2026-10-14 11:05', changeType: 'Created', description: 'Extracted with missing venue flagged', actor: 'Auto-Extracted' }
    ]
  },
  {
    id: 'evt-shepreneurs-2026',
    title: 'ShePreneurs 2026',
    organizer: 'Campus Startup Challenge',
    category: 'Competitions',
    status: 'Open',
    registrationDeadline: '2026-10-29T23:59:00',
    eventStartDate: '2026-11-05T09:30:00',
    eventEndDate: '2026-11-06T18:00:00',
    timeRange: '5 Nov 2026',
    dateLabel: { month: 'NOV', day: '05' },
    reportingTime: '09:00 AM IST',
    venue: 'Incubation Wing Auditorium',
    isOnline: false,
    registrationUrl: 'https://shepreneurs.org/apply',
    summary: 'Seed funding pitch challenge supporting female campus founders and student-led ventures with mentorship and micro-grants.',
    daysRemaining: 15,
    isUrgent: false,
    thumbnailType: 'shepreneurs',
    tags: ['Competition', 'Startup'],
    sourceNotice: {
      id: 'src-sp-1',
      channel: 'Email',
      receivedAt: '2026-10-14 15:30',
      senderOrSource: 'startup-cell@campus.edu',
      rawSnippet: 'ShePreneurs 2026 registration is now live. Submit executive summary before Oct 29.',
      confidenceScore: 0.99
    },
    tasks: [],
    changeHistory: [
      { id: 'h-10', timestamp: '2026-10-14 15:35', changeType: 'Created', description: 'Extracted from campus newsletter email', actor: 'Auto-Extracted' }
    ]
  },
  {
    id: 'evt-code-and-create',
    title: 'Code & Create',
    organizer: 'VIPS Hackathon',
    category: 'Hackathons',
    status: 'Registered',
    registrationDeadline: '2026-10-18T23:59:00',
    eventStartDate: '2026-10-24T09:00:00',
    eventEndDate: '2026-10-25T16:00:00',
    timeRange: '24 Oct 2026',
    dateLabel: { month: 'OCT', day: '24' },
    reportingTime: '08:45 AM IST',
    venue: 'VIPS Central Hall',
    isOnline: false,
    registrationUrl: 'https://vips.edu/code-create',
    summary: 'Weekend web development hackathon featuring mentor tracks in Web3, accessible interfaces, and edge computing.',
    daysRemaining: 4,
    isUrgent: false,
    thumbnailType: 'code-create',
    tags: ['Hackathon', 'WebDev'],
    sourceNotice: {
      id: 'src-cc-1',
      channel: 'Discord',
      receivedAt: '2026-10-14 13:45',
      senderOrSource: '#hackathons in VIPS Devs',
      rawSnippet: 'Code & Create hackathon registered teams list confirmed. Event kicks off Oct 24 in Central Hall.',
      confidenceScore: 0.96
    },
    tasks: [],
    changeHistory: [
      { id: 'h-11', timestamp: '2026-10-14 13:50', changeType: 'Created', description: 'Extracted from Discord channel notice', actor: 'Auto-Extracted' }
    ]
  },
  {
    id: 'evt-research-symposium',
    title: 'Research Symposium',
    organizer: 'IIIT Delhi',
    category: 'Conferences',
    status: 'Registered',
    registrationDeadline: '2026-10-17T23:59:00',
    eventStartDate: '2026-10-29T09:00:00',
    eventEndDate: '2026-10-30T17:00:00',
    timeRange: '29 Oct 2026',
    dateLabel: { month: 'OCT', day: '29' },
    reportingTime: '08:30 AM IST',
    venue: 'IIIT Delhi R&D Block',
    isOnline: false,
    registrationUrl: 'https://iiitd.ac.in/symposium-2026',
    summary: 'International symposium on Distributed Systems and Machine Learning architectures with keynote speakers from top labs.',
    daysRemaining: 3,
    isUrgent: true,
    thumbnailType: 'research-symposium',
    tags: ['Conference', 'Research'],
    sourceNotice: {
      id: 'src-rs-1',
      channel: 'Web Link',
      receivedAt: '2026-10-14 10:45',
      senderOrSource: 'IIITD Department Portal',
      rawSnippet: 'Student delegate registration for Research Symposium open until Oct 17.',
      confidenceScore: 0.95
    },
    tasks: [],
    changeHistory: [
      { id: 'h-12', timestamp: '2026-10-14 10:50', changeType: 'Created', description: 'Extracted from university research portal', actor: 'Auto-Extracted' }
    ]
  },
  {
    id: 'evt-hackshift-2026',
    title: 'HackShift 2026',
    organizer: 'ACM Student Chapter',
    category: 'Hackathons',
    status: 'In Progress',
    registrationDeadline: '2026-10-16T23:59:00',
    eventStartDate: '2026-10-23T09:00:00',
    eventEndDate: '2026-10-24T20:00:00',
    timeRange: '23 Oct 2026',
    dateLabel: { month: 'OCT', day: '23' },
    reportingTime: '08:30 AM IST',
    venue: 'Campus Tech Park',
    isOnline: false,
    registrationUrl: 'https://devfolio.co/hackathons/hackshift-2026',
    summary: 'Flagship national hackathon solving campus journey challenges with agentic workflows.',
    daysRemaining: 2,
    isUrgent: true,
    thumbnailType: 'product-sprint',
    tags: ['Hackathon', 'Agents'],
    sourceNotice: {
      id: 'src-hs-1',
      channel: 'WhatsApp',
      receivedAt: '2026-10-12 11:00',
      senderOrSource: 'ACM Official Broadcast',
      rawSnippet: 'HackShift 2026 teams: check-in confirmed for Oct 23.',
      confidenceScore: 0.99
    },
    tasks: [],
    changeHistory: []
  },
  {
    id: 'evt-ai-robotics-workshop',
    title: 'AI & Robotics Hands-on Lab',
    organizer: 'Robotics Club',
    category: 'Workshops',
    status: 'Interested',
    registrationDeadline: '2026-10-21T18:00:00',
    eventStartDate: '2026-10-26T14:00:00',
    eventEndDate: '2026-10-26T18:00:00',
    timeRange: '26 Oct 2026',
    dateLabel: { month: 'OCT', day: '26' },
    reportingTime: '01:45 PM IST',
    venue: 'Block D Lab 2',
    isOnline: false,
    registrationUrl: 'https://robotics-campus.edu/lab',
    summary: 'Hands-on ROS 2 workshop on autonomous navigation and lidar mapping on TurtleBot hardware.',
    daysRemaining: 7,
    isUrgent: false,
    thumbnailType: 'unstop-ui',
    tags: ['Workshop', 'Robotics'],
    sourceNotice: {
      id: 'src-ar-1',
      channel: 'PDF Flyer',
      receivedAt: '2026-10-11 12:00',
      senderOrSource: 'Robotics_Lab_Poster.pdf',
      rawSnippet: 'Limited seats for hands-on ROS 2 session.',
      confidenceScore: 0.92
    },
    tasks: [],
    changeHistory: []
  },
  {
    id: 'evt-cloud-native-devops',
    title: 'Cloud Native DevOps Bootcamp',
    organizer: 'GDG on Campus',
    category: 'Workshops',
    status: 'Registered',
    registrationDeadline: '2026-10-19T23:59:00',
    eventStartDate: '2026-10-31T10:00:00',
    eventEndDate: '2026-11-01T16:00:00',
    timeRange: '31 Oct 2026',
    dateLabel: { month: 'OCT', day: '31' },
    reportingTime: '09:30 AM IST',
    venue: 'Online (Google Meet)',
    isOnline: true,
    registrationUrl: 'https://gdg.community.dev/events/devops-bootcamp',
    summary: 'Docker containers, Kubernetes clusters, and GitHub Actions CI/CD pipelines crash course.',
    daysRemaining: 5,
    isUrgent: false,
    thumbnailType: 'google-winter',
    tags: ['Workshop', 'Cloud'],
    sourceNotice: {
      id: 'src-cn-1',
      channel: 'Discord',
      receivedAt: '2026-10-13 19:00',
      senderOrSource: '#cloud in GDG Discord',
      rawSnippet: 'GCP free credits code provided to all registered participants.',
      confidenceScore: 0.95
    },
    tasks: [],
    changeHistory: []
  }
];

export const INITIAL_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-1',
    type: 'conflict',
    title: 'Conflicting date detected',
    eventTitle: 'Developer Summit',
    eventId: 'evt-developer-summit',
    dateLabel: { month: 'OCT', day: '25' },
    timeAgo: '2 hours ago',
    field: 'event_date',
    explanation: 'This event overlaps with another event in your timeline.',
    conflictingEventId: 'evt-research-symposium',
    conflictingEventTitle: 'Research Symposium',
    conflictingEventDate: '25 Oct 2026',
    conflictingEventTime: '1:00 PM – 4:00 PM',
    status: 'pending'
  },
  {
    id: 'att-2',
    type: 'missing_info',
    title: 'Missing venue information',
    eventTitle: 'Tech Conclave 2026',
    eventId: 'evt-tech-conclave-2026',
    dateLabel: { month: 'OCT', day: '28' },
    timeAgo: '5 hours ago',
    field: 'venue',
    explanation: 'Venue not specified. Please add the venue or online link.',
    status: 'pending'
  },
  {
    id: 'att-3',
    type: 'update',
    title: 'New update available',
    eventTitle: 'Google Winter Internship',
    eventId: 'evt-google-winter-internship',
    dateLabel: { month: 'NOV', day: '02' },
    timeAgo: '1 day ago',
    field: 'registrationDeadline',
    previousValue: '20 Oct 2026',
    proposedValue: '02 Nov 2026',
    explanation: 'Organiser updated the deadline and eligibility criteria.',
    status: 'pending'
  }
];

export const INITIAL_RECENTLY_ADDED: RecentlyAddedItem[] = [
  {
    id: 'rec-1',
    title: 'ShePreneurs 2026',
    organizer: 'Campus Startup Challenge',
    eventId: 'evt-shepreneurs-2026',
    timeAgo: 'Just now',
    thumbnailType: 'shepreneurs'
  },
  {
    id: 'rec-2',
    title: 'Code & Create',
    organizer: 'VIPS Hackathon',
    eventId: 'evt-code-and-create',
    timeAgo: '2h ago',
    thumbnailType: 'code-create'
  },
  {
    id: 'rec-3',
    title: 'Research Symposium',
    organizer: 'IIIT Delhi',
    eventId: 'evt-research-symposium',
    timeAgo: '5h ago',
    thumbnailType: 'research-symposium'
  }
];

export const INITIAL_NEXT_MOVES: PrepTask[] = [
  {
    id: 'task-1',
    title: 'Register for Product Sprint',
    dueDate: '2026-10-14',
    completed: true,
    priority: 'High',
    eventId: 'evt-product-sprint'
  },
  {
    id: 'task-2',
    title: 'Complete application for Build The Next Big UI',
    dueDate: '2026-10-15',
    completed: true,
    priority: 'High',
    eventId: 'evt-build-the-next-big-ui'
  },
  {
    id: 'task-3',
    title: 'Review conflicting date (Developer Summit)',
    dueDate: '2026-10-16',
    completed: false,
    priority: 'High',
    eventId: 'evt-developer-summit'
  },
  {
    id: 'task-4',
    title: 'Prepare for Google Winter Internship',
    dueDate: '2026-10-20',
    completed: false,
    priority: 'Medium',
    eventId: 'evt-google-winter-internship'
  },
  {
    id: 'task-5',
    title: 'Check updated venue for Innovate for Bharat',
    dueDate: '2026-10-25',
    completed: false,
    priority: 'Medium',
    eventId: 'evt-innovate-for-bharat'
  }
];

export const SAMPLE_CAPTURE_PRESETS = {
  textSnippet: `🚨 URGENT UPDATE FOR HACKSHIFT 2026 SHORTLISTED TEAMS!
Dept. of CSE & ACM Student Chapter
Greetings Participants,
Due to university convocation rehearsals, HackShift 2026 finals venue has been relocated:
- Event Dates: April 4 - April 5, 2026
- New Venue: Tech Park Innovation Hall 3 (NOT Main Auditorium)
- Reporting Time: 08:30 AM IST sharp (Gate 4 registration desk)
- Team Size: 3-4 members (ID cards mandatory)
- Confirmation Portal: https://devfolio.co/hackathons/hackshift-2026/checkin
Please ensure all team members confirm their attendance before March 28, 23:59 IST.`,

  flyerName: `HackShift_2026_Official_Circular_V2.pdf`,
  sampleUrl: `https://devfolio.co/hackathons/hackshift-2026`
};

export const SAMPLE_EXTRACTION_RESULT: ExtractionDraft = {
  title: 'HackShift 2026: 36-Hour National Hackathon',
  organizer: 'Dept. of CSE & ACM Student Chapter',
  category: 'Hackathons',
  registrationDeadline: '2026-10-28T23:59:00',
  eventStartDate: '2026-11-04T08:30:00',
  eventEndDate: '2026-11-05T20:00:00',
  reportingTime: '08:30 AM IST',
  venue: 'Tech Park Innovation Hall 3 (Gate 4)',
  registrationUrl: 'https://devfolio.co/hackathons/hackshift-2026/checkin',
  sourceText: 'Due to university convocation rehearsals, HackShift 2026 finals venue has been relocated: New Venue: Tech Park Innovation Hall 3 (NOT Main Auditorium). Reporting Time: 08:30 AM IST sharp. Confirmation deadline: October 28.',
  sourceChannel: 'WhatsApp',
  confidenceScore: 0.96,
  lowConfidenceFields: ['reportingTime'],
  detectedConflictNotice: 'Venue discrepancy: Current record indicates "Main Auditorium, 09:00 AM". New notice specifies "Tech Park Innovation Hall 3, 08:30 AM".'
};

export const INITIAL_SOURCES: SourceItem[] = [
  {
    id: 'src-unstop',
    name: 'Unstop',
    description: 'Hackathons, competitions, internships and more',
    categories: ['Jobs', 'Competitions', 'Internships'],
    status: 'Connected',
    lastSyncedText: '2 hours ago',
    eventsFoundCount: 12,
    autoSyncEnabled: true,
    sourceType: 'platform',
    url: 'https://unstop.com',
    logoType: 'unstop'
  },
  {
    id: 'src-devfolio',
    name: 'Devfolio',
    description: 'Hackathons and builder programmes',
    categories: ['Hackathons', 'Competitions'],
    status: 'Connected',
    lastSyncedText: '5 hours ago',
    eventsFoundCount: 8,
    autoSyncEnabled: true,
    sourceType: 'platform',
    url: 'https://devfolio.co',
    logoType: 'devfolio'
  },
  {
    id: 'src-google-developers',
    name: 'Google Developers',
    description: 'Developer events, workshops and community programmes',
    categories: ['Workshops', 'Conferences', 'Community'],
    status: 'Connected',
    lastSyncedText: '1 day ago',
    eventsFoundCount: 7,
    autoSyncEnabled: true,
    sourceType: 'platform',
    url: 'https://developers.google.com/community',
    logoType: 'google-developers'
  },
  {
    id: 'src-linkedin',
    name: 'LinkedIn',
    description: 'Internships, jobs and career opportunities',
    categories: ['Internships', 'Jobs', 'Career'],
    status: 'Connected',
    lastSyncedText: '1 day ago',
    eventsFoundCount: 6,
    autoSyncEnabled: true,
    sourceType: 'platform',
    url: 'https://linkedin.com/jobs',
    logoType: 'linkedin'
  },
  {
    id: 'src-college-portals',
    name: 'College Event Portals',
    description: "Your college's official event portal",
    categories: ['College Events', 'Workshops', 'Fests'],
    status: 'Connected',
    lastSyncedText: '2 days ago',
    eventsFoundCount: 9,
    autoSyncEnabled: true,
    sourceType: 'portal',
    url: 'https://campus.edu/events',
    logoType: 'college-portal'
  },
  {
    id: 'src-custom-website',
    name: 'Custom Website',
    description: 'Add any event website with an RSS feed',
    categories: ['Custom'],
    status: 'Disconnected',
    lastSyncedText: '5 days ago',
    eventsFoundCount: 0,
    autoSyncEnabled: false,
    sourceType: 'website',
    url: 'https://tech-events.blog/feed.xml',
    logoType: 'custom-website'
  }
];

export const INITIAL_SOURCE_ACTIVITIES: SourceActivityItem[] = [
  {
    id: 'act-1',
    sourceName: 'Unstop',
    logoType: 'unstop',
    actionText: '12 new events found',
    timeAgo: '2 hours ago',
    status: 'success'
  },
  {
    id: 'act-2',
    sourceName: 'Devfolio',
    logoType: 'devfolio',
    actionText: 'Sync completed',
    timeAgo: '5 hours ago',
    status: 'success'
  },
  {
    id: 'act-3',
    sourceName: 'Google Developers',
    logoType: 'google-developers',
    actionText: '7 new events found',
    timeAgo: '1 day ago',
    status: 'success'
  },
  {
    id: 'act-4',
    sourceName: 'LinkedIn',
    logoType: 'linkedin',
    actionText: 'Sync completed',
    timeAgo: '1 day ago',
    status: 'success'
  },
  {
    id: 'act-5',
    sourceName: 'Custom Website',
    logoType: 'custom-website',
    actionText: 'Sync failed',
    timeAgo: '5 days ago',
    status: 'warning'
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  fullName: 'Chakshu Arora',
  email: 'chakshu.arora@college.edu.in',
  role: 'Student',
  institution: 'Delhi University',
  academicYear: '2nd Year',
  avatarUrl: '/chakshu_arora.png'
};

export const INITIAL_NOTIFICATIONS: NotificationSettings = {
  eventReminders: true,
  newEventAlerts: true,
  importantUpdates: false
};

export const INITIAL_PREFERENCES: UserPreferences = {
  defaultView: 'List View',
  sortEventsBy: 'Earliest First',
  theme: 'light'
};

