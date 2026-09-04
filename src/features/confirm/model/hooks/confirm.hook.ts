import { useOrderState } from "@/entities/order"
import type { ConfirmType } from "../schema/confirm.schema";
import { ApiError } from "@/shared/api/base/api";
import { toast } from "sonner";
import { useState } from "react";
import { formatDate } from "@/shared/utils";
import { bookingApi, type IBookingCreateCredentials } from "@/entities/booking";
import { useNavigate } from "@tanstack/react-router";

interface IUseConfirmReturnProps extends FetchStateProps<string> {
  onSubmit: (data: ConfirmType) => Promise<void>;
}

export const useConfirm = (public_name: string, location_id: string, user_id: string): IUseConfirmReturnProps => {
  const navigate = useNavigate();
  const { order, clear } = useOrderState();

  const [state, setState] = useState<FetchStateProps<string>>({
    data: undefined,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const onSubmit = async (data: ConfirmType) => {
    if (!order.service || !order.date || !order.slot) {
      return;
    }
    setState(p => ({ ...p, isLoading: true, isSuccess: false, isError: false, error: null }));

    try {
      const { service, date, slot } = order;

      const body = {
        services: [
          {
            service_id: service.id,
            price: service.price.price,
            count: 1,
            start_time: `${formatDate(date)}T${slot}`,
            duration: service.duration,
            users: [{ id: user_id }],
          },
        ],
        location_id,
        ...data,
        mark: "primary",
        type: "online",
      } satisfies IBookingCreateCredentials["body"];

      await bookingApi.create({ public_name, body });

      clear();
      navigate({ to: "/success", replace: true });

      setState(p => ({ ...p, data: "", isSuccess: true }));
    }
    catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message);
        setState(p => ({ ...p, isError: true, error: err.message }));
        console.log("Не удалось записаться", err);
      }
    }
    finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  }

  return { onSubmit, ...state };
}
