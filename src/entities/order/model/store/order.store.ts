import { create } from "zustand";
import type { IService } from "@/entities/service";
import type { OrderSteps } from "../types/order.types";

interface OrderState {
  order: {
    /* ===== TEST ===== */
    service?: IService;
    date?: Date,
  } | null;
  step: OrderSteps;

  setService: (service: IService) => void;
  setDate: (date: Date) => void;
  setStep: (step: OrderSteps) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  date: null,
  step: "service",

  setService: service => set({ order: { service } }),
  setDate: date => set({ order: { date } }),
  setStep: step => set({ step }),
}));
