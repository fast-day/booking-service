import { Sonner } from "@/shared/ui"
import type { PropsWithChildren } from "react"

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Sonner />
    </>
  )
}
