export interface Favorite {
  id: string;
  wishlist_id: string;
  accommodation_id: string;
  created_at: string;
  updated_at: string;
}

export interface NewFavorite {
  wishlist_id: string;
  accommodation_id: string;
}
