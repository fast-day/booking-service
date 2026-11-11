import type { PropsWithChildren } from "react"

export const AppLoading = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full flex-1 min-h-full flex items-center justify-center">
      <div className="flex items-center flex-col">
        <div className="w-25 h-24 rounded-3xl bg-primary" />
        {children}
      </div>
    </div>
  )
}
