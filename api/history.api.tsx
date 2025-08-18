import { supabase } from "../lib/supabase";

export async function getHistoryCitiesByUserId(userId: string) {
  try {
    // 1. Lấy history_id của user (chỉ có 1)
    const { data: history, error: historyError } = await supabase
      .from("history")
      .select("id")
      .eq("user_id", userId)
      .single(); // lấy luôn 1 record duy nhất

    if (historyError) throw historyError;

    const historyId = history.id;

    // 2. Lấy cities từ history_cities dựa vào history_id
    const { data, error } = await supabase
      .from("history_cities")
      .select(
        `
        city:city_id (
          id,
          province_id,
          name,
          popularity
        ),
        created_at
      `
      )
      .eq("history_id", historyId) // chỉ cần eq vì chỉ có 1 history_id
      .order("created_at", { ascending: false }); // mới nhất trước

    if (error) throw error;

    // Lọc city null (nếu city_id bị xóa) và trả về mảng city
    return data?.map((item: any) => item.city).filter(Boolean) || [];
  } catch (error: any) {
    console.error("Error fetching cities:", error.message);
    throw error;
  }
}

export async function addHistory(userId: string, cityId: number) {
  try {
    if (!userId || !cityId) {
      throw new Error("userId hoặc cityId không được để trống");
    }

    // 1. Kiểm tra xem user đã có history chưa
    const { data: existingHistory, error: fetchError } = await supabase
      .from("history")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 là "No rows found", bỏ qua lỗi này
      throw fetchError;
    }

    let historyId: string;

    if (existingHistory) {
      // Nếu có rồi, lấy history_id
      historyId = existingHistory.id;
    } else {
      // Nếu chưa có, tạo mới history
      const { data: newHistory, error: insertError } = await supabase
        .from("history")
        .insert([{ user_id: userId }])
        .select("id")
        .single();

      if (insertError) throw insertError;

      historyId = newHistory.id;
    }

    // 2. Thêm city vào history_cities
    const { error: citiesError } = await supabase
      .from("history_cities")
      .insert([{ history_id: historyId, city_id: cityId }]);

    if (citiesError) throw citiesError;

    return { success: true, history_id: historyId };
  } catch (error: any) {
    console.error("Error adding history:", error.message);
    throw error;
  }
}
