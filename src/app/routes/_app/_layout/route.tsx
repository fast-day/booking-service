import { BaseLayout } from '@/widgets/layout/ui/base-layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout')({
  component: RouteComponent,
  notFoundComponent: () => <div>упс</div>
})

function RouteComponent() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  )
}
