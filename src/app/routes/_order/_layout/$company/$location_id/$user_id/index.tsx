import { ServicePage } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_order/_layout/$company/$location_id/$user_id/',
)({
  errorComponent: ({ error }) => <div>{error.message}</div>,
  component: RouteComponent,
})

function RouteComponent() {
  const { user_id } = Route.useParams();
  return <ServicePage user_id={user_id} />
}
