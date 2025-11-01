/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/formHelpers.ts
import { FieldValues, UseFormReturn } from "react-hook-form";

export function getChangedFields<T extends FieldValues>(
  form: UseFormReturn<T>,
  formData: T,
): Partial<T> {
  const { dirtyFields } = form.formState;

  return Object.keys(dirtyFields).reduce((acc, key) => {
    (acc as any)[key] = formData[key as keyof T];
    return acc;
  }, {} as Partial<T>);
}
