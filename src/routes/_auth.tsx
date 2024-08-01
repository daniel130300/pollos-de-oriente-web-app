import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Session } from '@supabase/supabase-js';
import { supabase } from 'src/supabaseClient';
import AppTemplate from 'src/components/templates/AppTemplate';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const sessionPromise = new Promise<Session | null>(resolve => {
      supabase.auth.onAuthStateChange((_, session) => {
        if (session?.user) {
          resolve(session);
        }
      });
    });

    const session = await sessionPromise;

    if (!session) {
      throw redirect({ to: '/signin' });
    }
  },
  component: () => (
    <AppTemplate>
      <Outlet />
    </AppTemplate>
  ),
});
