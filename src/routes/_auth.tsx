import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '../supabaseClient';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async() => {
    const { data } = await supabase.auth.getSession();
    const { session } = data;
    if (!session) {
      throw redirect({ to: '/signin' });
    }
  }
})