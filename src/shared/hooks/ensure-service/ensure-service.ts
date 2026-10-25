import { useOrderState } from "@/entities/order"
import { serviceApi } from "@/entities/service";
import { useEffect } from "react";
import { toast } from "sonner";

export const useEnsureService = (service_id?: string) => {
  const service = useOrderState().order.service;
  const hydrate = useOrderState().hydrateService;

  const need = !!service_id && String(service?.id) !== service_id;

  useEffect(() => {
    if (!need) return;
    let ignore = false;

    serviceApi.getOne(service_id!)
      .then(s => { if (!ignore) hydrate(s); })
      .catch(() => toast.error("Услуга не найдена"));

    return () => { ignore = true; };
  }, [need, service_id, hydrate]);

  return { isLoading: need };
}