import { BaseRoute, httpClient } from "@/shared/api";
import type { IService } from "../model/types/service.type";

class ServiceApi extends BaseRoute {
  async getAll(user_id: string) {
    return this.http.get<IService[]>(`/v1/booking/widgets/services/${user_id}`).then(r => r.data);
  }
}

export const serviceApi = new ServiceApi(httpClient);
