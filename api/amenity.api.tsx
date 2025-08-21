import { supabase } from "../lib/supabase";
import { Amenity, NewAmenity } from "../models/amenity.model";

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

  return data.flatMap((item) => item.amenities);
}

export async function getAllamenity() {
  const { data, error } = await supabase.from("amenities").select("*");

  if (error) {
    console.error("Lỗi lấy amenity:", error.message);
    return [];
  }

  return data;
}

export async function addNewAmenity(amenity: NewAmenity) {
  const { data, error } = await supabase
    .from("amenities")
    .insert([amenity])
    .select();

  if (error) {
    console.error("Lỗi lưu amenity:", error.message);
    return null;
  }

  return data;
}
