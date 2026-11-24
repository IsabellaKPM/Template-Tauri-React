import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/lib/queryKeys";
import { authService } from "../services/authService";

export function useAuth() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.me,
    queryFn: authService.getMe,
    retry: false,
    retryOnMount: false,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (loggedUser) =>
      queryClient.setQueryData(QUERY_KEYS.me, loggedUser),
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (newUser) => queryClient.setQueryData(QUERY_KEYS.me, newUser),
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.users });
      queryClient.setQueryData(QUERY_KEYS.me, null);
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !isError,
    loginMutation,
    registerMutation,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
