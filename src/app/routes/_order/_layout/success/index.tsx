import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_order/_layout/success/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex items-center justify-center h-full flex-1'>
    <div>
      <h1 className='text-xl text-center font-bold leading-8'>Вы записались на услугу 🎉</h1>
      <p className='text-sm opacity-70 text-center leading-5'>Спасибо, что пользуетесь нашим сервисом ♥️</p>
    </div>
  </div>
}
