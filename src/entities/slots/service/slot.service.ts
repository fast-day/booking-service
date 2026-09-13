import { BaseRoute, httpClient } from "@/shared/api";
import type { ISlotCredentials, ISlotResponse } from "../model/types/slot.type";
import { buildQuery } from "@/shared/lib";

class SlotApi extends BaseRoute {
  async get(dto: ISlotCredentials) {
    const { path, query } = dto;
    return this.http.get<ISlotResponse>(buildQuery(`/v1/booking/widgets/slots/${path.user_id}`, { ...query })).then(r => r.data);
  }
}

export const slotApi = new SlotApi(httpClient);
