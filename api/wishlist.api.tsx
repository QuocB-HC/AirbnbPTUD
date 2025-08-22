import { supabase } from "../lib/supabase";
import { NewWishlist } from "../models/wishlist.model";

export async function getWishListByUserId(user_id: string) {
  const { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error("Lỗi lấy wishlist: ", error.message);
    return [];
  }

  return data;
}

export async function addNewWishlist(wishlist: NewWishlist) {
  const { data, error } = await supabase
    .from("wishlist")
    .insert([wishlist])
    .select();

  if (error) {
    console.error("Lỗi lưu wishlist: ", error.message);
    return null;
  }

  return data;
}
