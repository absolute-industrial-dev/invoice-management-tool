import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Loaded session:", session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth event:", _event, session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const refreshToken = setInterval(async () => {
      const { error } = await supabase.auth.refreshSession();
      if (error) {
        console.warn("Session refresh failed: ", error.message);
      } else {
        console.log("Session refreshed.");
      }
    }, 1000 * 60 * 10);

    return () => {
      subscription.unsubscribe();
      clearInterval(refreshToken);
    };
  }, []);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { user, loading, login, logout };
}
