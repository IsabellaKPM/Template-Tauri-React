import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function AuthGate({
  children,
  fallback = null,
  when = "authenticated",
}: {
  children: ReactNode;
  fallback?: ReactNode;
  when?: "authenticated" | "guest";
}) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;

  return (when === "authenticated") === isAuthenticated ? (
    <>{children}</>
  ) : (
    <>{fallback}</>
  );
}
