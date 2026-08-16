import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_order/_layout/$notFound')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>упс</div>
}
