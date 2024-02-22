import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';

export const Route = createFileRoute('/_no_auth')({
  beforeLoad: async() => {
    const sessionPromise = new Promise<Session | null>((resolve) => {
      supabase.auth.onAuthStateChange((event, session) => {
        resolve(session);
      });
    });
    
    const session = await sessionPromise;
    
    if (session) {
      throw redirect({ to: '/products' });
    }
  }
})