import { BaseRoute, httpClient } from "@/shared/api";
import type { ICompanyInfo, ICompanyInfoCredentials } from "../model/types/company.type";
import { buildQuery } from "@/shared/lib";

class CompanyApi extends BaseRoute {
  async info(dto: ICompanyInfoCredentials) {
    return this.http.get<ICompanyInfo>(buildQuery(`/v1/booking/widgets/${dto.company}`, { location_id: dto.location_id, user_id: dto.user_id })).then(r => r.data);
  }
}

export const companyApi = new CompanyApi(httpClient);
