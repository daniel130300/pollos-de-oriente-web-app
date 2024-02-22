import { createLazyFileRoute } from '@tanstack/react-router'
import ResetPassword from '../../components/pages/ResetPassword'

export const Route = createLazyFileRoute('/_no_auth/reset-password')({
  component: ResetPassword
})