import type { IService } from "@/entities/service";
import { slotApi, type ISlot } from "@/entities/slots";
import { ApiError } from "@/shared/api/base/api";
import { formatDate } from "@/shared/utils";
import { addDays, max, parseISO, startOfDay, startOfWeek } from "date-fns";
import { useCallback, useEffect, useState } from "react";

interface IUseServiceProps {
  user_id: string;
  location_id: string;
  service?: IService;
  date: Date;
}

interface IUseSlotsReturnProps<P> extends FetchStateProps<P> {
  refetch: () => Promise<void>;
}

export const useSlots = ({ user_id, location_id, service, date }: IUseServiceProps): IUseSlotsReturnProps<ISlot[]> => {
  const [state, setState] = useState<FetchStateProps<ISlot[]>>({ data: undefined, isLoading: false, error: null, isError: false, isSuccess: false });
  const duration = service?.duration ?? 15;
  const start_date = formatDate(max([startOfWeek(date, { weekStartsOn: 1 }), startOfDay(new Date())]));

  const getSlots = useCallback(async (): Promise<void> => {
    if (!service || !date) {
      return;
    }
    setState(p => ({ ...p, error: null, isLoading: true, isError: false, isSuccess: false }));
    try {
      const res = await slotApi.get({
        path: { user_id, },
        query: { start_date, end_date: formatDate(addDays(parseISO(start_date), 6)), duration, location_id },
      });

      setState(p => ({ ...p, data: res.days, isSuccess: true }));
    }
    catch (err) {
      if (err instanceof ApiError) {
        setState(p => ({ ...p, error: err.message, isError: true, isSuccess: false }));
      }
    }
    finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  }, [user_id, location_id, duration, start_date]);

  useEffect(() => {
    void getSlots();
  }, [getSlots]);

  return { ...state, refetch: getSlots };
}
