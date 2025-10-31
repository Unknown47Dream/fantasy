import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginCredentials, LoginResponse } from "@/types/auth";
import axios from "axios";

const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const { data } = await axios.post<LoginResponse>("/api/auth/admin/login", credentials);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Login failed");
    }
    throw new Error("Login failed");
  }
}

/**
 * Hook for logging in an admin
 * @example
 * const { mutate: login, isPending } = useLogin();
 * login({ email: 'admin@example.com', password: 'password' });
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Set the admin data in cache
      queryClient.setQueryData(authKeys.me(), data.admin);
    },
  });
}
