import type { IEmployee } from "@/entities/user";

export interface ICompanyInfoCredentials {
  company: string;
  location_id: string;
  user_id: string;
}

export interface ICompany {
  id: string;
  name: string;
  public_name: string;
  logo: string | null;
  timezone: string;
  currency: CurrencyType;
}

export interface ICompanyInfo {
  company: ICompany;
  employee: IEmployee;
}
