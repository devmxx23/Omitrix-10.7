import React from 'react';
import type { Booking } from '../data/bookings';
import { 
  Mic, 
  Camera, 
  Video, 
  Music, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  HelpCircle
} from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { clientName, sessionType, date, status } = booking;

  // Get Initials for Client Avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get Session Type Icon
  const getSessionIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('podcast')) return <Mic size={16} />;
    if (lowerType.includes('photo')) return <Camera size={16} />;
    if (lowerType.includes('video') || lowerType.includes('shoot')) return <Video size={16} />;
    if (lowerType.includes('music') || lowerType.includes('audio') || lowerType.includes('recording')) return <Music size={16} />;
    return <HelpCircle size={16} />;
  };

  // Get Status Badge details
  const getStatusDetails = (statusStr: string) => {
    switch (statusStr) {
      case 'confirmed':
        return {
          icon: <CheckCircle size={12} />,
          className: 'confirmed'
        };
      case 'pending':
        return {
          icon: <AlertCircle size={12} />,
          className: 'pending'
        };
      case 'cancelled':
        return {
          icon: <XCircle size={12} />,
          className: 'cancelled'
        };
      default:
        return {
          icon: <HelpCircle size={12} />,
          className: ''
        };
    }
  };

  // Safe formatting to avoid timezone offset issue
  const formatBookingDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // 0-indexed
      const day = parseInt(parts[2], 10);
      
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const statusInfo = getStatusDetails(status);

  return (
    <div className="booking-card">
      {/* Client Info */}
      <div className="booking-client-info">
        <div className="client-avatar" title={clientName}>
          {getInitials(clientName) || '?'}
        </div>
        <span className="client-name">{clientName}</span>
      </div>

      {/* Session Type */}
      <div className="booking-session-info">
        {getSessionIcon(sessionType)}
        <span className="session-type">{sessionType}</span>
      </div>

      {/* Date */}
      <div className="booking-date-info">
        <Calendar size={16} />
        <span className="booking-date">{formatBookingDate(date)}</span>
      </div>

      {/* Status Badge */}
      <div className="booking-status-section">
        <span className={`status-badge ${statusInfo.className}`}>
          {statusInfo.icon}
          {status}
        </span>
      </div>
    </div>
  );
};
