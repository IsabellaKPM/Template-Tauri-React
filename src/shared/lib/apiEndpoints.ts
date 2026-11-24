import { group } from "@/shared/lib/groupRoute";

const API_PREFIX = "/api";
const ADMIN_PREFIX = "/admin";

export const API_ENDPOINTS = {
  client: group(API_PREFIX, {
    auth: group("/auth", {
      register: "/register",
      login: "/login",
      logout: "/logout",
      refresh: "/refresh",
      me: "/me",
    }),
  }),
  admin: group(ADMIN_PREFIX, {
    users: group("/users", {
      list: "",
      byId: (id: string) => `/${id}`,
    }),
  }),
};
