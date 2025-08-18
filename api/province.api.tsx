import { supabase } from "../lib/supabase"; // đường dẫn tới instance Supabase của bạn

export async function getAllProvince() {
  const { data, error } = await supabase.from("provinces").select("*");

  if (error) {
    console.error("Lỗi lấy province:", error.message);
    return [];
  }

  return data;
}

export async function getProvinceById(provinceId: any) {
  const { data, error } = await supabase
    .from("provinces")
    .select("*")
    .eq("id", provinceId)
    .single();

  if (error) {
    console.error("Lỗi lấy province:", error.message);
    return null;
  }

  return data;
}
