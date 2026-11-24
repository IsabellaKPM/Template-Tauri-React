import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/lib/routes";

export function HeaderAuthActions() {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated, logout, isLoggingOut } = useAuth();

  if (isLoading) return null;

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to={ROUTES.login}
          className={buttonVariants({ variant: "ghost" })}
        >
          Login
        </Link>
        <Link to={ROUTES.register} className={buttonVariants()}>
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">{user.name}</span>
      <Button
        variant="outline"
        disabled={isLoggingOut}
        onClick={() =>
          logout(undefined, {
            onSuccess: () => void navigate(ROUTES.home, { replace: true }),
          })
        }
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
}
