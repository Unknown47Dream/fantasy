import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RegisterCredentials, RegisterResponse } from "@/types/auth";
import axios from "axios";

async function registerAdmin(credentials: RegisterCredentials): Promise<RegisterResponse> {
  try {
    const { data } = await axios.post<RegisterResponse>("/api/auth/admin/register", credentials);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Registration failed");
    }
    throw new Error("Registration failed");
  }
}

/**
 * Hook for registering a new admin (requires SUPER_ADMIN permissions)
 * @example
 * const { mutate: register, isPending } = useRegisterAdmin();
 * register({ email: 'new@example.com', password: 'password', role: 'ADMIN' });
 */
export function useRegisterAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerAdmin,
    onSuccess: () => {
      // Optionally invalidate admin list if you have one
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
  });
}
