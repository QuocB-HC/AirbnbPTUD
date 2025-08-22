import { supabase } from "../lib/supabase";
import { NewAccommodationImage } from "../models/accommodation.model";

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
}

export async function addImage(newImage: NewAccommodationImage) {
  const { data, error } = await supabase
    .from("accommodation_images")
    .insert([newImage])
    .select();

  if (error) {
    console.error("Lỗi lưu hình ảnh: ", error.message);
    return null;
  }

  return data;
}
