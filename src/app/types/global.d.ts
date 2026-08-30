export {};

declare global {
  type HttpError<M = unknown> = {
    title: string;
    detail: string;
    status: number;
    meta: M;
  }

  type SortType = "newest" | "oldest" | "price_asc" | "price_desc";

  type PaginationQuery = {
    page?: number;
    limit?: number;
  }

  type ApiErrorResponse<M> = {
    status: number;
    data: HttpError<M>;
  }

  type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  }

  type ApiResponse<T> = {
    data: T[];
    meta: PaginationMeta;
  };

  type FetchStateProps<D> = {
    data: D | undefined;
    isLoading: boolean;
    error: string | null;
  }

  type CurrencyType = "RUB" | "USD" | "EUR";

  type MarkType = "red" | "orange" | "green" | "blue" | "purple" | "teal" | "pink";
  
  type DaysType = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  type DateType = "days" | "dates";

  /** **/
  type SexType = "man" | "woman" | "none";

  /** СТАТУСЫ ДЛЯ БРОНИРОВАНИЯ **/
  type BookingStatusType = "new" | "completed" | "cancelled";

  /** СТАТУСЫ ДЛЯ ЗАКАЗОВ **/
  type OrderStatusType = "paid" | "unpaid" | "cancelled" | "refund";

  /** МЕТОДЫ ДЛЯ ОПЛАТЫ **/
  type PaymentMethodType = "online" | "cash" | "credit_card";

  /** ЕДЕНИЦА ЦЕНЫ **/
  type UnitPriceType = "booking" | "hour" | "day" | "week" | "month";
}
