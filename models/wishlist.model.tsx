export interface Wishlist {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface NewWishlist {
  user_id: string;
  name: string;
}
