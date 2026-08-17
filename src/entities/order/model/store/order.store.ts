import { create } from "zustand";
import type { IOrderSelectService } from "../types/order.types";

interface OrderState {
  order: {
    /* ===== TEST ===== */
    service?: IOrderSelectService;
  } | null;

  setService: (service: IOrderSelectService) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  setService: (s) => set({ order: { service: s } }),
}));
