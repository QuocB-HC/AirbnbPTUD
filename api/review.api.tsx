import { supabase } from "../lib/supabase";

export async function getReviewsByAccommodationId(accommodationId: string) {
  const { data, error } = await supabase
    .from("review")
    .select("*")
    .eq("accommodation_id", accommodationId);

  if (error) {
    console.error("Lỗi lấy review:", error.message);
    return [];
  }

  return data;
}
