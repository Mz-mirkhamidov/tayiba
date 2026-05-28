"use client";

import { getSupabase } from "./supabase";

/**
 * TAYIBA Auth service
 * -------------------
 * Supabase Auth ustida yupqa qatlam.
 * Supabase ulanmagan bo'lsa barcha funksiyalar null qaytaradi.
 */

export async function signInWithEmail(email: string): Promise<{ error: string | null; sent: boolean }> {
  const sb = getSupabase();
  if (!sb) return { error: "Supabase ulanmagan", sent: false };
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}/account`, data: { source: "tayiba" } },
  });
  if (error) return { error: error.message, sent: false };
  return { error: null, sent: true };
}

export async function signOut(): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  await sb.auth.signOut();
}

export async function getSession() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data.session;
}

export async function getUser() {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data.user;
}

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  telegram_id?: string;
  telegram_username?: string;
  phone?: string;
  avatar_url?: string;
  created_at?: string;
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from("profiles").select("*").eq("id", userId).single();
  if (error || !data) return null;
  return data as UserProfile;
}

export async function upsertProfile(profile: Partial<UserProfile> & { id: string }): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  await sb.from("profiles").upsert(profile, { onConflict: "id" });
}
