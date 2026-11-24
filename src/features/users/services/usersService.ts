import { apiClient } from "@/shared/lib/axios";
import { API_ENDPOINTS } from "@/shared/lib/apiEndpoints";
import type { User } from "@/features/auth/interfaces/user";
import type { UserFormValues } from "../schemas/userSchema";

const { users } = API_ENDPOINTS.admin;

export type UpdateUserPayload = Partial<Omit<UserFormValues, "password">> & {
  password?: string;
};

export const usersService = {
  list: async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>(users.list);
    return data;
  },

  create: async (payload: UserFormValues): Promise<User> => {
    const { data } = await apiClient.post<User>(users.list, payload);
    return data;
  },

  update: async (id: string, payload: UpdateUserPayload): Promise<User> => {
    const { data } = await apiClient.patch<User>(users.byId(id), payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(users.byId(id));
  },
};
