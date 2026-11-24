import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/lib/queryKeys";
import { usersService, type UpdateUserPayload } from "../services/usersService";

export function useUsers() {
  const queryClient = useQueryClient();
  const invalidateUsers = () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });

  const usersQuery = useQuery({
    queryKey: QUERY_KEYS.users,
    queryFn: usersService.list,
  });

  const createMutation = useMutation({
    mutationFn: usersService.create,
    onSuccess: invalidateUsers,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      usersService.update(id, payload),
    onSuccess: invalidateUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: usersService.remove,
    onSuccess: invalidateUsers,
  });

  return { usersQuery, createMutation, updateMutation, deleteMutation };
}
