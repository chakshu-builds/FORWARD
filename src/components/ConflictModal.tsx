import { useState } from 'react';
import type { EventItem } from '../types';
import { X, CheckCircle2, GitMerge, FileText, ArrowRight } from 'lucide-react';

interface ConflictModalProps {
  isOpen: boolean;
  event: EventItem | null;
  onClose: () => void;
  onResolve: (decision: 'keep' | 'update' | 'manual', manualValue?: string) => void;
}

export const ConflictModal: React.FC<ConflictModalProps> = ({
  isOpen,
  event,
  onClose,
  onResolve,
}) => {
  const [manualOverrideValue, setManualOverrideValue] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);

  if (!isOpen || !event || !event.conflict) return null;

  const conflict = event.conflict;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="brand-icon-box" style={{ width: 28, height: 28, background: '#f59e0b' }}>
              <GitMerge size={16} />
            </div>
            <div>
              <h2 className="modal-title">Discrepancy Reconciliation</h2>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Reconciling conflicting information detected between multiple campus notices
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                {event.title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Field with conflicting values: <strong style={{ color: '#fbbf24' }}>{conflict.fieldLabel}</strong>
              </p>
            </div>
            <span className="prototype-tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fcd34d' }}>
              Heuristic Reconciler
            </span>
          </div>

          <div
            style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0,0,0,0.25)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: '#cbd5e1',
            }}
          >
            <strong>System context:</strong> {conflict.explanation}
          </div>

          {/* Side-by-Side Comparison */}
          <div className="conflict-comparison-grid">
            {/* Current Value */}
            <div className="comparison-box">
              <div className="comparison-header">
                <span>PREVIOUSLY RECORDED VALUE</span>
                <span className="badge badge-source">Notice #1</span>
              </div>
              <div className="comparison-value" style={{ color: '#fca5a5' }}>
                {conflict.currentValue}
              </div>
              <div className="comparison-source">
                <FileText size={13} />
                <span>Source: {conflict.currentSource}</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Date Received: {conflict.currentSourceDate}
              </div>
            </div>

            {/* Incoming Update */}
            <div className="comparison-box incoming">
              <div className="comparison-header">
                <span style={{ color: '#818cf8', fontWeight: 600 }}>NEWLY DETECTED VALUE</span>
                <span className="badge badge-status-Submitted">Notice #2 (Newer)</span>
              </div>
              <div className="comparison-value" style={{ color: '#6ee7b7' }}>
                {conflict.newValue}
              </div>
              <div className="comparison-source">
                <FileText size={13} />
                <span>Source: {conflict.newSource}</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Date Detected: {conflict.newSourceDate}
              </div>
            </div>
          </div>

          {isManualMode && (
            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <label className="form-label">
                <span>Custom Reconciled Value</span>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Specify exact verified details</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Tech Park Innovation Hall 3, 08:30 AM (Confirmed with ACM Head)"
                value={manualOverrideValue}
                onChange={(e) => setManualOverrideValue(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            {!isManualMode ? (
              <button
                className="btn-secondary btn-sm"
                onClick={() => {
                  setIsManualMode(true);
                  setManualOverrideValue(conflict.newValue);
                }}
              >
                Review Manually...
              </button>
            ) : (
              <button
                className="btn-secondary btn-sm"
                onClick={() => setIsManualMode(false)}
              >
                Cancel Custom Override
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              className="btn-secondary"
              onClick={() => onResolve('keep')}
              id="keep-current-btn"
            >
              <span>Keep Current</span>
            </button>

            {isManualMode ? (
              <button
                className="btn-primary"
                onClick={() => onResolve('manual', manualOverrideValue)}
                disabled={!manualOverrideValue.trim()}
              >
                <CheckCircle2 size={16} />
                <span>Apply Custom Value</span>
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={() => onResolve('update')}
                id="accept-update-btn"
              >
                <CheckCircle2 size={16} />
                <span>Accept Update ({conflict.newValue.split(',')[0]})</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
