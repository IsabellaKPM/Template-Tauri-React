import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserRoles } from "@/features/auth/enums/userRoles";
import { ROUTES } from "@/shared/lib/routes";

interface Props {
  children: ReactNode;
  roles?: UserRoles[];
}

export function ProtectedRoute({ children, roles }: Props) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated || !user) return <Navigate to={ROUTES.home} replace />;
  if (roles && !roles.includes(user.role)) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <>{children}</>;
}
