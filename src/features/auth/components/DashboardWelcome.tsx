import { useAuth } from "../hooks/useAuth";

export function DashboardWelcome() {
  const { user } = useAuth();

  return (
    <p>
      Welcome back, <span className="font-medium">{user?.name}</span>. You are
      signed in as {user?.role}.
    </p>
  );
}
