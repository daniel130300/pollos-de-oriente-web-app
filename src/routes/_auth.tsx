import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';
import VerticalAppBar from '../components/templates/VerticalAppBar';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const sessionPromise = new Promise<Session | null>((resolve) => {
      supabase.auth.onAuthStateChange((_, session) => {
        resolve(session);
      });
    });
    
    const session = await sessionPromise;

    if (!session) {
      throw redirect({ to: '/signin' });
    }
  },
  component: () => (
    <VerticalAppBar>
      <Outlet />
    </VerticalAppBar>
  )
})