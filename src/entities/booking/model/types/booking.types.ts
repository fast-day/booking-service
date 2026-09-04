import type { ConfirmType } from "@/features/confirm";

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
  avatar: string | null;
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
    avatar: string | null;
    category: string;
    prices: { price: number, cost_price: number | null };
  }
}

export interface IBookingEmployee {
  user_id: string;
  full_name: string;
  first_name: string;
  last_name: string | null;
  phone: string;
  avatar: string | null;
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
  user: IBookingEmployee;
}
