import { useEffect, useRef } from 'react'
import { useRouter } from '@tanstack/react-router'

export function NotFoundRedirect() {
  const router = useRouter();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

  if (router.history.canGoBack()) {
      router.history.back();
    } else {
      window.location.replace('https://fast-day.ru');
    }
  }, [router]);

  return null;
}
