import { supabase } from "../lib/supabase";
import { NewFavorite } from "../models/favorite.model";

export async function getFavoriteByUserId(wishlist_id: string) {
  const { data, error } = await supabase
    .from("favorite")
    .select("*")
    .eq("wishlist_id", wishlist_id);

  if (error) {
    console.error("Lỗi lấy favorite: ", error.message);
    return [];
  }

  return data;
}

export async function addNewFavorite(favorite: NewFavorite) {
  const { data, error } = await supabase
    .from("favorite")
    .insert([favorite])
    .select();

  if (error) {
    console.error("Lỗi lưu favorite: ", error.message);
    return null;
  }

  return data;
}
