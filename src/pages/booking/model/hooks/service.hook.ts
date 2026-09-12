import { serviceApi } from "@/entities/service";
import type { IService } from "@/entities/service/model/types/service.type";
import { ApiError } from "@/shared/api/base/api";
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner";

export const useGetServices = (): FetchStateProps<IService[]> => {
  const [state, setState] = useState<FetchStateProps<IService[]>>({ data: undefined, isLoading: true, error: null, isError: false, isSuccess: false });

  const getServices = useCallback(async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setState(p => ({ ...p, isLoading: false }));
      return;
    }

    setState(p => ({ ...p, error: null, isError: false, isSuccess: false }));
    try {
      const res = await serviceApi.getAll(userId);
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
