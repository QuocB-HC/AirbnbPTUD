import { supabase } from '../lib/supabase'; // đường dẫn tới instance Supabase của bạn

export async function getProfileById(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle(); // chỉ lấy 1 user

  if (error) {
    console.error('Lỗi lấy user:', error.message);
    return null;
  }

  if (!data) return null;

  return data;
}
