import { WatermarkWorked } from "@/entities/watermark"
import type { PropsWithChildren } from "react"

export const ContentPanel = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-white min-w-95 max-w-120 w-full h-[calc(100vh-48px)] sticky top-6 rounded-4xl flex">
      <div className="px-10 pt-10 pb-5 flex flex-col flex-1 gap-8">
        <div className="h-full flex flex-col space-y-8">{children}</div>
        <div className="flex items-center justify-center">
          <WatermarkWorked />
        </div>
      </div>
    </div>
  )
}
