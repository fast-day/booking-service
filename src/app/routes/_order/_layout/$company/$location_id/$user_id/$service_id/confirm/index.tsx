import { ConfirmPage } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_order/_layout/$company/$location_id/$user_id/$service_id/confirm/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams();
  return <ConfirmPage {...params} />
}
