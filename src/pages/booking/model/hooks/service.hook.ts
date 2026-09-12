import { serviceApi } from "@/entities/service";
import type { IService } from "@/entities/service/model/types/service.type";
import { ApiError } from "@/shared/api/base/api";
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner";

export const useGetServices = (user_id: string): FetchStateProps<IService[]> => {
  const [state, setState] = useState<FetchStateProps<IService[]>>({ data: undefined, isLoading: true, error: null, isError: false, isSuccess: false });

  const getServices = useCallback(async () => {
    setState(p => ({ ...p, error: null, isError: false, isSuccess: false }));
    try {
      const res = await serviceApi.getAll(user_id);
      setState(p => ({ ...p, data: res, isSuccess: true }));
    }
    catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message);
        setState(p => ({ ...p, error: err.message, isError: true, isSuccess: false }));
      }
    }
    finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    getServices();
  }, [getServices]);

  return { ...state };
}
