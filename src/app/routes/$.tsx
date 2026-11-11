import { useEffect, useRef } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({
  component: NotFoundRedirect,
})

function NotFoundRedirect() {
  const router = useRouter()
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true

    if (window.history.length > 1) {
      router.history.back()
    } else {
      window.location.replace('https://fast-day.ru')
    }
  }, [router])

  return null
}
