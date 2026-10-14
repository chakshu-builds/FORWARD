import React from 'react';
import type { RecentlyAddedItem } from '../types';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { EventThumbnail } from './EventThumbnail';

interface RecentlyAddedCardProps {
  items: RecentlyAddedItem[];
  onSelectItem: (item: RecentlyAddedItem) => void;
  onViewAll: () => void;
}

export const RecentlyAddedCard: React.FC<RecentlyAddedCardProps> = ({
  items,
  onSelectItem,
  onViewAll
}) => {
  return (
    <div className="dashboard-panel split-subpanel">
      <div className="panel-header-row">
        <h3 className="panel-sub-title">Recently Added</h3>
        <button className="panel-view-all-btn" onClick={onViewAll}>
          <span>View All</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="recently-added-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="recently-added-row-item"
            onClick={() => onSelectItem(item)}
            role="button"
            tabIndex={0}
          >
            <EventThumbnail type={item.thumbnailType} size={36} />

            <div className="recent-text-col">
              <span className="recent-title-text">{item.title}</span>
              <span className="recent-org-text">{item.organizer}</span>
            </div>

            <div className="recent-meta-col">
              <span className="recent-time-text">{item.timeAgo}</span>
              <ChevronRight size={16} className="chevron-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
