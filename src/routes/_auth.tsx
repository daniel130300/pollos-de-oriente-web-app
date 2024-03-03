import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { Session } from '@supabase/supabase-js';
import VerticalAppBar from 'src/components/templates/VerticalAppBar';
import { supabase } from 'src/supabaseClient';

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