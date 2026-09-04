import type { AxiosInstance } from "axios";

export abstract class BaseRoute {
  protected readonly http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }
}
