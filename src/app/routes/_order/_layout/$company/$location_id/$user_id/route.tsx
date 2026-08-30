import { OrderLayout } from '@/widgets/layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/_order/_layout/$company/$location_id/$user_id')({
  params: {
    parse: (p) => ({
      company: z.string().parse(p.company),
      location_id: z.string().parse(p.location_id),
      user_id: z.string().parse(p.user_id),
    }),
    stringify: (p) => ({
      company: p.company,
      location_id: p.location_id,
      user_id: p.user_id,
    }),
  },
  errorComponent: () => <div>упс...</div>,
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams();

  return (
    <OrderLayout {...params}>
      <Outlet />
    </OrderLayout>
  )
}
