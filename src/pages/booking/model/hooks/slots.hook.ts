import type { IService } from "@/entities/service";
import { slotApi } from "@/entities/slots";
import { ApiError } from "@/shared/api/base/api";
import { formatDate } from "@/shared/utils";
import { useCallback, useEffect, useState } from "react";

interface IUseServiceProps {
  user_id: string;
  location_id: string;
  service?: IService;
  date: Date;
}

export const useSlots = ({ user_id, location_id, service, date }: IUseServiceProps): FetchStateProps<string[]> => {
  const [state, setState] = useState<FetchStateProps<string[]>>({ data: undefined, isLoading: false, error: null, isError: false, isSuccess: false });

  const getSlots = useCallback(async () => {
    if (!service || !date) {
      return;
    }
    setState(p => ({ ...p, error: null, isLoading: true, isError: false, isSuccess: false }));
    try {

      const dateFormat = formatDate(date);

      const res = await slotApi.get({
        path: { user_id, },
        query: { date: dateFormat, duration: service?.duration, location_id },
      });

      setState(p => ({ ...p, data: res, isSuccess: true }));
    }
    catch (err) {
      if (err instanceof ApiError) {
        setState(p => ({ ...p, error: err.message, isError: true, isSuccess: false }));
      }
    }
    finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  }, [service, date]);

  useEffect(() => {
    getSlots();
  }, [getSlots]);

  return { ...state };
}
