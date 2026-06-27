import React from 'react';
import { CalendarX, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  onResetFilter: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onResetFilter }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrapper">
        <CalendarX size={40} />
      </div>
      <h3 className="empty-title">No Bookings Found</h3>
      <p className="empty-description">
        There are no bookings matching the selected status filter. Select a different filter or add a new booking.
      </p>
      <button onClick={onResetFilter} className="btn-reset">
        <RefreshCw size={16} />
        Reset Filter
      </button>
    </div>
  );
};
