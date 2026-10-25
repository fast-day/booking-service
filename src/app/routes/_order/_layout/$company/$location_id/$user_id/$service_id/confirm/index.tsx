import { useOrderStore } from '@/entities/order/model/store/order.store';
import { ConfirmPage } from '@/pages/booking'
import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod';

export const Route = createFileRoute(
  '/_order/_layout/$company/$location_id/$user_id/$service_id/confirm/',
)({
  params: {
    parse: (p) => ({
      service_id: z.string().parse(p.service_id),
    }),
    stringify: (p) => ({
      service_id: p.service_id,
    }),
  },
  component: RouteComponent,
  beforeLoad: ({ params }) => {
    if (!useOrderStore.getState().order.slot) throw redirect({ to: "/$company/$location_id/$user_id/$service_id/date", params });
  }
})

function RouteComponent() {
  const params = Route.useParams();
  return <ConfirmPage {...params} />
}
