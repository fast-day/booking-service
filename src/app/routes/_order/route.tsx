import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_order')({
  component: () => <Outlet />,
})
