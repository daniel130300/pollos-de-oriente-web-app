import { createFileRoute, redirect } from '@tanstack/react-router'
import { Session } from '@supabase/supabase-js';
import { supabase } from 'src/supabaseClient';

export const Route = createFileRoute('/_no_auth')({
  beforeLoad: async() => {
    const sessionPromise = new Promise<Session | null>((resolve) => {
      supabase.auth.onAuthStateChange((_, session) => {
        resolve(session);
      });
    });
    
    const session = await sessionPromise;
    
    if (session) {
      throw redirect({ to: '/products' });
    }
  }
})