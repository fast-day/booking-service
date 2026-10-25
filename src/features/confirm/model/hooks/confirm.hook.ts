import { useOrderState } from "@/entities/order"
import type { ConfirmType } from "../schema/confirm.schema";
import { ApiError } from "@/shared/api/base/api";
import { toast } from "sonner";
import { useState } from "react";
import { formatDate } from "@/shared/utils";
import { bookingApi, type IBookingCreateCredentials } from "@/entities/booking";
import { useNavigate } from "@tanstack/react-router";

interface IUseConfirmReturnProps {
  onSubmit: (data: ConfirmType) => Promise<void>;
}

export const useConfirm = (public_name: string): IUseConfirmReturnProps => {
  const navigate = useNavigate();
  const order = useOrderState().order;
  const employee_id = useOrderState().company?.employee.profile.id;
  const location_id = useOrderState().company?.company.location_uuid;
  const clear = useOrderState().clear;

  const [state, setState] = useState<Omit<FetchStateProps<string>, "data">>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const onSubmit = async (data: ConfirmType) => {
    if (state.isLoading) return;
    if (!order.service || !order.date || !order.slot || !employee_id || !location_id) {
      return;
    }
    setState(p => ({ ...p, isLoading: true, isSuccess: false, isError: false, error: null }));

    try {
      const { service, date, slot } = order;

      const body = {
        services: [
          {
            service_id: service.uuid,
            price: service.price.price,
            count: 1,
            start_time: `${formatDate(date)}T${slot}`,
            duration: service.duration,
            users: [{ id: employee_id }],
          },
        ],
        location_id,
        ...data,
        mark: "primary",
        type: "online",
      } satisfies IBookingCreateCredentials["body"];

      await bookingApi.create({ public_name, body });

      navigate({ to: "/success", replace: true });
      setState(p => ({ ...p, isSuccess: true }));
      clear();
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

  return { onSubmit };
}
