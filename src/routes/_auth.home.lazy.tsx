import { createLazyFileRoute } from '@tanstack/react-router';
import Home from '../components/pages/Home';

export const Route = createLazyFileRoute('/_auth/home')({
  component: Home
})