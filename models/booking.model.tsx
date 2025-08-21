export interface Booking {
  id: string;
  guest_id?: string;
  accommodation_id?: string;
  check_in_date: string; // or Date
  check_out_date: string; // or Date
  total_price: number;
  status:
    | "pending"
    | "confirmed"
    | "checkedIn"
    | "checkedOut"
    | "cancelled"
    | "refunded";
  created_at: string;
  updated_at: string;
}

export interface NewBooking {
  guest_id: string;
  accommodation_id: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  status?: string;
}
