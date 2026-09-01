import { useOrderState } from "@/entities/order";
import { slotApi } from "@/entities/slots";
import { ApiError } from "@/shared/api/base/api";
import { WeeKCalendar } from "@/widgets/calendar"
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

export const DatePage = () => {
  const { order, setDate } = useOrderState();

  const fetchSlots = useCallback(async () => {
    try {
      const res = await slotApi.get({
        path: { user_id: "7b0d2933-788d-4d4d-8643-618ed7fffed1", location_id: "deb0ff26-4f88-4154-ae28-98a76d716a16", },
        query: { date: "2026-08-06", duration: 10 }
      });

      console.log(res);
    }
    catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message);
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-7">Выберите дату и время</h1>

      <WeeKCalendar selected={order?.date || new Date()} onSelected={setDate} />
    </>
  )
}
