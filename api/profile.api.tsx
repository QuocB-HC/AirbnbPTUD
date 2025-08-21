import { supabase } from "../lib/supabase"; // đường dẫn tới instance Supabase của bạn

export async function getProfileById(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle(); // chỉ lấy 1 user

  if (error) {
    console.error("Lỗi lấy user:", error.message);
    return null;
  }

  if (!data) return null;

  return data;
}

export async function getProfileUserTypeById(user_id: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("user_type")
      .eq("id", user_id)
      .single();

    if (error) throw error;

    return data?.user_type || null;
  } catch (err: any) {
    console.error("Error fetching user type of profile: ", err.message);
    return null;
  }
}

export async function getProfileOfHost() {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_type", "Host");

    if (error) throw error;

    return data;
  } catch (err: any) {
    console.error("Error fetching host: ", err.message);
    return [];
  }
}
