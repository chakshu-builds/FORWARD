import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerDropdownProps {
  value: string; // YYYY-MM-DD or readable string
  onChange: (dateStr: string) => void;
  placeholder?: string;
  minDate?: string;
  hasError?: boolean;
  label?: string;
}

export const DatePickerDropdown: React.FC<DatePickerDropdownProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  minDate,
  hasError = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize view year & month from value or default to October 2026
  const initialDate = value && !isNaN(new Date(value).getTime()) ? new Date(value) : new Date(2026, 9, 14);
  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Build days grid
  const daysGrid = React.useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const days: { day: number; isCurrentMonth: boolean; dateStr: string; disabled: boolean }[] = [];

    // Prev month padding
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const m = viewMonth === 0 ? 11 : viewMonth - 1;
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        day: d,
        isCurrentMonth: false,
        dateStr,
        disabled: minDate ? dateStr < minDate : false,
      });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        day: d,
        isCurrentMonth: true,
        dateStr,
        disabled: minDate ? dateStr < minDate : false,
      });
    }

    // Next month padding to fill grid
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        day: d,
        isCurrentMonth: false,
        dateStr,
        disabled: minDate ? dateStr < minDate : false,
      });
    }

    return days;
  }, [viewYear, viewMonth, minDate]);

  const handleSelectDay = (dateStr: string, disabled: boolean) => {
    if (disabled) return;
    onChange(dateStr);
    setIsOpen(false);
  };

  const displayLabel = React.useMemo(() => {
    if (!value) return '';
    const parsed = new Date(value);
    if (isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }, [value]);

  return (
    <div className="custom-datepicker-wrap" ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <div
        className={`form-input-with-icon ${hasError ? 'input-error' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#ffffff',
          border: hasError ? '1px solid #ef4444' : '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '9px 12px',
          fontSize: '0.88rem',
          color: value ? '#0f172a' : '#94a3b8',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <CalendarIcon size={16} style={{ color: '#64748b', flexShrink: 0 }} />
          <span>{displayLabel || placeholder}</span>
        </div>
      </div>

      {isOpen && (
        <div
          className="datepicker-dropdown-popover"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 1050,
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
            padding: '16px',
            width: '280px',
            animation: 'fadeIn 0.15s ease',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>
              {monthNames[viewMonth]} {viewYear}
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous month"
                style={{
                  background: 'none',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next month"
                style={{
                  background: 'none',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '6px' }}>
            {daysOfWeek.map((day) => (
              <span key={day} style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8' }}>
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {daysGrid.map((item, idx) => {
              const isSelected = value && item.dateStr === value;
              const isToday = item.dateStr === '2026-10-14';

              return (
                <button
                  type="button"
                  key={idx}
                  disabled={item.disabled}
                  onClick={() => handleSelectDay(item.dateStr, item.disabled)}
                  style={{
                    height: '32px',
                    width: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    borderRadius: '50%',
                    background: isSelected ? '#2563eb' : isToday ? '#eff6ff' : 'transparent',
                    color: isSelected
                      ? '#ffffff'
                      : item.disabled
                      ? '#cbd5e1'
                      : !item.isCurrentMonth
                      ? '#cbd5e1'
                      : isToday
                      ? '#2563eb'
                      : '#1e293b',
                    fontSize: '0.82rem',
                    fontWeight: isSelected || isToday ? 700 : 500,
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    margin: 'auto',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected && !item.disabled) {
                      e.currentTarget.style.background = '#f1f5f9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected && !item.disabled) {
                      e.currentTarget.style.background = isToday ? '#eff6ff' : 'transparent';
                    }
                  }}
                >
                  {item.day}
                </button>
              );
            })}
          </div>

          {/* Quick Shortcuts */}
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => {
                onChange('2026-10-14');
                setIsOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Today (14 Oct)
            </button>
            <button
              type="button"
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
