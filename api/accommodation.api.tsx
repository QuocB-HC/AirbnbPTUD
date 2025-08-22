import { supabase } from "../lib/supabase";

export async function fetchAccommodations() {
  const { data, error } = await supabase.from("accommodation").select("*");

  if (error) {
    console.error("Error loading data:", error);
    return [];
  }

  return data;
}

export async function getRoomByAccommodationId(accommodationId: string) {
  const { data, error } = await supabase
    .from("accommodation_room")
    .select("*")
    .eq("accommodation_id", accommodationId);

  if (error) {
    console.error("Error loading room: ", error);
    return [];
  }

  return data;
}

export async function getAccommodationByCityId(cityId: number) {
  const { data, error } = await supabase
    .from("accommodation")
    .select("*")
    .eq("city", cityId);

  if (error) {
    console.error("Error loading accommodation by city: ", error);
    return [];
  }

  return data;
}

export async function getAccommodationByHostId(hostId: string) {
  const { data, error } = await supabase
    .from("accommodation")
    .select("*")
    .eq("host_id", hostId);

  if (error) {
    console.error("Lỗi lấy accommodation với host id: ", error.message);
    return [];
  }

  return data;
}
