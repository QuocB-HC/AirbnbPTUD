import { supabase } from "../lib/supabase";
import { NewFeature } from "../models/feature.model";

export async function getAllFeature() {
  const { data, error } = await supabase.from("features").select("*");

  if (error) {
    console.error("Lỗi khi lấy feature: ", error.message);
    return [];
  }

  return data;
}

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

  return data.flatMap((item) => item.features);
}

export async function addNewFeature(feature: NewFeature) {
  const { data, error } = await supabase
    .from("features")
    .insert([feature])
    .select();

  if (error) {
    console.error("Lỗi khi thêm feature: ", error.message);
    return null;
  }

  return data;
}
