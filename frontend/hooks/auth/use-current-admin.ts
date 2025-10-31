import { useQuery } from "@tanstack/react-query";
import type { AdminUser } from "@/types/auth";
import axios from "axios";

const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

async function getCurrentAdmin(): Promise<AdminUser> {
  try {
    const { data } = await axios.get<AdminUser>("/api/auth/admin/me");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch admin");
    }
    throw new Error("Failed to fetch admin");
  }
}

/**
 * Hook for getting the current admin user
 * @example
 * const { data: admin, isLoading, error } = useCurrentAdmin();
 */
export function useCurrentAdmin(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getCurrentAdmin,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    ...options,
  });
}
