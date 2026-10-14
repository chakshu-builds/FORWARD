export type EventStatus = 'Registered' | 'Interested' | 'In Progress' | 'Submitted' | 'Open' | 'Not Registered' | 'Completed';

export type EventCategory = 'Hackathons' | 'Workshops' | 'Competitions' | 'Internships' | 'Conferences' | 'Hackathon' | 'Workshop' | 'Competition' | 'Internship' | 'Conference';

export interface SourceNotice {
  id: string;
  channel: 'WhatsApp' | 'Email' | 'Discord' | 'PDF Flyer' | 'Web Link';
  receivedAt: string;
  senderOrSource: string;
  rawSnippet: string;
  confidenceScore: number;
  highlightedText?: string;
}

export interface ChangeHistoryEntry {
  id: string;
  timestamp: string;
  changeType: 'Created' | 'Field Updated' | 'Conflict Resolved' | 'Status Changed';
  description: string;
  actor: 'Auto-Extracted' | 'User Manual' | 'Reconciliation Engine';
}

export interface PrepTask {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  eventId?: string;
}

export interface EventConflict {
  id: string;
  field: string;
  fieldLabel: string;
  currentValue: string;
  currentSource: string;
  currentSourceDate: string;
  newValue: string;
  newSource: string;
  newSourceDate: string;
  status: 'Pending' | 'Resolved';
  resolutionDecision?: 'kept_current' | 'accepted_new' | 'manual_override';
  explanation: string;
}

export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  category: EventCategory;
  status: EventStatus;
  registrationDeadline: string; // ISO string
  eventStartDate: string;
  eventEndDate?: string;
  timeRange?: string; // e.g. "10:00 AM - 5:00 PM"
  dateLabel?: { month: string; day: string };
  reportingTime?: string;
  venue: string;
  isOnline?: boolean;
  registrationUrl: string;
  summary: string;
  thumbnailUrl?: string;
  thumbnailType?: string;
  thumbnailGradient?: string;
  thumbnailIcon?: string;
  sourceNotice: SourceNotice;
  changeHistory: ChangeHistoryEntry[];
  tasks: PrepTask[];
  conflict?: EventConflict;
  tags: string[];
  daysRemaining: number;
  deadlineFormatted?: string;
  deadlineDaysLeft?: number;
  timelineGroup?: 'Today' | 'Tomorrow' | 'This Week' | 'Later This Month' | 'Past Events';
  isUrgent?: boolean;
  createdAt?: string;
}

export interface ExtractionDraft {
  title: string;
  organizer: string;
  category: EventCategory;
  registrationDeadline: string;
  eventStartDate: string;
  eventEndDate: string;
  reportingTime: string;
  venue: string;
  registrationUrl: string;
  sourceText: string;
  sourceChannel: 'WhatsApp' | 'Email' | 'Discord' | 'PDF Flyer' | 'Web Link';
  confidenceScore: number;
  lowConfidenceFields: string[];
  detectedConflictNotice?: string;
}

export interface AttentionItem {
  id: string;
  type: 'conflict' | 'missing_info' | 'update';
  title: string;
  eventTitle: string;
  eventId: string;
  timeAgo: string;
  dateLabel?: { month: string; day: string };
  field?: string;
  explanation?: string;
  conflictingEventId?: string;
  conflictingEventTitle?: string;
  conflictingEventDate?: string;
  conflictingEventTime?: string;
  previousValue?: string;
  proposedValue?: string;
  status?: 'pending' | 'resolved';
}

export interface RecentlyAddedItem {
  id: string;
  title: string;
  organizer: string;
  eventId: string;
  timeAgo: string;
  thumbnailType: string;
}

export type ActiveView = 'overview' | 'timeline' | 'add-event' | 'needs-review' | 'sources' | 'settings' | 'dashboard' | 'all-events';

export type SourceStatus = 'Connected' | 'Syncing' | 'Disconnected' | 'Error';

export interface SourceItem {
  id: string;
  name: string;
  description: string;
  categories: string[];
  status: SourceStatus;
  lastSyncedText: string;
  eventsFoundCount: number;
  autoSyncEnabled: boolean;
  sourceType: 'platform' | 'website' | 'rss' | 'portal';
  url?: string;
  logoType: string;
}

export type EventSource = SourceItem;

export interface SourceActivityItem {
  id: string;
  sourceName: string;
  logoType: string;
  actionText: string;
  timeAgo: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export type SourceActivity = SourceActivityItem;
