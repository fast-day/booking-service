import type { IService } from "@/entities/service";
import { slotApi, type ISlot } from "@/entities/slots";
import { ApiError } from "@/shared/api/base/api";
import { formatDate } from "@/shared/utils";
import { addDays } from "date-fns";
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

  const getSlots = useCallback(async (): Promise<void> => {
    if (!service || !date) {
      return;
    }
    setState(p => ({ ...p, error: null, isLoading: true, isError: false, isSuccess: false }));
    try {

      const start_date = formatDate(date);
      const end_date = formatDate(addDays(date, 7));

      const res = await slotApi.get({
        path: { user_id, },
        query: { start_date, end_date, duration: service?.duration, location_id },
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
  }, [service]);

  useEffect(() => {
    getSlots();
  }, [getSlots]);

  return { ...state, refetch: getSlots };
}
