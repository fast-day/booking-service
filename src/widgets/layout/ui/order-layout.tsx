import { OrderEmpty } from "@/entities/order"
import { EmployeeCard } from "@/entities/user"
import { ChevronIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { ContentPanel } from "@/widgets/content-panel/ui/content-panel"
import type { PropsWithChildren } from "react"

export const OrderLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex justify-between h-full">
      {children}
      <ContentPanel>
        <div className="grid gap-6">
          <EmployeeCard
            id={"123"}
            profile={{
              id: "123",
              first_name: "Иван",
              last_name: "Иванов",
              full_name: "Иван Иванов",
              phone: "8 900 000 00 00",
              position: "Детский психолог",
              avatar: null
            }}
          />
          <Button
            size={"size_54"}
            className={"w-full font-medium"}
            animation={"toggle_sm"}
            iconRight={<ChevronIcon width={20} height={20} />}
          >Далее</Button>
        </div>

        <OrderEmpty />

      </ContentPanel>
    </div>
  )
}
