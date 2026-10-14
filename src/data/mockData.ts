import type { EventItem, ExtractionDraft } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-hackshift-2026',
    title: 'HackShift 2026: 36-Hour National Hackathon',
    organizer: 'Dept. of CSE & ACM Student Chapter',
    category: 'Hackathon',
    status: 'In Progress',
    registrationDeadline: '2026-03-24T23:59:00',
    eventStartDate: '2026-04-04T08:30:00',
    eventEndDate: '2026-04-05T20:00:00',
    reportingTime: '08:30 AM IST (Pending verification)',
    venue: 'Tech Park Innovation Hall 3 (Discrepancy detected)',
    registrationUrl: 'https://devfolio.co/hackathons/hackshift-2026',
    summary: 'Flagship university hackathon focusing on AI agents, campus systems, and open innovation. 36 hours of coding, mentoring, and judging.',
    daysRemaining: 6,
    isUrgent: false,
    tags: ['Hackathon', 'AI', 'Campus', 'Team of 4'],
    sourceNotice: {
      id: 'src-1',
      channel: 'WhatsApp',
      receivedAt: '2026-03-12 14:22',
      senderOrSource: 'Class Representatives Group (CRs Official)',
      rawSnippet: '🚨 HackShift 2026 Registration extended till March 24! Reporting moved from Main Audi to Tech Park Innovation Hall 3 at 8:30 AM sharp. Please inform your teams.',
      confidenceScore: 0.94,
      highlightedText: 'Reporting moved from Main Audi to Tech Park Innovation Hall 3 at 8:30 AM sharp'
    },
    conflict: {
      id: 'conf-1',
      field: 'venue_and_time',
      fieldLabel: 'Venue & Reporting Time',
      currentValue: 'Campus Main Auditorium, 09:00 AM IST',
      currentSource: 'Initial WhatsApp Flyer (Uploaded Mar 10)',
      currentSourceDate: '2026-03-10',
      newValue: 'Tech Park Innovation Hall 3, 08:30 AM IST',
      newSource: 'Discord Organizer Announcement #announcements (Detected Mar 16)',
      newSourceDate: '2026-03-16',
      status: 'Pending',
      explanation: 'Organizers changed the reporting location and time to avoid seating overlap with the annual sports inauguration.'
    },
    tasks: [
      { id: 't-1', title: 'Confirm 4-member team roster on Devfolio portal', dueDate: '2026-03-22', completed: true, priority: 'High' },
      { id: 't-2', title: 'Prepare architecture diagram & system flow presentation', dueDate: '2026-03-28', completed: true, priority: 'High' },
      { id: 't-3', title: 'Submit pitch deck link and repo setup to judges dashboard', dueDate: '2026-04-01', completed: false, priority: 'High' },
      { id: 't-4', title: 'Carry physical college ID cards and multiple power strips', dueDate: '2026-04-04', completed: false, priority: 'Medium' }
    ],
    changeHistory: [
      { id: 'h-1', timestamp: '2026-03-10 16:30', changeType: 'Created', description: 'Event extracted from forwarded brochure screenshot', actor: 'Auto-Extracted' },
      { id: 'h-2', timestamp: '2026-03-12 14:25', changeType: 'Field Updated', description: 'Registration deadline updated to March 24 after extension announcement', actor: 'User Manual' },
      { id: 'h-3', timestamp: '2026-03-16 09:12', changeType: 'Conflict Resolved', description: 'Flagged discrepancy: Venue changed to Tech Park Innovation Hall 3', actor: 'Reconciliation Engine' }
    ]
  },
  {
    id: 'evt-goldman-sachs-2026',
    title: 'Goldman Sachs Campus Engineering Challenge',
    organizer: 'Training & Placement Cell (TPC) in partnership with GS',
    category: 'Competition',
    status: 'Registered',
    registrationDeadline: '2026-03-18T23:59:00',
    eventStartDate: '2026-03-19T18:00:00',
    eventEndDate: '2026-03-19T21:00:00',
    reportingTime: '05:45 PM IST (Online Test Link)',
    venue: 'Online Assessment (HackerRank Proctored Platform)',
    registrationUrl: 'https://campus.goldmansachs.com/apply/in-2026',
    summary: 'Preliminary coding and algorithmic screening for 2027 Summer Analyst and Technology Internships.',
    daysRemaining: 1,
    isUrgent: true,
    tags: ['Placement', 'DSA', 'Screening', 'Individual'],
    sourceNotice: {
      id: 'src-2',
      channel: 'Email',
      receivedAt: '2026-03-14 10:15',
      senderOrSource: 'placement.cell@campus.edu via University Webmail',
      rawSnippet: 'Dear Students, The deadline for GS Engineering Challenge registration is March 18, 23:59 IST. The online test window opens on March 19 at 18:00 IST sharp. Webcams mandatory.',
      confidenceScore: 0.98,
      highlightedText: 'registration is March 18, 23:59 IST. The online test window opens on March 19 at 18:00 IST'
    },
    tasks: [
      { id: 't-5', title: 'Verify HackerRank test credentials and system compatibility', dueDate: '2026-03-17', completed: true, priority: 'High' },
      { id: 't-6', title: 'Revise Graph Algorithms (BFS/DFS/Dijkstra) and Dynamic Programming', dueDate: '2026-03-18', completed: false, priority: 'High' },
      { id: 't-7', title: 'Submit updated 1-page resume PDF on college TPC portal', dueDate: '2026-03-18', completed: false, priority: 'Medium' }
    ],
    changeHistory: [
      { id: 'h-4', timestamp: '2026-03-14 10:20', changeType: 'Created', description: 'Captured from university placement circular email', actor: 'Auto-Extracted' },
      { id: 'h-5', timestamp: '2026-03-15 11:00', changeType: 'Status Changed', description: 'Moved status from Interested to Registered', actor: 'User Manual' }
    ]
  },
  {
    id: 'evt-neurovibe-bci',
    title: 'NeuroVibe: Brain-Computer Interface Hands-on Workshop',
    organizer: 'IEEE EMBS & Cognitive Robotics Student Chapter',
    category: 'Workshop',
    status: 'Registered',
    registrationDeadline: '2026-03-21T18:00:00',
    eventStartDate: '2026-03-23T09:30:00',
    eventEndDate: '2026-03-23T17:00:00',
    reportingTime: '09:15 AM IST',
    venue: 'Biomedical Systems Lab, Block C-302, North Campus',
    registrationUrl: 'https://ieee-campus.org/workshops/neurovibe-2026',
    summary: 'Practical hands-on lab using OpenBCI Cyton boards, EEG signal acquisition, Python signal filtering, and real-time motor imagery classification.',
    daysRemaining: 4,
    isUrgent: false,
    tags: ['BCI', 'Neuroscience', 'Python', 'Hands-on Lab'],
    sourceNotice: {
      id: 'src-3',
      channel: 'PDF Flyer',
      receivedAt: '2026-03-11 19:40',
      senderOrSource: 'NeuroVibe_Workshop_Flyer_Final.pdf',
      rawSnippet: 'Hands-on BCI Workshop with hardware kits provided. Limited to 45 seats. Register before March 21, 6 PM. Prerequisites: Basic Python knowledge and laptop with NumPy installed.',
      confidenceScore: 0.96,
      highlightedText: 'Register before March 21, 6 PM. Block C-302 North Campus'
    },
    tasks: [
      { id: 't-8', title: 'Install Python MNE, SciPy, and BrainFlow library environments', dueDate: '2026-03-22', completed: true, priority: 'Medium' },
      { id: 't-9', title: 'Download reference dataset and sample EEG filter notebooks', dueDate: '2026-03-22', completed: false, priority: 'Low' }
    ],
    changeHistory: [
      { id: 'h-6', timestamp: '2026-03-11 19:45', changeType: 'Created', description: 'Extracted from department noticeboard PDF flyer', actor: 'Auto-Extracted' }
    ]
  },
  {
    id: 'evt-ieee-symposium',
    title: 'IEEE International Student Symposium on Distributed AI',
    organizer: 'IEEE Computer Society Region 10',
    category: 'Conference',
    status: 'Interested',
    registrationDeadline: '2026-04-10T23:59:00',
    eventStartDate: '2026-04-24T09:00:00',
    eventEndDate: '2026-04-26T18:00:00',
    reportingTime: '08:45 AM IST',
    venue: 'Convention Center Hall A & Hybrid Live Stream',
    registrationUrl: 'https://ieeecs-symposium2026.org',
    summary: 'Three-day academic symposium featuring keynotes from AI researchers, poster presentations on federated learning, and student research tracks.',
    daysRemaining: 23,
    isUrgent: false,
    tags: ['Research', 'AI/ML', 'Paper Presentation', 'Hybrid'],
    sourceNotice: {
      id: 'src-4',
      channel: 'Web Link',
      receivedAt: '2026-03-08 11:20',
      senderOrSource: 'https://ieeecs-symposium2026.org/call-for-posters',
      rawSnippet: 'Call for Student Posters and Early Registrations open till April 10, 2026. Early bird discount applies to active IEEE student members.',
      confidenceScore: 0.92
    },
    tasks: [
      { id: 't-10', title: 'Review abstract submission guidelines with faculty mentor', dueDate: '2026-04-05', completed: false, priority: 'Medium' }
    ],
    changeHistory: [
      { id: 'h-7', timestamp: '2026-03-08 11:22', changeType: 'Created', description: 'Parsed from conference web link', actor: 'Auto-Extracted' }
    ]
  },
  {
    id: 'evt-sih-screening',
    title: 'Smart India Hackathon 2026 — Internal College Screening',
    organizer: 'Ministry of Education Innovation Cell & College R&D Hub',
    category: 'Hackathon',
    status: 'Submitted',
    registrationDeadline: '2026-03-15T17:00:00',
    eventStartDate: '2026-04-12T10:00:00',
    eventEndDate: '2026-04-12T18:00:00',
    reportingTime: '09:30 AM IST',
    venue: 'Research & Incubation Seminar Hall 2',
    registrationUrl: 'https://sih.gov.in',
    summary: 'Mandatory internal college qualifier for nominating teams to the national SIH 2026 portal. 10 teams will be selected across hardware and software categories.',
    daysRemaining: 15,
    isUrgent: false,
    tags: ['National', 'Govt of India', 'Nomination', 'Team of 6'],
    sourceNotice: {
      id: 'src-5',
      channel: 'WhatsApp',
      receivedAt: '2026-03-05 15:00',
      senderOrSource: 'Official SPOC Broadcast Channel',
      rawSnippet: 'All nominated teams must submit initial problem statement PPT before March 15. Shortlisted list for internal presentations will be published by April 5.',
      confidenceScore: 0.99
    },
    tasks: [
      { id: 't-11', title: 'Submit 5-slide concept PPT to College SPOC email', dueDate: '2026-03-15', completed: true, priority: 'High' },
      { id: 't-12', title: 'Prepare hardware bill-of-materials and circuit prototype', dueDate: '2026-04-10', completed: false, priority: 'Medium' }
    ],
    changeHistory: [
      { id: 'h-8', timestamp: '2026-03-05 15:05', changeType: 'Created', description: 'Captured from SPOC announcement', actor: 'Auto-Extracted' },
      { id: 'h-9', timestamp: '2026-03-15 16:45', changeType: 'Status Changed', description: 'Status changed to Submitted after PPT submission', actor: 'User Manual' }
    ]
  },
  {
    id: 'evt-devops-bootcamp',
    title: 'Kubernetes & Cloud Native Weekend Bootcamp',
    organizer: 'Google Developer Groups (GDG) on Campus',
    category: 'Workshop',
    status: 'Interested',
    registrationDeadline: '2026-04-16T23:59:00',
    eventStartDate: '2026-04-18T10:00:00',
    eventEndDate: '2026-04-19T16:00:00',
    reportingTime: '09:45 AM IST',
    venue: 'Virtual Interactive Lab (Google Meet & Cloud Shell)',
    registrationUrl: 'https://gdg.community.dev/events/details/cloud-bootcamp-2026',
    summary: 'Crash course in Docker containers, Pod networking, Helm charts, and CI/CD pipelines with hands-on Google Cloud credits provided.',
    daysRemaining: 29,
    isUrgent: false,
    tags: ['Cloud', 'Kubernetes', 'Docker', 'GCP'],
    sourceNotice: {
      id: 'src-6',
      channel: 'Discord',
      receivedAt: '2026-03-13 22:10',
      senderOrSource: '#tech-events channel in Campus Devs Discord',
      rawSnippet: 'GDG Campus is hosting a 2-day hands-on Kubernetes weekend sprint. $100 Google Cloud credits voucher for each attendee. Free registration.',
      confidenceScore: 0.95
    },
    tasks: [
      { id: 't-13', title: 'Claim GCP free student credits voucher code', dueDate: '2026-04-17', completed: false, priority: 'Low' }
    ],
    changeHistory: [
      { id: 'h-10', timestamp: '2026-03-13 22:15', changeType: 'Created', description: 'Captured from Discord #tech-events channel', actor: 'Auto-Extracted' }
    ]
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
  category: 'Hackathon',
  registrationDeadline: '2026-03-28T23:59:00',
  eventStartDate: '2026-04-04T08:30:00',
  eventEndDate: '2026-04-05T20:00:00',
  reportingTime: '08:30 AM IST',
  venue: 'Tech Park Innovation Hall 3 (Gate 4)',
  registrationUrl: 'https://devfolio.co/hackathons/hackshift-2026/checkin',
  sourceText: 'Due to university convocation rehearsals, HackShift 2026 finals venue has been relocated: New Venue: Tech Park Innovation Hall 3 (NOT Main Auditorium). Reporting Time: 08:30 AM IST sharp. Confirmation deadline: March 28.',
  sourceChannel: 'WhatsApp',
  confidenceScore: 0.96,
  lowConfidenceFields: ['reportingTime'],
  detectedConflictNotice: 'Venue discrepancy: Current record indicates "Main Auditorium, 09:00 AM". New notice specifies "Tech Park Innovation Hall 3, 08:30 AM".'
};
