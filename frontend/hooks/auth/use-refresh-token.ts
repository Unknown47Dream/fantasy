import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RefreshTokenResponse } from "@/types/auth";
import axios from "axios";

const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

async function refreshToken(): Promise<RefreshTokenResponse> {
  try {
    const { data } = await axios.post<RefreshTokenResponse>("/api/auth/admin/refresh");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Token refresh failed");
    }
    throw new Error("Token refresh failed");
  }
}

/**
 * Hook for refreshing the access token
 * @example
 * const { mutate: refresh, isPending } = useRefreshToken();
 * refresh();
 */
export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refreshToken,
    onSuccess: () => {
      // Invalidate current admin to refetch with new token
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}
