"use client";

import { useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { getSupabase } from "@/services/supabase";

export interface UseUserReturn {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
}

/**
 * useUser — asosiy auth hook.
 * Supabase ulanmagan bo'lsa { user: null, loading: false } qaytaradi.
 * onAuthStateChange orqali real-time yangilanadi.
 */
export function useUser(): UseUserReturn {
  const sb = getSupabase();
  const isConfigured = Boolean(sb);

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isConfigured);

  useEffect(() => {
    if (!sb) { setLoading(false); return; }
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [sb]);

  return { user, session, loading, isConfigured };
}
