import { supabase } from "../lib/supabase";

export async function getAmenitiesByAccommodationId(accommodationId: string) {
  const { data, error } = await supabase
    .from("accommodation_amenities")
    .select(
      `
    amenities (
      id,
      name,
      icon_path,
      description,
      category
    )
  `
    )
    .eq("accommodation_id", accommodationId);

  if (error) {
    console.error("Lỗi lấy amenity:", error.message);
    return [];
  }

  return data.flatMap(item => item.amenities);
}
