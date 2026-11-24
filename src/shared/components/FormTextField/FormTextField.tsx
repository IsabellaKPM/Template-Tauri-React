import type { ComponentProps } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field";

interface Props<T extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  "name" | "id" | "defaultValue"
> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${name}-field`}>{label}</FieldLabel>
          <Input
            {...inputProps}
            {...field}
            id={`${name}-field`}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
