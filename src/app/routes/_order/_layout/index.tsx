import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_order/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex items-center justify-center flex-1'>Hello!</div>
}
