import React from 'react';

export const SchedulerWidget: React.FC = () => {
  return (
    <div className="scheduler-embed-card">
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          This interactive scheduler demonstrates integration with a real booking provider (Cal.com). 
          Visitors can select a time slot and schedule an appointment directly below. 
          <em> Note: These scheduled meetings run independently of the local mock JSON list.</em>
        </p>
      </div>
      <div className="cal-embed-wrapper">
        <iframe
          src="https://cal.com/rick?theme=dark"
          title="Cal.com Schedule Widget"
          allow="geolocation; microphone; camera; calendar-write"
        ></iframe>
      </div>
    </div>
  );
};
