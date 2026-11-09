import { BaseRoute, httpClient } from "@/shared/api";
import type { IBookingCreateCredentials, IBookingDetail } from "../model/types/booking.types";

class BookingApi extends BaseRoute {
  async create({ public_name, body }: IBookingCreateCredentials) {
    return this.http.post(`/v1/booking/widgets/${public_name}/create`, body).then(r => r.data);
  }
  async detail(id: string) {
    return this.http.get<IBookingDetail>(`/v1/booking/widgets/result/${id}`).then(r => r.data);
  }
}

export const bookingApi = new BookingApi(httpClient);
