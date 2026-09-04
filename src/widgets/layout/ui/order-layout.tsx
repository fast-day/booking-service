import { OrderDate, OrderEmpty, OrderService, useOrderState } from "@/entities/order"
import { EmployeeCard } from "@/entities/user"
import { useInitialize } from "@/features/initialize"
import { NextStepButton } from "@/features/next-step"
import { formatPrice } from "@/shared/utils"
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

  const { order, step, setStep } = useOrderState();

  if (isLoading) {
    return <AppLoading />
  }

  return (
    <div className="flex justify-between h-full">
      <div className="py-6 max-w-145 mx-auto w-full space-y-10">
        {children}
      </div>
      <ContentPanel>
        <div className="grid gap-6">
          {data && <EmployeeCard profile={data.employee.profile} /> }
          <NextStepButton
            is_service={!!order?.service}
            is_slot={!!order?.slot}
            service_id={order?.service?.id}
            company={company}
            location_id={location_id}
            user_id={user_id}
            setStep={setStep}
            step={step}
          />
          {order.service !== undefined && (
            <div>

              {order.slot && (
                <OrderDate date={order.date || new Date()} slot={order.slot} duration={order.service?.duration} />
              )}

              {order.service && (
                <OrderService {...order.service} />
              )}

              <div className="flex items-center justify-between py-6">
                <div className="text-2xl font-extrabold leading-8">Итого</div>
                <div className="text-xl font-extrabold leading-8">{formatPrice(order.service?.price.price ?? 0)} ₽</div>
              </div>
            </div>
          )}
        </div>

        {order.service === undefined && <OrderEmpty />}

      </ContentPanel>
    </div>
  )
}
