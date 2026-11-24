import { apiClient } from "@/shared/lib/axios";
import { API_ENDPOINTS } from "@/shared/lib/apiEndpoints";
import { User } from "../interfaces/user";
import type { LoginFormValues } from "../schemas/loginSchema";
import type { RegisterFormValues } from "../schemas/registerSchema";

const { auth } = API_ENDPOINTS.client;

export const authService = {
  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<User>(auth.me);
    return data;
  },

  login: async ({
    loginType,
    identifier,
    password,
  }: LoginFormValues): Promise<User> => {
    const { data } = await apiClient.post<User>(auth.login, {
      [loginType]: identifier,
      password,
    });
    return data;
  },

  register: async ({
    name,
    username,
    email,
    password,
  }: RegisterFormValues): Promise<User> => {
    const { data } = await apiClient.post<User>(auth.register, {
      name,
      username,
      email,
      password,
    });
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(auth.logout);
  },
};
