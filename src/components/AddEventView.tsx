import React, { useState, useRef } from 'react';
import type { EventItem, EventCategory, ExtractionDraft } from '../types';
import { DatePickerDropdown } from './DatePickerDropdown';
import { EventThumbnail } from './EventThumbnail';
import { SAMPLE_CAPTURE_PRESETS } from '../data/realEventsMock';
import {
  X,
  FileText,
  UploadCloud,
  Link as LinkIcon,
  Sparkles,
  Check,
  ArrowRight,
  Info,
  Lightbulb,
  FileCode,
  Image as ImageIcon,
  Clock,
  MapPin,
  Loader2,
  Trash2
} from 'lucide-react';

interface AddEventViewProps {
  onClose: () => void;
  onSaveEvent: (event: EventItem) => void;
  existingEvents: EventItem[];
  addToast: (type: 'success' | 'warning' | 'info', title: string, description?: string) => void;
}

export const AddEventView: React.FC<AddEventViewProps> = ({
  onClose,
  onSaveEvent,
  existingEvents,
  addToast,
}) => {
  // Current Stepper Step: 1 = Capture, 2 = Review
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Capture method tabs: 'text' | 'file' | 'link'
  const [activeTab, setActiveTab] = useState<'text' | 'file' | 'link'>('text');

  // Capture Inputs
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number; type: string } | null>(null);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extraction Simulation / Processing State
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionDraft, setExtractionDraft] = useState<ExtractionDraft | null>(null);

  // Manual Form State
  const [title, setTitle] = useState('');
  const [organiser, setOrganiser] = useState('');
  const [eventType, setEventType] = useState('Hackathon');
  const [category, setCategory] = useState<EventCategory>('Hackathon');
  const [eventDate, setEventDate] = useState('2026-10-18');
  const [mode, setMode] = useState<'Online' | 'In-Person' | 'Hybrid'>('Online');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('5:00 PM');
  const [venue, setVenue] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('2026-10-16');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [description, setDescription] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Saved Draft state initialized from localStorage
  const [savedDraftExists, setSavedDraftExists] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('forward_event_draft'));
    } catch {
      return false;
    }
  });

  // Save as Draft
  const handleSaveAsDraft = () => {
    const draftData = {
      textInput,
      urlInput,
      uploadedFile,
      activeTab,
      manual: {
        title,
        organiser,
        eventType,
        category,
        eventDate,
        mode,
        startTime,
        endTime,
        venue,
        registrationDeadline,
        registrationUrl,
        description,
      },
      updatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem('forward_event_draft', JSON.stringify(draftData));
      setSavedDraftExists(true);
      addToast('success', 'Draft Saved', 'Your event draft has been saved to your browser.');
    } catch {
      addToast('warning', 'Save Failed', 'Could not save draft to local storage.');
    }
  };

  // Resume Draft
  const handleResumeDraft = () => {
    try {
      const raw = localStorage.getItem('forward_event_draft');
      if (raw) {
        const d = JSON.parse(raw);
        if (d.textInput) setTextInput(d.textInput);
        if (d.urlInput) setUrlInput(d.urlInput);
        if (d.uploadedFile) setUploadedFile(d.uploadedFile);
        if (d.activeTab) setActiveTab(d.activeTab);
        if (d.manual) {
          setTitle(d.manual.title || '');
          setOrganiser(d.manual.organiser || '');
          setEventType(d.manual.eventType || 'Hackathon');
          setCategory(d.manual.category || 'Hackathon');
          setEventDate(d.manual.eventDate || '2026-10-18');
          setMode(d.manual.mode || 'Online');
          setStartTime(d.manual.startTime || '10:00 AM');
          setEndTime(d.manual.endTime || '5:00 PM');
          setVenue(d.manual.venue || '');
          setRegistrationDeadline(d.manual.registrationDeadline || '');
          setRegistrationUrl(d.manual.registrationUrl || '');
          setDescription(d.manual.description || '');
        }
        addToast('info', 'Draft Restored', 'Loaded your previously saved draft.');
      }
    } catch {
      // ignore
    }
  };

  // Discard Draft
  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem('forward_event_draft');
      setSavedDraftExists(false);
      addToast('info', 'Draft Discarded', 'Saved draft removed.');
    } catch {
      // ignore
    }
  };

  // Try Sample Text handler
  const handleTrySampleText = () => {
    setTextInput(SAMPLE_CAPTURE_PRESETS.textSnippet);
    // Also prefill some manual fields
    setTitle('Google Winter Internship 2026');
    setOrganiser('Google');
    setCategory('Internship');
    setEventType('Internship');
    setEventDate('2026-10-18');
    setMode('Online');
    setVenue('Online / Virtual');
    setRegistrationDeadline('2026-10-30');
    setDescription('Join Google for the winter internship program. Applications open for pre-final and final year engineering students.');
  };

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Validate size (< 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds the 10 MB limit.');
      return;
    }

    // Validate type
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.txt', '.docx'];
    const hasValidExt = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!hasValidExt) {
      setFileError('Invalid file format. Please upload JPG, PNG, WEBP, PDF, TXT or DOCX.');
      return;
    }

    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type || 'document'
    });
  };

  // Extract Information Trigger
  const handleExtractInformation = () => {
    // Validate that input is provided
    if (activeTab === 'text') {
      if (!textInput.trim()) {
        addToast('warning', 'Input Required', 'Please paste event text before extracting.');
        return;
      }
    } else if (activeTab === 'file') {
      if (!uploadedFile) {
        addToast('warning', 'File Required', 'Please upload an image, PDF or document first.');
        return;
      }
    } else if (activeTab === 'link') {
      if (!urlInput.trim()) {
        setUrlError('Please enter an event webpage or portal URL.');
        return;
      }
      try {
        new URL(urlInput);
      } catch {
        setUrlError('Please enter a valid URL starting with http:// or https://');
        return;
      }
      setUrlError('');
    }

    setIsExtracting(true);

    // Simulate smart OCR / notice extraction with realistic timeout
    setTimeout(() => {
      setIsExtracting(false);

      // Create draft details from inputs or preset
      const draft: ExtractionDraft = {
        title: title || (activeTab === 'text' && textInput.includes('Product Sprint') ? 'Product Sprint 2026' : 'AI for Bharat Hackathon'),
        organizer: organiser || 'TechVerse Club',
        category: category || 'Hackathon',
        registrationDeadline: registrationDeadline || '2026-10-25',
        eventStartDate: eventDate || '2026-10-28',
        eventEndDate: eventDate || '2026-10-28',
        reportingTime: startTime || '09:30 AM',
        venue: venue || (mode === 'Online' ? 'Online' : 'VIPS-TC Auditorium, Delhi'),
        registrationUrl: registrationUrl || (activeTab === 'link' ? urlInput : 'https://unstop.com/events/ai-bharat'),
        sourceText: activeTab === 'text' ? textInput : (uploadedFile ? uploadedFile.name : urlInput),
        sourceChannel: activeTab === 'file' ? 'PDF Flyer' : activeTab === 'link' ? 'Web Link' : 'WhatsApp',
        confidenceScore: 94,
        lowConfidenceFields: [],
      };

      setExtractionDraft(draft);
      setTitle(draft.title);
      setOrganiser(draft.organizer);
      setCategory(draft.category);
      setEventDate(draft.eventStartDate);
      setRegistrationDeadline(draft.registrationDeadline);
      setVenue(draft.venue);
      setRegistrationUrl(draft.registrationUrl);
      setCurrentStep(2); // Move to Review step!

      addToast('success', 'Details Extracted', 'Review and adjust the extracted event fields below.');
    }, 900);
  };

  // Submit and Save Event
  const handleSaveEvent = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = 'Event title is required';
    if (!organiser.trim()) newErrors.organiser = 'Organiser name is required';
    if (!eventDate) newErrors.eventDate = 'Event date is required';
    if (!startTime.trim()) newErrors.startTime = 'Start time is required';
    if (mode !== 'Online' && !venue.trim()) {
      newErrors.venue = 'Venue is required for in-person and hybrid events';
    }

    // Date consistency
    if (registrationDeadline && eventDate && registrationDeadline > eventDate) {
      newErrors.registrationDeadline = 'Registration deadline cannot be after the event date';
    }

    // Duplicate check
    const isDuplicate = existingEvents.some(
      (ev) => ev.title.toLowerCase().trim() === title.toLowerCase().trim() && ev.eventStartDate === eventDate
    );
    if (isDuplicate) {
      newErrors.title = 'An event with this title and date already exists in your timeline.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast('warning', 'Validation Error', 'Please correct the highlighted fields before saving.');
      return;
    }

    setErrors({});

    // Calculate days remaining
    const parsedEventDate = new Date(eventDate);
    const today = new Date(2026, 9, 14); // 14 Oct 2026
    const diffTime = parsedEventDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Formatted date label
    const monthStr = parsedEventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const dayStr = String(parsedEventDate.getDate());

    // Deadline remaining
    let deadlineDaysLeft: number | undefined = undefined;
    let deadlineFormatted: string | undefined = undefined;
    if (registrationDeadline) {
      const parsedDl = new Date(registrationDeadline);
      const dlDiff = Math.ceil((parsedDl.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      deadlineDaysLeft = dlDiff;
      const dlMonth = parsedDl.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      if (dlDiff === 0) deadlineFormatted = `Deadline today, ${dlMonth}`;
      else if (dlDiff > 0) deadlineFormatted = `${dlDiff} days left, ${dlMonth}`;
      else deadlineFormatted = `Deadline passed, ${dlMonth}`;
    }

    // Determine timelineGroup
    let timelineGroup: 'Today' | 'Tomorrow' | 'This Week' | 'Later This Month' | 'Past Events' = 'Later This Month';
    if (daysRemaining === 0) timelineGroup = 'Today';
    else if (daysRemaining === 1) timelineGroup = 'Tomorrow';
    else if (daysRemaining >= 2 && daysRemaining <= 5) timelineGroup = 'This Week';
    else if (daysRemaining < 0) timelineGroup = 'Past Events';

    const newEvent: EventItem = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      organizer: organiser.trim(),
      category: category,
      status: 'Registered',
      registrationDeadline: registrationDeadline ? `${registrationDeadline}T23:59:00Z` : `${eventDate}T23:59:00Z`,
      eventStartDate: eventDate,
      timeRange: `${startTime} – ${endTime || 'TBD'}`,
      dateLabel: { month: monthStr, day: dayStr },
      venue: mode === 'Online' ? 'Online' : venue.trim() || 'TBD',
      isOnline: mode === 'Online',
      registrationUrl: registrationUrl.trim() || 'https://unstop.com',
      summary: description.trim() || `${title} organised by ${organiser}`,
      thumbnailType: category.toLowerCase().includes('hackathon') ? 'hackathon' : 'default',
      sourceNotice: {
        id: `notice-${Date.now()}`,
        channel: activeTab === 'file' ? 'PDF Flyer' : activeTab === 'link' ? 'Web Link' : 'WhatsApp',
        receivedAt: 'Just now',
        senderOrSource: organiser.trim() || 'Manual Input',
        rawSnippet: textInput.substring(0, 150) || `${title} by ${organiser}`,
        confidenceScore: 98,
      },
      changeHistory: [
        {
          id: `hist-${Date.now()}`,
          timestamp: 'Just now',
          changeType: 'Created',
          description: 'Event created and verified by user in Add Event',
          actor: 'User Manual'
        }
      ],
      tasks: [
        {
          id: `task-${Date.now()}-1`,
          title: `Prepare registration & team for ${title}`,
          dueDate: registrationDeadline || eventDate,
          completed: false,
          priority: 'High'
        }
      ],
      tags: [category, mode],
      daysRemaining: daysRemaining,
      deadlineFormatted: deadlineFormatted,
      deadlineDaysLeft: deadlineDaysLeft,
      timelineGroup: timelineGroup,
      createdAt: new Date().toISOString()
    };

    onSaveEvent(newEvent);
    // Clear draft if it was saved
    try {
      localStorage.removeItem('forward_event_draft');
    } catch {
      // ignore
    }
    addToast('success', 'Event Added', `"${newEvent.title}" has been added to your timeline!`);
    onClose();
  };

  return (
    <div className="add-event-page" style={{ padding: '0 8px 40px 8px' }}>
      {/* Top Header / Actions Bar */}
      <div className="add-event-top-bar" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.025em' }}>
            Add Event
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Bring event information from any source or add it manually.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="btn-save-draft"
            onClick={handleSaveAsDraft}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '9px',
              padding: '8px 16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#0f172a',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="btn-close-page"
            onClick={onClose}
            aria-label="Close Add Event page"
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '9px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Draft Resume Alert if draft exists */}
      {savedDraftExists && (
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={18} style={{ color: '#2563eb' }} />
            <span style={{ fontSize: '0.85rem', color: '#1e293b' }}>
              You have a previously saved event draft.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleResumeDraft}
              style={{
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Resume Draft
            </button>
            <button
              type="button"
              onClick={handleDiscardDraft}
              style={{
                background: 'transparent',
                color: '#64748b',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Stepper Header (1 Capture -> 2 Review -> 3 Add Link/Save) */}
      <div
        className="add-event-stepper"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          padding: '14px 20px',
          marginBottom: '24px',
        }}
      >
        {/* Step 1 */}
        <div
          onClick={() => setCurrentStep(1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            opacity: currentStep === 1 ? 1 : 0.75,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: currentStep >= 1 ? '#2563eb' : '#f1f5f9',
              color: currentStep >= 1 ? '#ffffff' : '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.88rem',
              flexShrink: 0,
            }}
          >
            1
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: currentStep === 1 ? '#2563eb' : '#0f172a' }}>
              Capture
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Add event information
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div
          onClick={() => {
            if (extractionDraft || title) setCurrentStep(2);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: extractionDraft || title ? 'pointer' : 'default',
            opacity: currentStep === 2 ? 1 : 0.65,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: currentStep === 2 ? '#2563eb' : '#f1f5f9',
              color: currentStep === 2 ? '#ffffff' : '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.88rem',
              flexShrink: 0,
            }}
          >
            2
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: currentStep === 2 ? '#2563eb' : '#0f172a' }}>
              Review
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Check extracted details
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            opacity: 0.55,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#f1f5f9',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.88rem',
              flexShrink: 0,
            }}
          >
            3
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
              Add Link
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Save to your timeline
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: Left Content (Capture/Form) + Right Widgets */}
      <div
        className="add-event-main-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Column */}
        <div className="add-event-left-col">
          {currentStep === 1 ? (
            <>
              {/* 3 Capture Method Cards */}
              <div
                className="capture-method-cards-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '14px',
                  marginBottom: '24px',
                }}
              >
                {/* Method 1: Paste Text */}
                <div
                  className={`capture-method-card ${activeTab === 'text' ? 'active-method' : ''}`}
                  onClick={() => setActiveTab('text')}
                  style={{
                    border: activeTab === 'text' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    background: activeTab === 'text' ? '#f0f7ff' : '#ffffff',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ color: '#2563eb' }}>
                      <FileText size={22} />
                    </div>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: activeTab === 'text' ? 'none' : '1.5px solid #cbd5e1',
                        background: activeTab === 'text' ? '#2563eb' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                      }}
                    >
                      {activeTab === 'text' && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '4px' }}>
                    Paste Text
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.35 }}>
                    Paste event details from emails, messages or documents
                  </div>
                </div>

                {/* Method 2: Upload File */}
                <div
                  className={`capture-method-card ${activeTab === 'file' ? 'active-method' : ''}`}
                  onClick={() => setActiveTab('file')}
                  style={{
                    border: activeTab === 'file' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    background: activeTab === 'file' ? '#f0f7ff' : '#ffffff',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ color: '#2563eb' }}>
                      <UploadCloud size={22} />
                    </div>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: activeTab === 'file' ? 'none' : '1.5px solid #cbd5e1',
                        background: activeTab === 'file' ? '#2563eb' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                      }}
                    >
                      {activeTab === 'file' && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '4px' }}>
                    Upload File
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.35 }}>
                    Upload a screenshot, PDF or brochure
                  </div>
                </div>

                {/* Method 3: Add Link */}
                <div
                  className={`capture-method-card ${activeTab === 'link' ? 'active-method' : ''}`}
                  onClick={() => setActiveTab('link')}
                  style={{
                    border: activeTab === 'link' ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    background: activeTab === 'link' ? '#f0f7ff' : '#ffffff',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ color: '#2563eb' }}>
                      <LinkIcon size={22} />
                    </div>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: activeTab === 'link' ? 'none' : '1.5px solid #cbd5e1',
                        background: activeTab === 'link' ? '#2563eb' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                      }}
                    >
                      {activeTab === 'link' && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '4px' }}>
                    Add Link
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.35 }}>
                    Add a link to the event page
                  </div>
                </div>
              </div>

              {/* Active Method Input Card */}
              <div
                className="capture-active-input-box"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '20px',
                  marginBottom: '24px',
                }}
              >
                {activeTab === 'text' && (
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '8px' }}>
                      Paste event information
                    </label>
                    <div style={{ position: 'relative' }}>
                      <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value.substring(0, 5000))}
                        placeholder="Paste the event message, brochure text or any information here..."
                        style={{
                          width: '100%',
                          minHeight: '120px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          resize: 'vertical',
                          outline: 'none',
                          fontFamily: 'inherit',
                          lineHeight: 1.5,
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '6px',
                        }}
                      >
                        <button
                          type="button"
                          onClick={handleTrySampleText}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#2563eb',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            cursor: 'pointer',
                            padding: '4px 0',
                          }}
                        >
                          <Sparkles size={14} />
                          <span>Try a sample text</span>
                        </button>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          {textInput.length}/5000
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'file' && (
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '8px' }}>
                      Upload screenshot, PDF flyer or brochure
                    </label>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept=".jpg,.jpeg,.png,.webp,.pdf,.txt,.docx"
                    />

                    {!uploadedFile ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          border: '2px dashed #cbd5e1',
                          borderRadius: '12px',
                          padding: '30px 20px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: '#f8fafc',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                      >
                        <UploadCloud size={32} style={{ color: '#2563eb', margin: '0 auto 10px auto' }} />
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a', marginBottom: '4px' }}>
                          Click to browse or drop flyer/brochure here
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          Supports JPG, PNG, WEBP, PDF, TXT up to 10 MB
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          background: '#eff6ff',
                          border: '1px solid #bfdbfe',
                          borderRadius: '10px',
                          padding: '14px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <FileText size={20} style={{ color: '#2563eb' }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e3a8a' }}>
                              {uploadedFile.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#60a5fa' }}>
                              {(uploadedFile.size / 1024).toFixed(1)} KB • Ready for extraction
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUploadedFile(null)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#dc2626',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.8rem',
                          }}
                        >
                          <Trash2 size={15} />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}

                    {fileError && (
                      <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>
                        {fileError}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'link' && (
                  <div>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '8px' }}>
                      Event Page or Portal Link
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => {
                          setUrlInput(e.target.value);
                          if (urlError) setUrlError('');
                        }}
                        placeholder="https://unstop.com/hackathons/product-sprint-2026"
                        style={{
                          flex: 1,
                          border: urlError ? '1px solid #ef4444' : '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '10px 14px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                    </div>
                    {urlError && (
                      <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>
                        {urlError}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Quick samples:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setUrlInput('https://unstop.com/hackathons/product-sprint-2026');
                          setUrlError('');
                        }}
                        style={{
                          background: '#f1f5f9',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '0.74rem',
                          color: '#2563eb',
                          cursor: 'pointer',
                        }}
                      >
                        Unstop Hackathon
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUrlInput('https://careers.google.com/internships-2026');
                          setUrlError('');
                        }}
                        style={{
                          background: '#f1f5f9',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '0.74rem',
                          color: '#2563eb',
                          cursor: 'pointer',
                        }}
                      >
                        Google Internship
                      </button>
                    </div>
                  </div>
                )}

                {/* Extract Information Button */}
                <button
                  type="button"
                  className="btn-extract-info"
                  disabled={isExtracting}
                  onClick={handleExtractInformation}
                  style={{
                    width: '100%',
                    height: '44px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: isExtracting ? 'not-allowed' : 'pointer',
                    marginTop: '16px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {isExtracting ? (
                    <>
                      <Loader2 size={18} className="spin" />
                      <span>Extracting Event Information...</span>
                    </>
                  ) : (
                    <>
                      <span>Extract Information</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Divider: OR */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '28px 0',
                }}
              >
                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                <span
                  style={{
                    padding: '0 16px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#94a3b8',
                    letterSpacing: '0.05em',
                  }}
                >
                  OR
                </span>
                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              </div>

              {/* Enter Details Manually Section */}
              <div
                className="manual-entry-card"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '24px',
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>
                    Enter details manually
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                    Fill in the event details if you prefer to add it yourself.
                  </p>
                </div>

                <form onSubmit={handleSaveEvent}>
                  {/* Row 1: Title & Organiser */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Event Title <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Product Sprint 2026"
                        style={{
                          width: '100%',
                          border: errors.title ? '1px solid #ef4444' : '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      {errors.title && (
                        <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                          {errors.title}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Organiser <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={organiser}
                        onChange={(e) => setOrganiser(e.target.value)}
                        placeholder="e.g. TechVerse"
                        style={{
                          width: '100%',
                          border: errors.organiser ? '1px solid #ef4444' : '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      {errors.organiser && (
                        <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                          {errors.organiser}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Event Type & Category */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Event Type <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        style={{
                          width: '100%',
                          border: '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          background: '#ffffff',
                          outline: 'none',
                        }}
                      >
                        <option value="Hackathon">Hackathon</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Competition">Competition</option>
                        <option value="Internship">Internship</option>
                        <option value="Conference">Conference</option>
                        <option value="Webinar">Webinar</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Category <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as EventCategory)}
                        style={{
                          width: '100%',
                          border: '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          background: '#ffffff',
                          outline: 'none',
                        }}
                      >
                        <option value="Hackathon">Hackathons</option>
                        <option value="Workshop">Workshops</option>
                        <option value="Competition">Competitions</option>
                        <option value="Internship">Internships</option>
                        <option value="Conference">Conferences</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Event Date, Mode, Start Time, End Time */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Event Date <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <DatePickerDropdown
                        value={eventDate}
                        onChange={(d) => setEventDate(d)}
                        placeholder="Select date"
                        hasError={!!errors.eventDate}
                      />
                      {errors.eventDate && (
                        <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                          {errors.eventDate}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Mode <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value as 'Online' | 'In-Person' | 'Hybrid')}
                        style={{
                          width: '100%',
                          border: '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '9px 12px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          background: '#ffffff',
                          outline: 'none',
                        }}
                      >
                        <option value="Online">Online</option>
                        <option value="In-Person">In-Person</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Start Time <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          placeholder="10:00 AM"
                          style={{
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '9px 12px 9px 32px',
                            fontSize: '0.88rem',
                            color: '#0f172a',
                            outline: 'none',
                          }}
                        />
                        <Clock size={15} style={{ position: 'absolute', left: '10px', top: '11px', color: '#64748b' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        End Time
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          placeholder="5:00 PM"
                          style={{
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '9px 12px 9px 32px',
                            fontSize: '0.88rem',
                            color: '#0f172a',
                            outline: 'none',
                          }}
                        />
                        <Clock size={15} style={{ position: 'absolute', left: '10px', top: '11px', color: '#64748b' }} />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Venue */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                      Venue {mode !== 'Online' && <span style={{ color: '#ef4444' }}>*</span>}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        placeholder={mode === 'Online' ? 'Online / Zoom / Meet' : 'e.g. IIT Delhi / VIPS Campus'}
                        style={{
                          width: '100%',
                          border: errors.venue ? '1px solid #ef4444' : '1px solid #e2e8f0',
                          borderRadius: '10px',
                          padding: '9px 12px 9px 32px',
                          fontSize: '0.88rem',
                          color: '#0f172a',
                          outline: 'none',
                        }}
                      />
                      <MapPin size={16} style={{ position: 'absolute', left: '10px', top: '11px', color: '#64748b' }} />
                    </div>
                    {errors.venue && (
                      <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                        {errors.venue}
                      </span>
                    )}
                  </div>

                  {/* Row 5: Registration Deadline & Registration URL */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Registration Deadline
                      </label>
                      <DatePickerDropdown
                        value={registrationDeadline}
                        onChange={(d) => setRegistrationDeadline(d)}
                        placeholder="Select deadline"
                        hasError={!!errors.registrationDeadline}
                      />
                      {errors.registrationDeadline && (
                        <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                          {errors.registrationDeadline}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Registration URL / Portal
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="url"
                          value={registrationUrl}
                          onChange={(e) => setRegistrationUrl(e.target.value)}
                          placeholder="https://..."
                          style={{
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '9px 12px 9px 32px',
                            fontSize: '0.88rem',
                            color: '#0f172a',
                            outline: 'none',
                          }}
                        />
                        <LinkIcon size={15} style={{ position: 'absolute', left: '10px', top: '11px', color: '#64748b' }} />
                      </div>
                    </div>
                  </div>

                  {/* Row 6: Description */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value.substring(0, 2000))}
                      placeholder="Add a short description about the event..."
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '10px 12px',
                        fontSize: '0.88rem',
                        color: '#0f172a',
                        resize: 'vertical',
                        outline: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                    <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                      {description.length}/2000
                    </div>
                  </div>

                  {/* Form Submission Button */}
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      height: '46px',
                      background: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.94rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                    }}
                  >
                    <span>Add Event to Timeline</span>
                    <ArrowRight size={17} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Step 2: Review Extracted Details */
            <div
              className="review-step-card"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>
                    Review Extracted Event Details
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                    Verify or edit the extracted values before saving to your timeline.
                  </p>
                </div>
                <div
                  style={{
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#059669',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Check size={14} />
                  <span>94% Confidence</span>
                </div>
              </div>

              {/* Review Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '0.88rem',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                      Organiser
                    </label>
                    <input
                      type="text"
                      value={organiser}
                      onChange={(e) => setOrganiser(e.target.value)}
                      style={{
                        width: '100%',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '0.88rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as EventCategory)}
                      style={{
                        width: '100%',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '0.88rem',
                        background: '#ffffff',
                      }}
                    >
                      <option value="Hackathon">Hackathon</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Competition">Competition</option>
                      <option value="Internship">Internship</option>
                      <option value="Conference">Conference</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                      Event Date
                    </label>
                    <DatePickerDropdown
                      value={eventDate}
                      onChange={(d) => setEventDate(d)}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                      Registration Deadline
                    </label>
                    <DatePickerDropdown
                      value={registrationDeadline}
                      onChange={(d) => setRegistrationDeadline(d)}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Venue / Mode
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '0.88rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', display: 'block' }}>
                    Registration Link
                  </label>
                  <input
                    type="text"
                    value={registrationUrl}
                    onChange={(e) => setRegistrationUrl(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '0.88rem',
                    }}
                  />
                </div>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    style={{
                      background: 'transparent',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '10px 18px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#475569',
                      cursor: 'pointer',
                    }}
                  >
                    ← Back to Capture
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveEvent()}
                    style={{
                      background: '#2563eb',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 22px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Confirm & Add to Timeline</span>
                    <Check size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Widgets from reference image) */}
        <div className="add-event-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card 1: We'll help you organise it */}
          <div
            style={{
              background: '#eff6ff',
              border: '1px solid #dbeafe',
              borderRadius: '14px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#2563eb',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <Info size={14} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e3a8a', marginBottom: '4px' }}>
                  We'll help you organise it
                </div>
                <div style={{ fontSize: '0.78rem', color: '#3b82f6', lineHeight: 1.4 }}>
                  You can add event information in three ways. We'll extract the key details and you can review and edit them before saving.
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Preview Card */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '18px',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a', marginBottom: '2px' }}>
              Preview
            </div>
            <div style={{ fontSize: '0.76rem', color: '#64748b', marginBottom: '14px' }}>
              A live preview of the event will appear here.
            </div>

            {title.trim() ? (
              /* Live Preview of Filled Details */
              <div
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  background: '#f8fafc',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <EventThumbnail
                    type={category.toLowerCase().includes('hackathon') ? 'product-sprint' : 'ai-good'}
                    size={36}
                  />
                  <div>
                    <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'block' }}>
                      {title}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {organiser || 'Organiser'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                  <span className="event-tag">{category}</span>
                  <span className="event-tag">{mode}</span>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Clock size={12} />
                  <span>{startTime} {endTime ? `– ${endTime}` : ''}</span>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={12} />
                  <span>{venue || (mode === 'Online' ? 'Online' : 'Venue TBD')}</span>
                </div>
              </div>
            ) : (
              /* Empty Preview Placeholder illustration */
              <div
                style={{
                  border: '1px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '24px 16px',
                  textAlign: 'center',
                  background: '#f8fafc',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px auto',
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b', marginBottom: '4px' }}>
                  No preview yet
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.35 }}>
                  Add event information to see a preview here. You can review and edit all details before saving.
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Tips for better results */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Lightbulb size={16} style={{ color: '#f59e0b' }} />
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                Tips for better results
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Include event name, organiser and date',
                'Add venue or mention if it\'s online',
                'Share registration deadline if available',
                'Include a brief description',
                'Links to official event pages work best',
              ].map((tip, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={14} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.3 }}>
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Supported formats */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: '#f5f3ff',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileCode size={14} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                Supported formats
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '14px' }}>
              You can upload images, PDFs or text files.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {/* Images */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '8px',
                  padding: '10px 6px',
                  textAlign: 'center',
                }}
              >
                <ImageIcon size={18} style={{ color: '#9333ea', margin: '0 auto 4px auto' }} />
                <div style={{ fontWeight: 700, fontSize: '0.74rem', color: '#1e293b' }}>
                  Images
                </div>
                <div style={{ fontSize: '0.66rem', color: '#64748b' }}>
                  JPG, PNG, WEBP
                </div>
              </div>

              {/* PDF */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '8px',
                  padding: '10px 6px',
                  textAlign: 'center',
                }}
              >
                <FileText size={18} style={{ color: '#ef4444', margin: '0 auto 4px auto' }} />
                <div style={{ fontWeight: 700, fontSize: '0.74rem', color: '#1e293b' }}>
                  PDF
                </div>
                <div style={{ fontSize: '0.66rem', color: '#64748b' }}>
                  Upto 10 MB
                </div>
              </div>

              {/* Text Files */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '8px',
                  padding: '10px 6px',
                  textAlign: 'center',
                }}
              >
                <FileCode size={18} style={{ color: '#2563eb', margin: '0 auto 4px auto' }} />
                <div style={{ fontWeight: 700, fontSize: '0.74rem', color: '#1e293b' }}>
                  Text Files
                </div>
                <div style={{ fontSize: '0.66rem', color: '#64748b' }}>
                  TXT, DOCX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
