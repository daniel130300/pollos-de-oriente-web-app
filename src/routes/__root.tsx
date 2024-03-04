import { createRootRoute, Outlet } from '@tanstack/react-router'
import Modal from 'src/components/atoms/Modal'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Modal/>
    </>
  ),
})