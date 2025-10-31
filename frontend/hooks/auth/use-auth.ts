import { useCurrentAdmin } from "./use-current-admin";

/**
 * Hook to check if user is authenticated
 * @example
 * const { admin, isAuthenticated, isLoading } = useAuth();
 */
export function useAuth() {
  const { data: admin, isLoading, error } = useCurrentAdmin();

  return {
    admin,
    isAuthenticated: !!admin && !error,
    isLoading,
    error,
  };
}
