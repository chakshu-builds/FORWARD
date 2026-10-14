import { useState } from 'react';
import type { ExtractionDraft } from '../types';
import { X, Check, AlertTriangle, ArrowRight, ExternalLink, Calendar, MapPin, Clock } from 'lucide-react';

interface ExtractionReviewModalProps {
  isOpen: boolean;
  draft: ExtractionDraft;
  onClose: () => void;
  onConfirm: (finalData: ExtractionDraft) => void;
  onTriggerConflictReview: () => void;
}

export const ExtractionReviewModal: React.FC<ExtractionReviewModalProps> = ({
  isOpen,
  draft,
  onClose,
  onConfirm,
  onTriggerConflictReview,
}) => {
  const [formData, setFormData] = useState<ExtractionDraft>({ ...draft });

  if (!isOpen) return null;

  const handleChange = (field: keyof ExtractionDraft, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="brand-icon-box" style={{ width: 28, height: 28, background: '#10b981' }}>
              <Check size={16} />
            </div>
            <div>
              <h2 className="modal-title">Review Extracted Event Details</h2>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Simulated extraction result — verify values or resolve detected discrepancies
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Quality & Conflict Alert Banner */}
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <AlertTriangle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#fef08a', fontSize: '0.82rem' }}>
                  Potential Discrepancy & Low-Confidence Fields Flagged
                </strong>
                <p style={{ fontSize: '0.76rem', color: '#fcd34d', margin: 0 }}>
                  Venue differs from previous calendar notice. Reporting time marked for manual verification.
                </p>
              </div>
            </div>

            <button
              className="btn-secondary btn-sm"
              style={{ borderColor: 'rgba(245, 158, 11, 0.5)', color: '#fbbf24' }}
              onClick={onTriggerConflictReview}
              id="review-conflict-trigger-btn"
            >
              <span>Review Conflict (Side-by-Side)</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Form Fields Grid */}
          <div className="extraction-fields-grid">
            <div className="form-group full-width">
              <label className="form-label">
                <span>Event Title</span>
                <span className="prototype-tag" style={{ fontSize: '0.65rem' }}>High Confidence</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Organizer / Department</label>
              <input
                type="text"
                className="form-input"
                value={formData.organizer}
                onChange={(e) => handleChange('organizer', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-input"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Registration Deadline</span>
                <Calendar size={13} style={{ color: '#818cf8' }} />
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.registrationDeadline}
                onChange={(e) => handleChange('registrationDeadline', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Event Date Window</span>
                <Calendar size={13} style={{ color: '#818cf8' }} />
              </label>
              <input
                type="text"
                className="form-input"
                value={`${formData.eventStartDate.split('T')[0]} to ${formData.eventEndDate.split('T')[0]}`}
                onChange={(e) => handleChange('eventStartDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span style={{ color: '#fcd34d' }}>Reporting Time (Requires Confirmation)</span>
                <Clock size={13} style={{ color: '#f59e0b' }} />
              </label>
              <input
                type="text"
                className="form-input low-confidence"
                value={formData.reportingTime}
                onChange={(e) => handleChange('reportingTime', e.target.value)}
              />
              <span style={{ fontSize: '0.7rem', color: '#f59e0b', marginTop: '0.2rem' }}>
                Extracted from: "08:30 AM IST sharp (Gate 4 registration desk)"
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span style={{ color: '#fcd34d' }}>Venue (Changed in New Circular)</span>
                <MapPin size={13} style={{ color: '#f59e0b' }} />
              </label>
              <input
                type="text"
                className="form-input low-confidence"
                value={formData.venue}
                onChange={(e) => handleChange('venue', e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                <span>Registration / Portal Link</span>
                <ExternalLink size={13} style={{ color: '#818cf8' }} />
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.registrationUrl}
                onChange={(e) => handleChange('registrationUrl', e.target.value)}
              />
            </div>
          </div>

          {/* Source Evidence Snippet */}
          <div className="form-group">
            <label className="form-label">
              <span>Source Notice Snippet & Grounding Evidence</span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Extracted from {formData.sourceChannel} Notice
              </span>
            </label>
            <div className="source-evidence-card">
              Due to university convocation rehearsals, HackShift 2026 finals venue has been relocated:
              <br />
              <span className="highlight-snippet">
                New Venue: Tech Park Innovation Hall 3 (NOT Main Auditorium).
              </span>{' '}
              <span className="highlight-snippet">Reporting Time: 08:30 AM IST sharp.</span> Confirmation
              deadline: March 28.
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-secondary"
            onClick={onTriggerConflictReview}
            style={{ color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.4)' }}
          >
            Review Conflict First
          </button>
          <button
            className="btn-primary"
            onClick={() => onConfirm(formData)}
            id="confirm-event-btn"
          >
            <Check size={16} />
            <span>Confirm Event to Timeline</span>
          </button>
        </div>
      </div>
    </div>
  );
};
