import { useState, useEffect } from 'react';
import type { Booking } from './data/bookings';
import { INITIAL_BOOKINGS } from './data/bookings';
import { BookingCard } from './components/BookingCard';
import { BookingForm } from './components/BookingForm';
import { EmptyState } from './components/EmptyState';
import { SchedulerWidget } from './components/SchedulerWidget';
import { 
  Activity, 
  Clock, 
  Search, 
  ListTodo, 
  CalendarPlus,
  CalendarDays,
  Database,
  CheckCircle,
  AlertCircle,
  XCircle,
  Heart
} from 'lucide-react';

function App() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScheduler, setShowScheduler] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Stats counters (derived state based on full bookings list)
  const totalCount = bookings.length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  // Filter and search logic
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = 
      booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.sessionType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handler to add booking
  const handleAddBooking = (newBooking: Omit<Booking, 'id'>) => {
    const nextId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
    const bookingToAdd: Booking = {
      id: nextId,
      ...newBooking
    };
    setBookings(prev => [bookingToAdd, ...prev]);
  };

  // Handler to reset filter
  const handleResetFilter = () => {
    setStatusFilter('all');
    setSearchQuery('');
  };

  // Format date-time for header clock
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">
            <Activity />
          </div>
          <div>
            <h1>KonnectStudios</h1>
            <div className="logo-text-sub">Studio Booking Management</div>
          </div>
        </div>
        
        <div className="system-status">
          <div className="live-time" title="System Local Time">
            <Clock />
            <span>{formatDate(time)} &bull; {formatTime(time)}</span>
          </div>
        </div>
      </header>

      {/* Stats Cards Section */}
      <section className="stats-grid" aria-label="Bookings statistics">
        <div className="stat-card" style={{ '--stat-accent': 'var(--accent-purple)' } as React.CSSProperties}>
          <div className="stat-info">
            <span className="stat-label">Total Bookings</span>
            <span className="stat-value">{totalCount}</span>
          </div>
          <div className="stat-icon-wrapper">
            <Database />
          </div>
        </div>

        <div className="stat-card" style={{ '--stat-accent': 'var(--status-confirmed-text)' } as React.CSSProperties}>
          <div className="stat-info">
            <span className="stat-label">Confirmed</span>
            <span className="stat-value">{confirmedCount}</span>
          </div>
          <div className="stat-icon-wrapper">
            <CheckCircle />
          </div>
        </div>

        <div className="stat-card" style={{ '--stat-accent': 'var(--status-pending-text)' } as React.CSSProperties}>
          <div className="stat-info">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{pendingCount}</span>
          </div>
          <div className="stat-icon-wrapper">
            <AlertCircle />
          </div>
        </div>

        <div className="stat-card" style={{ '--stat-accent': 'var(--status-cancelled-text)' } as React.CSSProperties}>
          <div className="stat-info">
            <span className="stat-label">Cancelled</span>
            <span className="stat-value">{cancelledCount}</span>
          </div>
          <div className="stat-icon-wrapper">
            <XCircle />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="dashboard-grid">
        {/* Left Column: Bookings list panel */}
        <section className="bookings-panel" aria-label="Bookings records">
          <div className="panel-header">
            <div className="panel-title">
              <ListTodo />
              <h2>Studio Bookings</h2>
            </div>

            {/* Tab Filter Control */}
            <div className="filter-tabs" role="tablist">
              <button 
                className={`filter-tab ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
                role="tab"
                aria-selected={statusFilter === 'all'}
              >
                All <span className="filter-count">{totalCount}</span>
              </button>
              <button 
                className={`filter-tab ${statusFilter === 'confirmed' ? 'active' : ''}`}
                onClick={() => setStatusFilter('confirmed')}
                role="tab"
                aria-selected={statusFilter === 'confirmed'}
              >
                Confirmed <span className="filter-count">{confirmedCount}</span>
              </button>
              <button 
                className={`filter-tab ${statusFilter === 'pending' ? 'active' : ''}`}
                onClick={() => setStatusFilter('pending')}
                role="tab"
                aria-selected={statusFilter === 'pending'}
              >
                Pending <span className="filter-count">{pendingCount}</span>
              </button>
              <button 
                className={`filter-tab ${statusFilter === 'cancelled' ? 'active' : ''}`}
                onClick={() => setStatusFilter('cancelled')}
                role="tab"
                aria-selected={statusFilter === 'cancelled'}
              >
                Cancelled <span className="filter-count">{cancelledCount}</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by client name or session type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search bookings"
            />
          </div>

          {/* Bookings cards stack */}
          <div className="bookings-list">
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <EmptyState onResetFilter={handleResetFilter} />
            )}
          </div>
        </section>

        {/* Right Column: Sidebar Form & Calendar Embed */}
        <section className="sidebar-panels" aria-label="Booking administration">
          {/* Add Booking Form Panel */}
          <div className="form-panel">
            <div className="form-title-section">
              <CalendarPlus />
              <h2>Add Booking</h2>
            </div>
            <BookingForm onAddBooking={handleAddBooking} />

            {/* Calendly/Cal.com Widget Section (Bonus) */}
            <div className="scheduler-section">
              <div className="scheduler-header">
                <div className="scheduler-title-info">
                  <CalendarDays />
                  <h2>Self-Scheduler</h2>
                </div>
                <span className="stretch-badge">Bonus Goal</span>
              </div>
              
              <button 
                onClick={() => setShowScheduler(!showScheduler)} 
                className={`toggle-widget-btn ${showScheduler ? 'active' : ''}`}
              >
                {showScheduler ? 'Close Live Scheduler' : 'Open Live Scheduler'}
              </button>

              {showScheduler && <SchedulerWidget />}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Designed &amp; built with <Heart size={14} /> for KonnectStudios &bull; Full Stack Developer Assessment
        </p>
      </footer>
    </div>
  );
}

export default App;
