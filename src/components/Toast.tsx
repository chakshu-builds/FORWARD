import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = '#10b981';

        if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = '#f59e0b';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = '#6366f1';
        }

        return (
          <div key={toast.id} className={`toast-pill ${toast.type}`}>
            <Icon size={18} style={{ color: iconColor, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ display: 'block', fontSize: '0.82rem', color: '#f8fafc' }}>
                {toast.title}
              </strong>
              {toast.description && (
                <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                  {toast.description}
                </span>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              style={{ color: '#64748b', padding: '2px', display: 'flex' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
