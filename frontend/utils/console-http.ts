/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const consoleHttp = axios.create({});

let isRefreshing = false;
let failedQueue: { resolve: (value: any) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

consoleHttp.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _isRetry?: boolean };
    if (error.response?.status !== 401 || originalRequest._isRetry) {
      return Promise.reject(error);
    }
    originalRequest._isRetry = true;
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => consoleHttp(originalRequest));
    }
    isRefreshing = true;
    try {
      let url = "";
      if (typeof window === "undefined") {
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/refresh`;
      } else {
        url = `/api/auth/admin/refresh`;
      }
      const { data } = await axios.post(url);
      if (data.success) {
        processQueue(null, "new-token");
        return consoleHttp(originalRequest);
      } else {
        throw new Error(data.message || "Token refresh failed");
      }
    } catch (refreshError: any) {
      processQueue(refreshError, null);
      const isRefreshApiFailure =
        refreshError.isAxiosError && refreshError.config?.url?.includes("/api/auth/admin/refresh");
      if (isRefreshApiFailure && typeof window !== "undefined") {
        window.location.href = "/console/login";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default consoleHttp;
