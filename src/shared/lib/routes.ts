import { UserRoles } from "@/features/auth/enums/userRoles";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  users: "/users",
} as const;

export interface NavItem {
  route: string;
  label: string;
  roles?: UserRoles[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    route: ROUTES.dashboard,
    label: "Dashboard",
  },
  {
    route: ROUTES.users,
    label: "Users",
    roles: [UserRoles.ADMIN],
  },
];

export type AppRoutes = typeof ROUTES;
