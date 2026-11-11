import type { ImageUrls } from "@/shared/ui/avatar/types/image.type";

export interface IServicePrice {
  price: number;
  cost_price: number | null;
  requires_deposit: number | null;
  deposit_percent: number | null;
  cancellation_deadline_hours: number | null;
}

export interface IServiceDiscount {
  price: number | null;
  days: string[];
  time_start: string | null;
  time_end: string | null;
}

export interface IService {
  uuid: string;
  id: number;
  name: string;
  mark: MarkType;
  duration: number;
  category: string | null;
  avatar: ImageUrls;
  price: IServicePrice;
  discount: IServiceDiscount;
}
