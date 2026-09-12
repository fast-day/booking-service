import { BaseRoute, httpClient } from "@/shared/api";
import type { ISlotCredentials } from "../model/types/slot.type";
import { buildQuery } from "@/shared/lib";

class SlotApi extends BaseRoute {
  async get(dto: ISlotCredentials) {
    const { path, query } = dto;
    return this.http.get<string[]>(buildQuery(`/v1/directory/employee/slots/${path.user_id}/`, { ...query })).then(r => r.data);
  }
}

export const slotApi = new SlotApi(httpClient);
