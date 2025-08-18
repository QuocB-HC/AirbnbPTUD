export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  accommodation_id: string;
  rating: number; // 1 to 5
  comment?: string;
  created_at: string;
  updated_at: string;
};
