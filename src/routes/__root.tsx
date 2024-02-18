import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

// here i should evaluate if a user has an existing session, if it does then show the routes, if not then show the sign in screen
// also consider creating a guard so that just if users are not authenticated they can navigate to the sign in and sign up screens

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})