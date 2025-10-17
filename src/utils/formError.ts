/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors, FieldError } from "react-hook-form";

const onFormError = (errors: FieldErrors<any>) => {
  Object.entries(errors).forEach(([key, value]) => {
    const err = value as FieldError | undefined;
    if (err?.message) {
      console.error(`- ${key}: ${err.message}`);
    }
  });
};

export default onFormError;
