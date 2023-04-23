import { AxiosInstance } from 'axios';

export function injectAuthHeader(
  axioInst: AxiosInstance,
  token: string | null
) {
  axioInst.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}
