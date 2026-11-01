import { Success } from '@/pages/success';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_order/_layout/success/$booking_id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { booking_id } = Route.useParams();

  return <Success booking_id={booking_id} />
}
