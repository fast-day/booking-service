import type { ConfirmType } from "@/features/confirm";
import type { ImageUrls } from "@/shared/ui/avatar/types/image.type";

export interface IBookingServiceUser {
  id: string;
}

export interface IBookingService {
  service_id: string;
  price: number;
  count: number;
  start_time: string;
  duration: number;
  users: IBookingServiceUser[];
}

export interface IBookingCreateCredentials {
  public_name: string;
  body: {
    location_id: string;
    mark: MarkType;
    type: BookingType;
    services: IBookingService[];
  } & ConfirmType;
}

interface IBookingCustomer {
  id: string;
  phone: string;
  full_name: string;
  first_name: string;
  last_name: string | null;
  avatar: ImageUrls;
}

export interface IBookingServices {
  booking_service_id: string;
  booking_service_start_time: string;
  booking_service_end_time: string;
  booking_service_duration: number;
  booking_service_price: number;
  booking_service_count: number;
  service: {
    service_id: string;
    name: string;
    mark: MarkType;
    duration: number;
    avatar: ImageUrls;
    category: string;
    prices: { price: number, cost_price: number | null };
  }
  user: IBookingEmployee;
}

export interface IBookingEmployee {
  user_id: string;
  full_name: string;
  first_name: string;
  last_name: string | null;
  phone: string;
  avatar: ImageUrls;
}

export interface IBooking {
  id: string;
  status: BookingStatusType;
  tag: string;
  comment: string | null;
  date: string;
  start_time: string;
  end_time: string;
  customer: IBookingCustomer;
  booking_services: IBookingServices[]
}

// МУСОР - Я СПЕШУ
export type CustomerProfile = {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string | null;
  phone: string;
  avatar: ImageUrls;
  birthday: string | null;
}

export interface IDirectoryCustomer {
  id: string;
  customer_attributes: CustomerProfile & {
    profile_id: string;
    birthday: string | null;
    email: string | null;
  };
  visit_total: number;
  bookings_count: number;
  bookings_total: number;
}

export interface IBookingDetail extends Omit<IBooking, "payment_method" | "subtotal" | "order_id" | "customer"> {
  order_id: string | null;
  customer: IDirectoryCustomer;
  updated_date: string;
  updated_time: string;
}
