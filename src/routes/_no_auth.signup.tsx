import { createFileRoute } from '@tanstack/react-router';
import SignUp from '../components/pages/SignUp';

export const Route = createFileRoute('/_no_auth/signup')({
  component: SignUp,
})