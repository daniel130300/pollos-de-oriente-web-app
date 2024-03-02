import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';
import ResponsiveAppBar from '../components/templates/AppBar';
import Box from '@mui/material/Box';

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
    <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <ResponsiveAppBar />
      <Box sx={{flex: '1 1 auto', p: 4, position: 'relative'}}>
        <Outlet />
      </Box>
    </Box>
  )
})