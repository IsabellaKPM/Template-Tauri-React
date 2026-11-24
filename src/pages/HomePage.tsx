import { Link } from "react-router-dom";
import { buttonVariants } from "@/shared/components/ui/button";
import { AuthGate } from "@/shared/components/AuthGate/AuthGate";
import { ROUTES } from "@/shared/lib/routes";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { LoginForm } from "@/features/auth";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-balance">
          Template Tauri React with Tailwind CSS and TypeScript
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-150 text-balance">
          The Header and Footer components are included in the layout, and the
          Providers component wraps the main content to provide context for
          theming and state management. The Button component is also available
          for use in the application.
        </p>

        <AuthGate
          when="guest"
          fallback={
            <Link
              to={ROUTES.dashboard}
              className={buttonVariants({ size: "lg" })}
            >
              Go to dashboard
            </Link>
          }
        >
          <Dialog>
            <DialogTrigger className={buttonVariants({ size: "lg" })}>
              Login
            </DialogTrigger>
            <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-md">
              <LoginForm />
            </DialogContent>
          </Dialog>
        </AuthGate>
      </div>
    </div>
  );
}
