import { OrderEmpty, OrderService, useOrderState } from "@/entities/order"
import { EmployeeCard } from "@/entities/user"
import { useInitialize } from "@/features/initialize"
import { ChevronIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { ContentPanel } from "@/widgets/content-panel/ui/content-panel"
import { AppLoading } from "@/widgets/loading"
import { type PropsWithChildren } from "react"

interface IOrderLayoutProps extends PropsWithChildren {
  company: string;
  location_id: string;
  user_id: string;
}

export const OrderLayout = ({ company, location_id, user_id, children }: IOrderLayoutProps) => {
  const { isLoading, data } = useInitialize(company, location_id, user_id);

  const { order } = useOrderState();

  if (isLoading) {
    return <AppLoading />
  }

  return (
    <div className="flex justify-between h-full">
      {children}
      <ContentPanel>
        <div className="grid gap-6">
          {data && <EmployeeCard profile={data.employee.profile} /> }
          <Button
            size={"size_54"}
            className={"w-full font-medium"}
            animation={"toggle_sm"}
            disabled={order?.service === undefined}
            iconRight={<ChevronIcon width={20} height={20} />}
          >Далее</Button>

          {order !== null && (
            <div>

              {order.service && (
                <OrderService {...order.service} />
              )}

              <div className="flex items-center justify-between py-6">
                <div className="text-2xl font-extrabold leading-8">Итого</div>
                <div className="text-xl font-extrabold leading-8">{order.service?.price} ₽</div>
              </div>
            </div>
          )}
        </div>

        {order === null && <OrderEmpty />}

      </ContentPanel>
    </div>
  )
}
