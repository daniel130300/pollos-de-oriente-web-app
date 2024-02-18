import { createLazyFileRoute } from '@tanstack/react-router';
import SignIn from '../components/pages/SignIn';

export const Route = createLazyFileRoute('/')({
  component: SignIn,
})