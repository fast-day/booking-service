import { ServicePage } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_order/_layout/$company/$location_id/$user_id/',
)({
  errorComponent: () => <div>упс...</div>,
  component: RouteComponent,
})

function RouteComponent() {
  return <ServicePage  />
}
