import { DatePage } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

export const Route = createFileRoute(
  '/_order/_layout/$company/$location_id/$user_id/$service_id/date/',
)({
  params: {
    parse: (p) => ({
      service_id: z.string().parse(p.service_id),
    }),
    stringify: (p) => ({
      service_id: p.service_id,
    }),
  },
  errorComponent: () => <div>упс...</div>,
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams();
  return <DatePage {...params} />
}
