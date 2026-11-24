import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/registerSchema";
import { useAuth } from "./useAuth";
import { ROUTES } from "@/shared/lib/routes";
import { getErrorMessage } from "@/shared/lib/errors";

export function useRegisterForm() {
  const navigate = useNavigate();
  const { registerMutation } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        void navigate(ROUTES.dashboard);
      },
      onError: (error) => {
        form.setError("root", {
          message: getErrorMessage(
            error,
            "Could not create your account. Please try again.",
          ),
        });
      },
    });
  };

  return {
    control: form.control,
    handleSubmit: (event: FormEvent<HTMLFormElement>) =>
      void form.handleSubmit(onSubmit)(event),
    isSubmitting: registerMutation.isPending,
    submitError: form.formState.errors.root?.message,
  };
}
