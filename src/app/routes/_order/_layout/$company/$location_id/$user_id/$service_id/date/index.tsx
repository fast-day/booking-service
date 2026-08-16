import { DatePage } from '@/pages/booking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_order/_layout/$company/$location_id/$user_id/$service_id/date/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <DatePage />
}
