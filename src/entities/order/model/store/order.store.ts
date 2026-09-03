import { create } from "zustand";
import type { IService } from "@/entities/service";
import type { OrderSteps } from "../types/order.types";

interface OrderState {
  order: {
    /* ===== TEST ===== */
    service?: IService;
    date: Date,
    slot?: string;
  };
  step: OrderSteps;

  setService: (service: IService) => void;
  setDate: (date: Date) => void;
  setSlot: (slot: string) => void;
  setStep: (step: OrderSteps) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  order: { date: new Date() },
  step: "service",

  setService: service => set({ order: { service, date: new Date(), }, step: "service" }),
  setDate: date => set(p => ({ order: { ...(p.order), date, slot: undefined }, })),
  setSlot: slot => set(p => ({ order: { ...(p.order), slot },  step: "date", })),
  setStep: step => set({ step }),
}));
