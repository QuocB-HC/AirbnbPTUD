import { supabase } from "../lib/supabase"; // đường dẫn tới instance Supabase của bạn

export async function getCityById(cityId: any) {
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("id", cityId)
    .single();

  if (error) {
    console.error("Lỗi lấy city:", error.message);
    return [];
  }

  return data;
}

export async function getAllCity() {
  const { data, error } = await supabase.from("cities").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
