// src/services/authService.ts
import { supabase } from "../lib/supabase";

let currentUser: any = null;
let currentToken: string | null = null;

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

  return { user: currentUser, token: currentToken };
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  currentUser = data.user;
  currentToken = data.session?.access_token ?? null;

  return { user: currentUser, token: currentToken };
}

// Hàm đăng xuất
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    console.log("Signed out successfully!");
  }
  
  currentUser = null;
  currentToken = null;
}

// Getter
export function getCurrentUser() {
  return currentUser;
}

export function getCurrentToken() {
  return currentToken;
}
