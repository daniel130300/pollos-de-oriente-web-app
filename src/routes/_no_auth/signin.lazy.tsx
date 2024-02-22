import { createLazyFileRoute } from '@tanstack/react-router'
import SignIn from '../../components/pages/SignIn'

export const Route = createLazyFileRoute('/_no_auth/signin')({
  component: SignIn
})