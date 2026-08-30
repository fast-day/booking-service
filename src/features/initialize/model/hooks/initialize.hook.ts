import { companyApi, type ICompanyInfo } from "@/entities/company";
import { ApiError } from "@/shared/api/base/api";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useInitialize = (company: string, location_id: string, user_id: string): FetchStateProps<ICompanyInfo> => {
  const [state, setState] = useState<FetchStateProps<ICompanyInfo>>({ data: undefined, isLoading: true, error: null });


  const initialize = useCallback(async () => {
    try {
      const res = await companyApi.info({ company, location_id, user_id });
      setState(p => ({ ...p, data: res, error: null }));
    } 
    catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
        setState(p => ({ ...p, error: e.message }));
      }
    }
    finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  }, [company, location_id, user_id]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { ...state }
}
