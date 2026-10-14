export type EventStatus = 'Registered' | 'Interested' | 'In Progress' | 'Submitted';

export type EventCategory = 'Hackathon' | 'Workshop' | 'Competition' | 'Conference' | 'Academic';

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
  registrationDeadline: string; // ISO string or human string
  eventStartDate: string;
  eventEndDate: string;
  reportingTime: string;
  venue: string;
  registrationUrl: string;
  summary: string;
  sourceNotice: SourceNotice;
  changeHistory: ChangeHistoryEntry[];
  tasks: PrepTask[];
  conflict?: EventConflict;
  tags: string[];
  daysRemaining: number;
  isUrgent?: boolean;
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

export type ActiveView = 'dashboard' | 'timeline' | 'needs-review' | 'all-events';
