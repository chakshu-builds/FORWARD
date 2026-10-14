import React from 'react';
import type { AttentionItem } from '../types';
import { AlertTriangle, Info, RefreshCw, ChevronRight, ArrowRight } from 'lucide-react';

interface NeedsAttentionCardProps {
  items: AttentionItem[];
  onSelectItem: (item: AttentionItem) => void;
  onViewAll: () => void;
}

export const NeedsAttentionCard: React.FC<NeedsAttentionCardProps> = ({
  items,
  onSelectItem,
  onViewAll
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'conflict':
        return (
          <div className="attention-icon-box bg-red-tint">
            <AlertTriangle size={18} className="text-red" strokeWidth={2.2} />
          </div>
        );
      case 'missing_info':
        return (
          <div className="attention-icon-box bg-orange-tint">
            <Info size={18} className="text-orange" strokeWidth={2.2} />
          </div>
        );
      case 'update':
        return (
          <div className="attention-icon-box bg-blue-tint">
            <RefreshCw size={18} className="text-blue" strokeWidth={2.2} />
          </div>
        );
      default:
        return (
          <div className="attention-icon-box bg-blue-tint">
            <Info size={18} className="text-blue" />
          </div>
        );
    }
  };

  return (
    <div className="dashboard-panel split-subpanel">
      <div className="panel-header-row">
        <h3 className="panel-sub-title">Needs Attention</h3>
        <button className="panel-view-all-btn" onClick={onViewAll}>
          <span>View All</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="attention-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="attention-row-item"
            onClick={() => onSelectItem(item)}
            role="button"
            tabIndex={0}
          >
            {getIcon(item.type)}

            <div className="attention-text-col">
              <span className="attention-title-text">{item.title}</span>
              <span className="attention-event-text">{item.eventTitle}</span>
            </div>

            <div className="attention-meta-col">
              <span className="attention-time-text">{item.timeAgo}</span>
              <ChevronRight size={16} className="chevron-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
