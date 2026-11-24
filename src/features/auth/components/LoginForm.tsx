import { Link } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";
import { LoginFormFields } from "./LoginFormFields";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/lib/routes";

export function LoginForm() {
  const {
    control,
    loginType,
    handleLoginTypeChange,
    handleSubmit,
    isSubmitting,
    submitError,
  } = useLoginForm();

  return (
    <Card className="w-full max-w-md rounded-xl border shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Sign In
        </CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <LoginFormFields
            control={control}
            loginType={loginType}
            onLoginTypeChange={handleLoginTypeChange}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        Don&apos;t have an account?&nbsp;
        <Link to={ROUTES.register} className="text-foreground underline">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
