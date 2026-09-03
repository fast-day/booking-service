import { useOrderState } from "@/entities/order";
import { Slots, WeeKCalendar } from "@/widgets/calendar"
import { useSlots } from "../model/hooks/slots.hook";

interface IDatePageProps {
  user_id: string;
  location_id: string;
}

export const DatePage = ({ user_id, location_id }: IDatePageProps) => {
  const order = useOrderState().order;
  const setDate = useOrderState().setDate;
  const setSlot = useOrderState().setSlot;

  const { data, isLoading, isSuccess, isError } = useSlots({
    user_id,
    location_id,
    service: order?.service,
    date: order.date,
  });

  const content = isLoading ? (
    <div className="text-center text-sm py-10 opacity-60">Загрузка...</div>
  ) : isError ? (
    <div className="text-center text-sm py-10 opacity-60">Нет свободных слотов на выбранную дату</div>
  ) : isSuccess ? (
    <Slots data={data} selectSlot={order.slot} setSlot={setSlot} />
  ) : <div className="text-center text-sm py-10 opacity-60">Произошла ошибка</div>;

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-7">Выберите дату и время</h1>

      <WeeKCalendar selected={order.date} onSelected={setDate} />

      {content}
    </>
  )
}
