/* eslint-disable @typescript-eslint/no-explicit-any */

import { getTelegramInitData } from "./telegram-web-app";

export class ApiClient {
  private static instance: ApiClient;

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  async authenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const initData = getTelegramInitData();

    if (!initData) {
      throw new Error("Telegram authentication data not available");
    }

    const headers = new Headers(options.headers);
    headers.set("X-Telegram-Init-Data", initData);

    return fetch(url, {
      ...options,
      headers,
    });
  }

  async get(url: string) {
    return this.authenticatedRequest(url, { method: "GET" });
  }

  async post(url: string, body?: any) {
    return this.authenticatedRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put(url: string, body?: any) {
    return this.authenticatedRequest(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete(url: string) {
    return this.authenticatedRequest(url, { method: "DELETE" });
  }
}

export const apiClient = ApiClient.getInstance();
