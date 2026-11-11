import { useOrderState } from "@/entities/order";
import { Slots, WeeKCalendar } from "@/widgets/calendar"
import { useSlots } from "../model/hooks/slots.hook";
import { Skeleton } from "@/shared/ui";

interface IDatePageProps {
  user_id: string;
  location_id: string;
}

export const DatePage = ({ user_id, location_id }: IDatePageProps) => {
  const order = useOrderState().order;
  const setDate = useOrderState().setDate;
  const setSlot = useOrderState().setSlot;

  const { data, isLoading, isError } = useSlots({
    user_id,
    location_id,
    service: order?.service,
    date: order.date ?? new Date(),
  });

  const content = isLoading ? (
    Array.from({ length: 6 }).map((_, idx) => <Skeleton key={idx} className="w-64.5 h-13.5 rounded-xl" />)
  ) : isError ? (
    <div className="text-center text-sm py-10 opacity-60">Не удалось загрузить слоты</div>
  ) : (
    <Slots data={data} date={order.date ?? new Date()} selectSlot={order.slot} setSlot={setSlot} />
  );

  return (
    <>
      <h1 className="1100:text-3xl text-2xl font-extrabold leading-7">Выберите дату и время</h1>
      <div className="min-w-0">
        <WeeKCalendar selected={order.date || new Date()} onSelected={setDate} />
      </div>
      <div className="grid gap-2.5 justify-center">
        {content}
      </div>
    </>
  )
}
