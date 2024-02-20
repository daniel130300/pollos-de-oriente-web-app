import { createFileRoute } from '@tanstack/react-router';
import SignIn from '../components/pages/SignIn';

export const Route = createFileRoute('/_no_auth/signin')({
  component: SignIn,
})