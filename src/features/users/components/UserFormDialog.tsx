import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserRoles } from "@/features/auth/enums/userRoles";
import { UserStatus } from "@/features/auth/enums/userStatus";
import type { User } from "@/features/auth/interfaces/user";
import { FormTextField } from "@/shared/components/FormTextField/FormTextField";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/shared/components/ui/native-select";
import { getErrorMessage } from "@/shared/lib/errors";
import { useUsers } from "../hooks/useUsers";
import {
  createUserSchema,
  editUserSchema,
  type UserFormValues,
} from "../schemas/userSchema";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
}

export function UserFormDialog({
  open,
  onOpenChange,
  user,
}: UserFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <UserForm user={user} onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

interface UserFormProps {
  user?: User;
  onDone: () => void;
}

function UserForm({ user, onDone }: UserFormProps) {
  const isEditing = !!user;
  const { user: currentUser } = useAuth();
  const { createMutation, updateMutation } = useUsers();
  const mutation = isEditing ? updateMutation : createMutation;
  const isSelf = !!user && user.id === currentUser?.id;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(isEditing ? editUserSchema : createUserSchema),
    defaultValues: {
      name: user?.name ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
      password: "",
      role: user?.role ?? UserRoles.USER,
      status: user?.status ?? UserStatus.ACTIVE,
    },
  });

  const onSubmit = ({ password, ...values }: UserFormValues) => {
    const handlers = {
      onSuccess: onDone,
      onError: (error: unknown) =>
        form.setError("root", {
          message: getErrorMessage(error, "Could not save the user."),
        }),
    };

    if (user) {
      updateMutation.mutate(
        { id: user.id, payload: password ? { ...values, password } : values },
        handlers,
      );
    } else {
      createMutation.mutate({ ...values, password }, handlers);
    }
  };

  const submitError = form.formState.errors.root?.message;

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit user" : "Create user"}</DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Leave the password empty to keep the current one."
            : "The user will be able to sign in with these credentials."}
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
        className="space-y-4"
        noValidate
      >
        <FormTextField control={form.control} name="name" label="Name" />
        <FormTextField
          control={form.control}
          name="username"
          label="Username"
          autoComplete="off"
        />
        <FormTextField
          control={form.control}
          name="email"
          label="Email Address"
          type="email"
          autoComplete="off"
        />
        <FormTextField
          control={form.control}
          name="password"
          label={isEditing ? "New password" : "Password"}
          type="password"
          autoComplete="new-password"
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="role"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="role-field">Role</FieldLabel>
                <NativeSelect
                  {...field}
                  id="role-field"
                  disabled={isSelf}
                  className="w-full"
                >
                  {Object.values(UserRoles).map((role) => (
                    <NativeSelectOption key={role} value={role}>
                      {role}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
            )}
          />
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="status-field">Status</FieldLabel>
                <NativeSelect
                  {...field}
                  id="status-field"
                  disabled={isSelf}
                  className="w-full"
                >
                  {Object.values(UserStatus).map((status) => (
                    <NativeSelectOption key={status} value={status}>
                      {status}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
            )}
          />
        </div>

        {submitError && (
          <p role="alert" className="text-sm text-destructive">
            {submitError}
          </p>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onDone}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
