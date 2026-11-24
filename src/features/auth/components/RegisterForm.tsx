import { Link } from "react-router-dom";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { FormTextField } from "@/shared/components/FormTextField/FormTextField";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/lib/routes";

export function RegisterForm() {
  const { control, handleSubmit, isSubmitting, submitError } =
    useRegisterForm();

  /* WIP: Mark errors on the go, not only after submitting */
  return (
    <Card className="w-full max-w-md rounded-xl border shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Create account
        </CardTitle>
        <CardDescription>
          Enter your details to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormTextField
            control={control}
            name="name"
            label="Name"
            placeholder="John Doe"
            autoComplete="name"
          />
          <FormTextField
            control={control}
            name="username"
            label="Username"
            placeholder="your_username"
            autoComplete="username"
          />
          <FormTextField
            control={control}
            name="email"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
          />
          <FormTextField
            control={control}
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <FormTextField
            control={control}
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />

          {submitError && (
            <p role="alert" className="text-sm text-destructive">
              {submitError}
            </p>
          )}

          <Button
            type="submit"
            className="w-full rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        Already have an account?&nbsp;
        <Link to={ROUTES.login} className="text-foreground underline">
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
