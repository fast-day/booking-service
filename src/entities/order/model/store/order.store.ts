import { create } from "zustand";
import type { IService } from "@/entities/service";
import type { OrderSteps } from "../types/order.types";

interface OrderState {
  order: {
    /* ===== TEST ===== */
    service?: IService;
    date?: Date,
    slot?: string;
  };
  step: OrderSteps;
  user_id: string | null;

  setService: (service: IService) => void;
  setDate: (date: Date) => void;
  setSlot: (slot: string) => void;
  setStep: (step: OrderSteps) => void;
  setUserId: (id: string) => void;
  clear: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  order: { date: new Date() },
  step: "service",
  user_id: null,

  setService: service => set({ order: { service, date: new Date(), }, step: "service" }),
  setDate: date => set(p => ({ order: { ...(p.order), date, slot: undefined }, })),
  setSlot: slot => set(p => ({ order: { ...(p.order), slot },  step: "date", })),
  setStep: step => set({ step }),
  setUserId: user_id => set({ user_id }),

  clear: () => set({
    order: {
      service: undefined,
      date: undefined,
      slot: undefined
    },
    step: "service",
  }),
}));
