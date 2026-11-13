import { OrderDate, OrderEmpty, OrderService, useOrderState, type OrderSteps } from "@/entities/order"
import { EmployeeCard } from "@/entities/user"
import { useInitialize } from "@/features/initialize"
import { NextStepButton } from "@/features/next-step"
import { useEnsureService } from "@/shared/hooks"
import { ArrowBackUpIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { cn, formatPrice } from "@/shared/utils"
import { ContentPanel } from "@/widgets/content-panel/ui/content-panel"
import { AppLoading } from "@/widgets/loading"
import { useLocation, useParams, useRouter } from "@tanstack/react-router"
import { type PropsWithChildren } from "react"
import { BaseLayout } from "./base-layout"

interface IOrderLayoutProps extends PropsWithChildren {
  company: string;
  location_id: string;
  user_id: string;
}

export const OrderLayout = ({ company, location_id, user_id, children }: IOrderLayoutProps) => {
  const { service_id } = useParams({ strict: false });
  const { history } = useRouter();
  const order = useOrderState().order;
  const { isLoading: serviceLoading } = useEnsureService(service_id);
  const { isLoading, data } = useInitialize(company, location_id, user_id);

  const pathname = useLocation({ select: l => l.pathname });
  const step: OrderSteps = pathname.endsWith("/confirm") ? "confirm"
    : pathname.endsWith("/date") ? "date" : "service";

  if (isLoading || serviceLoading) {
    return <AppLoading />
  }

  return (
    <BaseLayout>
      {step !== "service" && (
        <Button
          data-ui="page-header-back-action"
          data-action="back"
          variant={"white"}
          animation={"toggle"}
          className={"size-11 text-sm font-bold"}
          size={"size_44"}
          onClick={() => history.back()}
        >
          <ArrowBackUpIcon width={24} height={24} />
        </Button>
      )}
      <div className="flex 1100:flex-row flex-col justify-between flex-1">
        <div className={cn(
          "max-w-145 mx-auto w-full space-y-10 1100:space-y-6",
          step === "confirm" && "pb-6"
        )}>
          {children}
        </div>
        <ContentPanel isConfirm={step === "confirm"}>
          <div className="grid gap-6">
            {data && <EmployeeCard profile={data.employee} className={step === "confirm" ? "flex" : "hidden 1100:flex"} />}

            {order.service !== undefined && (
              <div className={cn(step !== "confirm" && "hidden 1100:block")}>
                {order.slot && (
                  <OrderDate date={order.date || new Date()} slot={order.slot} duration={order.service?.duration} />
                )}

                {order.service && <OrderService {...order.service} />}

                <div className="flex items-center justify-between pb-0 pt-6 sm:py-6">
                  <div className="text-xl sm:text-2xl font-extrabold leading-6 sm:leading-8">Итого</div>
                  <div className="text-lg sm:text-xl font-extrabold leading-6 sm:leading-8">{formatPrice(order.service?.price.price ?? 0)} ₽</div>
                </div>
              </div>
            )}

            {step !== "confirm" && (
              <div className="1100:hidden flex items-center justify-between">
                <div className="text-xl font-extrabold">Итого</div>
                <div className="text-lg font-extrabold">{formatPrice(order.service?.price.price ?? 0)} ₽</div>
              </div>
            )}

            <NextStepButton
              is_service={!!order?.service}
              is_slot={!!order?.slot}
              service_id={order?.service && order.service.id}
              company={company}
              location_id={location_id}
              user_id={user_id}
              step={step}
            />
          </div>

          {order.service === undefined && <OrderEmpty />}

        </ContentPanel>
      </div>
    </BaseLayout>
  )
}
