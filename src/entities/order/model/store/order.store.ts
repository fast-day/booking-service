import { create } from "zustand";
import { isBefore, startOfDay } from "date-fns";
import type { IService } from "@/entities/service";
import type { ICompanyInfo } from "@/entities/company";

interface OrderState {
  order: {
    /* ===== TEST ===== */
    service?: IService;
    date?: Date,
    slot?: string;
  };
  company: ICompanyInfo | undefined;

  setService: (s: IService) => void;
  hydrateService: (s: IService) => void;
  setDate: (d: Date) => void;
  setSlot: (s: string) => void;
  setCompany: (data: ICompanyInfo) => void;
  clear: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  order: { date: new Date() },
  company: undefined,

  setService: service => set({ order: { service, date: new Date() } }),
  hydrateService: service => set(p => ({ order: { ...p.order, service } })),
  setDate: date => {
    if (isBefore(startOfDay(date), startOfDay(new Date()))) return;
    set(p => ({ order: { ...p.order, date, slot: undefined } }));
  },
  setSlot: slot => set(p => ({ order: { ...p.order, slot } })),
  setCompany: company => set({ company }),
  clear: () => set({ order: { date: new Date() } }),
}));
