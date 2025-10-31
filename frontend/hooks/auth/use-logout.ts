import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LogoutResponse } from "@/types/auth";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

async function logoutUser(): Promise<LogoutResponse> {
  try {
    const { data } = await axios.post<LogoutResponse>("/api/auth/admin/logout");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Logout failed");
    }
    throw new Error("Logout failed");
  }
}

/**
 * Hook for logging out an admin
 * @example
 * const { mutate: logout, isPending } = useLogout();
 * logout();
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();
      toast.success("Login successful");
      router.push("/console");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
}
