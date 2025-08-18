import { supabase } from "../lib/supabase";

export async function getFeaturesByAccommodationId(accommodationId: string) {
  const { data, error } = await supabase
    .from("accommodation_features")
    .select(
      `
    features (
      id,
      name,
      icon_path,
      description
    )
  `
    )
    .eq("accommodation_id", accommodationId);

  if (error) {
    console.error("Lỗi lấy feature:", error.message);
    return [];
  }

  return data.flatMap(item => item.features);
}
