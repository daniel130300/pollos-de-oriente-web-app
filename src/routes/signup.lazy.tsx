import { createLazyFileRoute } from '@tanstack/react-router';
import SignUp from '../components/pages/SignUp';

export const Route = createLazyFileRoute('/signup')({
  component: SignUp,
})