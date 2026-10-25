import { companyApi, type ICompanyInfo } from "@/entities/company";
import { useOrderState } from "@/entities/order";
import { ApiError } from "@/shared/api/base/api";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useInitialize = (company: string, location_id: string, user_id: string): FetchStateProps<ICompanyInfo> => {
  const [state, setState] = useState<FetchStateProps<ICompanyInfo>>({ data: undefined, isLoading: true, error: null, isError: false, isSuccess: false });
  const setCompany = useOrderState().setCompany;

  const initialize = useCallback(async () => {
    try {
      const res = await companyApi.info({ company, location_id, user_id });
      setState(p => ({ ...p, data: res, error: null, isError: false, isSuccess: true }));
      setCompany(res);
    } 
    catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
        setState(p => ({ ...p, error: error.message, isSuccess: false, isError: true }));
      }
    }
    finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  }, [company, location_id, user_id]);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return { ...state }
}
