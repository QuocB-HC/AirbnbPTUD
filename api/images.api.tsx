import { supabase } from "../lib/supabase";

export async function getImageByAccommodationId(accommodationId: string) {
  const { data, error } = await supabase
    .from("accommodation_images")
    .select("*")
    .eq("accommodation_id", accommodationId);

  if (error) {
    console.error("Error loading images: ", error);
    return [];
  }

  return data;
};
