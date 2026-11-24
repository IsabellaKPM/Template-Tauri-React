import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { NAV_ITEMS } from "@/shared/lib/routes";

export function HeaderNav() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) return null;

  return (
    <nav className="flex items-center gap-6 text-sm font-medium">
      {NAV_ITEMS.filter(
        (item) => !item.roles || item.roles.includes(user.role),
      ).map((item) => (
        <Link
          key={item.route}
          to={item.route}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
