import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

export class ApiError extends Error {
  status?: number;
  payload?: unknown;

  constructor(message: string, status?: number, payload?: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

interface ApiErrorPayload {
  title?: string;
  description?: string;
  detail?: unknown;
  status?: number;
}

export const CreateApi = (conf: AxiosRequestConfig): AxiosInstance => {
  return axios.create(conf);
}

export const httpClient = CreateApi({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15_000,
});

httpClient.interceptors.response.use(res => res, (err: AxiosError<ApiErrorPayload>) => {
  const data = err.response?.data;
  const msg = data?.description ?? data?.title ?? err.message;
  return Promise.reject(new ApiError(msg, err.response?.status, err.response?.data));
});
