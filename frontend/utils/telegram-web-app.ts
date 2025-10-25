/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

export function getTelegramInitData(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  // Try multiple ways to get initData
  try {
    // Method 1: Through imported SDK
    if (window.Telegram?.WebApp?.initData) {
      return window.Telegram.WebApp.initData;
    }

    // Method 2: Try to get from @twa-dev/sdk if it's already loaded
    const WebApp = (window as any).WebApp;
    if (WebApp?.initData) {
      return WebApp.initData;
    }

    return null;
  } catch (error) {
    console.error("Failed to get Telegram initData:", error);
    return null;
  }
}

export function getTelegramUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const WebApp = window.Telegram?.WebApp;
    if (WebApp?.initDataUnsafe?.user) {
      return WebApp.initDataUnsafe.user;
    }
    return null;
  } catch (error) {
    console.error("Failed to get Telegram user:", error);
    return null;
  }
}
