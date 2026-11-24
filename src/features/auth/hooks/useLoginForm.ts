import type { FormEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormValues } from "../schemas/loginSchema";
import { useAuth } from "./useAuth";
import { ROUTES } from "@/shared/lib/routes";

export function useLoginForm() {
  const navigate = useNavigate();
  const { loginMutation } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginType: "email",
      identifier: "",
      password: "",
    },
  });

  const loginType = useWatch({
    control: form.control,
    name: "loginType",
  });

  const handleLoginTypeChange = (type: "email" | "username") => {
    form.setValue("loginType", type);
    form.setValue("identifier", "");
    form.clearErrors("identifier");
  };

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        void navigate(ROUTES.dashboard);
      },
      onError: () => {
        form.setError("root", {
          message: "Invalid credentials. Please try again.",
        });
      },
    });
  };

  return {
    control: form.control,
    loginType,
    handleLoginTypeChange,
    handleSubmit: (event: FormEvent<HTMLFormElement>) =>
      void form.handleSubmit(onSubmit)(event),
    isSubmitting: loginMutation.isPending,
    submitError: form.formState.errors.root?.message,
  };
}
