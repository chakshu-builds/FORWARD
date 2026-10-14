import { useState, useEffect } from 'react';
import type { ExtractionDraft } from '../types';
import { SAMPLE_CAPTURE_PRESETS, SAMPLE_EXTRACTION_RESULT } from '../data/mockData';
import { X, FileText, UploadCloud, Link as LinkIcon, Sparkles, Check, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface CaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExtractionSuccess: (draft: ExtractionDraft) => void;
}

export const CaptureModal: React.FC<CaptureModalProps> = ({
  isOpen,
  onClose,
  onExtractionSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'file' | 'link'>('text');
  const [textInput, setTextInput] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // Simulation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setIsProcessing(false);
      setProcessingStep(0);
      setTextInput(SAMPLE_CAPTURE_PRESETS.textSnippet);
      setLinkInput(SAMPLE_CAPTURE_PRESETS.sampleUrl);
      setSelectedFileName(SAMPLE_CAPTURE_PRESETS.flyerName);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setProcessingStep(1);

    const t1 = setTimeout(() => {
      setProcessingStep(2);
    }, 600);

    const t2 = setTimeout(() => {
      setProcessingStep(3);
    }, 1200);

    const t3 = setTimeout(() => {
      setIsProcessing(false);
      onExtractionSuccess(SAMPLE_EXTRACTION_RESULT);
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const handleSkipToResult = () => {
    setIsProcessing(false);
    onExtractionSuccess(SAMPLE_EXTRACTION_RESULT);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="brand-icon-box" style={{ width: 28, height: 28 }}>
              <Sparkles size={15} />
            </div>
            <div>
              <h2 className="modal-title">Capture Campus Opportunity</h2>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Forward text notices, flyers, or portal links into your timeline
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {isProcessing ? (
          <div className="processing-simulation-card">
            <div className="spinner-pulse" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
              Simulating Event Extraction...
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', maxWidth: '420px' }}>
              Prototype demonstration: Analyzing notice text structure, recognizing dates, and cross-referencing timeline for discrepancies.
            </p>

            <div className="process-steps-log">
              <div className="process-step-row" style={{ color: processingStep >= 1 ? '#34d399' : '#64748b' }}>
                {processingStep > 1 ? <Check size={14} /> : <Loader2 size={14} className="spin" />}
                <span>Stage 1: Parsing notice entities & organizer headers</span>
              </div>
              <div className="process-step-row" style={{ color: processingStep >= 2 ? '#34d399' : '#64748b' }}>
                {processingStep > 2 ? <Check size={14} /> : processingStep === 2 ? <Loader2 size={14} className="spin" /> : <div style={{ width: 14 }} />}
                <span>Stage 2: Identifying dates, reporting deadlines & venue location</span>
              </div>
              <div className="process-step-row" style={{ color: processingStep >= 3 ? '#34d399' : '#64748b' }}>
                {processingStep >= 3 ? <Check size={14} /> : <div style={{ width: 14 }} />}
                <span>Stage 3: Running conflict heuristic & generating review draft</span>
              </div>
            </div>

            <button
              className="btn-secondary btn-sm"
              onClick={handleSkipToResult}
              style={{ marginTop: '0.5rem' }}
            >
              Skip simulation animation →
            </button>
          </div>
        ) : (
          <>
            <div className="capture-tabs-nav">
              <button
                className={`capture-tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                onClick={() => setActiveTab('text')}
              >
                <FileText size={15} />
                <span>Paste Text</span>
              </button>

              <button
                className={`capture-tab-btn ${activeTab === 'file' ? 'active' : ''}`}
                onClick={() => setActiveTab('file')}
              >
                <UploadCloud size={15} />
                <span>Upload File (PDF / Image)</span>
              </button>

              <button
                className={`capture-tab-btn ${activeTab === 'link' ? 'active' : ''}`}
                onClick={() => setActiveTab('link')}
              >
                <LinkIcon size={15} />
                <span>Add Link</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="sample-preset-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={15} style={{ color: '#818cf8' }} />
                  <span>
                    <strong>Prototype Demonstration:</strong> Clicking process uses verified sample mock extraction.
                  </span>
                </div>
                <button
                  className="btn-secondary btn-sm"
                  onClick={() => {
                    setTextInput(SAMPLE_CAPTURE_PRESETS.textSnippet);
                    setSelectedFileName(SAMPLE_CAPTURE_PRESETS.flyerName);
                    setLinkInput(SAMPLE_CAPTURE_PRESETS.sampleUrl);
                  }}
                >
                  Reload Sample
                </button>
              </div>

              {activeTab === 'text' && (
                <div className="form-group">
                  <label className="form-label">
                    <span>Forwarded Message / Announcement Text</span>
                    <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>WhatsApp, Telegram, or Email content</span>
                  </label>
                  <textarea
                    rows={8}
                    className="form-input"
                    style={{ resize: 'vertical', lineHeight: 1.45, fontFamily: 'var(--font-sans)' }}
                    placeholder="Paste event notice or circular text here..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                </div>
              )}

              {activeTab === 'file' && (
                <div
                  className="capture-dropzone"
                  onClick={() => setSelectedFileName('HackShift_2026_Circular_V2.pdf')}
                  style={{ cursor: 'pointer' }}
                >
                  <UploadCloud size={40} style={{ color: '#818cf8' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                      Drop your poster, flyer screenshot, or PDF circular
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                      Supports PNG, JPG, or PDF brochures up to 15MB
                    </p>
                  </div>
                  {selectedFileName ? (
                    <div
                      style={{
                        padding: '0.4rem 0.8rem',
                        background: 'rgba(99, 102, 241, 0.15)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        color: '#c7d2fe',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <FileText size={14} />
                      <span>Selected sample file: <strong>{selectedFileName}</strong></span>
                    </div>
                  ) : (
                    <button className="btn-secondary btn-sm">Click to select sample file</button>
                  )}
                </div>
              )}

              {activeTab === 'link' && (
                <div className="form-group">
                  <label className="form-label">
                    <span>Event or Registration Portal URL</span>
                    <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>Devfolio, Unstop, Luma, Devpost, etc.</span>
                  </label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://devfolio.co/hackathons/..."
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                  />
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>
                    Sample URL prefilled for HackShift 2026 developer registration.
                  </p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleStartProcessing} id="simulate-extraction-btn">
                <Sparkles size={15} />
                <span>Process Notice (Simulated Extraction)</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
