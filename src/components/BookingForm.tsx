import React, { useState } from 'react';
import type { Booking } from '../data/bookings';
import { User, Video, Calendar, ShieldAlert, Plus, HelpCircle } from 'lucide-react';

interface BookingFormProps {
  onAddBooking: (booking: Omit<Booking, 'id'>) => void;
}

interface FormState {
  clientName: string;
  sessionType: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface FormErrors {
  clientName?: string;
  sessionType?: string;
  date?: string;
  status?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onAddBooking }) => {
  const [form, setForm] = useState<FormState>({
    clientName: '',
    sessionType: '',
    date: '',
    status: 'pending' // default status
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Get today's date string in local YYYY-MM-DD format for min date restriction
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Client name validation
    if (!form.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    } else if (form.clientName.trim().length < 3) {
      newErrors.clientName = 'Client name must be at least 3 characters';
    }

    // Session type validation
    if (!form.sessionType) {
      newErrors.sessionType = 'Please select a session type';
    }

    // Date validation
    if (!form.date) {
      newErrors.date = 'Date is required';
    } else {
      // Check if date is in the past (comparing with local date at 00:00)
      const selectedParts = form.date.split('-');
      const selectedDate = new Date(
        parseInt(selectedParts[0], 10),
        parseInt(selectedParts[1], 10) - 1,
        parseInt(selectedParts[2], 10)
      );
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    // Status validation
    if (!form.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAddBooking({
        clientName: form.clientName.trim(),
        sessionType: form.sessionType,
        date: form.date,
        status: form.status
      });
      // Reset form
      setForm({
        clientName: '',
        sessionType: '',
        date: '',
        status: 'pending'
      });
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error as user types/interacts
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Client Name */}
      <div className="form-group">
        <label htmlFor="clientName" className="form-label">
          Client Name
          {errors.clientName && <span className="error-message"><ShieldAlert size={12} /> {errors.clientName}</span>}
        </label>
        <div className="form-input-wrapper">
          <User size={18} />
          <input
            type="text"
            id="clientName"
            name="clientName"
            className={`form-input ${errors.clientName ? 'has-error' : ''}`}
            placeholder="e.g. Mia Chen"
            value={form.clientName}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Session Type */}
      <div className="form-group">
        <label htmlFor="sessionType" className="form-label">
          Session Type
          {errors.sessionType && <span className="error-message"><ShieldAlert size={12} /> {errors.sessionType}</span>}
        </label>
        <div className="form-input-wrapper">
          <Video size={18} />
          <select
            id="sessionType"
            name="sessionType"
            className={`form-select ${errors.sessionType ? 'has-error' : ''}`}
            value={form.sessionType}
            onChange={handleChange}
          >
            <option value="">Select session type...</option>
            <option value="Podcast Recording">Podcast Recording</option>
            <option value="Photography">Photography</option>
            <option value="Video Shoot">Video Shoot</option>
            <option value="Music Recording">Music Recording</option>
            <option value="Voiceover Session">Voiceover Session</option>
          </select>
        </div>
      </div>

      {/* Date */}
      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Booking Date
          {errors.date && <span className="error-message"><ShieldAlert size={12} /> {errors.date}</span>}
        </label>
        <div className="form-input-wrapper">
          <Calendar size={18} />
          <input
            type="date"
            id="date"
            name="date"
            className={`form-input ${errors.date ? 'has-error' : ''}`}
            min={getTodayDateString()}
            value={form.date}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Status */}
      <div className="form-group">
        <label htmlFor="status" className="form-label">
          Status
          {errors.status && <span className="error-message"><ShieldAlert size={12} /> {errors.status}</span>}
        </label>
        <div className="form-input-wrapper">
          <HelpCircle size={18} />
          <select
            id="status"
            name="status"
            className={`form-select ${errors.status ? 'has-error' : ''}`}
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="btn-submit">
        <Plus size={18} />
        Add Studio Booking
      </button>
    </form>
  );
};
