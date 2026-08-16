import { OrderLayout } from '@/widgets/layout'
import { BaseLayout } from '@/widgets/layout/ui/base-layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_order/_layout')({
  component: RouteComponent,
  notFoundComponent: () => <div>упс</div>
})

function RouteComponent() {
  return (
    <BaseLayout>
      <OrderLayout>
        <Outlet />
      </OrderLayout>
    </BaseLayout>
  )
}
