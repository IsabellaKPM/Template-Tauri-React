import { Control, Controller } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";
import { LoginFormValues } from "../schemas/loginSchema";

export interface LoginFormFieldsProps {
  control: Control<LoginFormValues>;
  loginType: "email" | "username";
  onLoginTypeChange: (type: "email" | "username") => void;
  isSubmitting: boolean;
  submitError?: string;
}

export function LoginFormFields({
  control,
  loginType,
  onLoginTypeChange,
  isSubmitting,
  submitError,
}: LoginFormFieldsProps) {
  return (
    <>
      <Controller
        name="loginType"
        control={control}
        render={({ field }) => (
          <Field>
            <Tabs
              value={field.value}
              onValueChange={(val) =>
                onLoginTypeChange(val as "email" | "username")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="username">Username</TabsTrigger>
              </TabsList>
            </Tabs>
          </Field>
        )}
      />

      <Controller
        name="identifier"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {loginType === "email" ? "Email Address" : "Username"}
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={
                loginType === "email" ? "name@example.com" : "your_username"
              }
              type={loginType === "email" ? "email" : "text"}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              type="password"
              placeholder="••••••••"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {submitError && (
        <p role="alert" className="text-sm text-destructive">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        className="w-full rounded-lg mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </>
  );
}
