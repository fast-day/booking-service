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
  id: string;
  name: string;
  mark: MarkType;
  duration: number;
  category: string | null;
  avatar: string | null;
  price: IServicePrice;
  discount: IServiceDiscount;
}
