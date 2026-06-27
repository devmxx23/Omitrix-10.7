export interface Booking {
  id: number;
  clientName: string;
  sessionType: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export const INITIAL_BOOKINGS: Booking[] = [
  { id: 1, clientName: "Mia Chen", sessionType: "Podcast Recording", date: "2026-07-02", status: "confirmed" },
  { id: 2, clientName: "Jordan Reyes", sessionType: "Photography", date: "2026-07-04", status: "pending" },
  { id: 3, clientName: "Aisha Patel", sessionType: "Video Shoot", date: "2026-06-28", status: "cancelled" }
];
