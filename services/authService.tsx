// src/services/authService.ts
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";
import * as SecureStore from "expo-secure-store";

let currentUser: any = null;
let currentToken: string | null = null;

export async function saveAuth(token: string, user_id: any) {
  await SecureStore.setItemAsync("userToken", token);
  await SecureStore.setItemAsync("userId", user_id);
}

export async function getToken() {
  return await SecureStore.getItemAsync("userToken");
}

export async function getUserId() {
  return await SecureStore.getItemAsync("userId");
}

export async function removeAuth() {
  await SecureStore.deleteItemAsync("userToken");
}

export async function removeUserId() {
  await SecureStore.deleteItemAsync("userId");
}

// Khi app start, cố gắng load session có sẵn
export async function initAuth() {
  const { data } = await supabase.auth.getSession();
  currentUser = data.session?.user ?? null;
  currentToken = data.session?.access_token ?? null;

  // Lắng nghe thay đổi auth (login, logout, refresh token)
  supabase.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user ?? null;
    currentToken = session?.access_token ?? null;
  });
}

// Hàm đăng nhập
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  currentUser = data.user;
  currentToken = data.session?.access_token ?? null;

  await saveAuth(currentToken, currentUser.id);

  return { user: currentUser, token: currentToken };
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  await supabase.auth.signOut();
  Alert.alert("Đăng ký thành công", "Vui lòng đăng nhập để tiếp tục");
}

// Hàm đăng xuất
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    console.log("Signed out successfully!");
  }

  removeAuth();
  removeUserId();
  currentUser = null;
  currentToken = null;
}
