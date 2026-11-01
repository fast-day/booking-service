import { bookingApi, type IBookingDetail } from "@/entities/booking";
import { ApiError } from "@/shared/api/base/api";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useSuccess = (bookingId: string): FetchStateProps<IBookingDetail> => {
  const [state, setState] = useState<FetchStateProps<IBookingDetail>>({ data: undefined, isLoading: true, error: null, isError: false, isSuccess: false });

  const getBooking = useCallback(async () => {
    setState(p => ({ ...p, error: null, isError: false, isSuccess: false }));
    try {
      const res = await bookingApi.detail(bookingId);
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
  }, [bookingId]);

  useEffect(() => {
    if (!bookingId) return;
    void getBooking();
  }, [bookingId, getBooking]);

  return { ...state };
}