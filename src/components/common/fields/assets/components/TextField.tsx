/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/custom_ui/form";
import { Input } from "@/components/ui/custom_ui/input";
import { FieldPropsInterface } from "../interface/inputPropsType";
import { TextCaseFormat } from "@/utils/formatter/textFormate";

/**
 * Text Input
 * A reusable text input component integrated with react-hook-form.
 *
 * Features:
 * - SSR-safe controlled input
 * - Optional array parsing (`isArray`)
 * - Optional read-only mode (`viewOnly`)
 * - Optional suffix display
 * - Displays validation errors or custom message
 */
export const Text = ({
  form,
  name,
  placeholder,
  labelName,
  optional = true,
  disabled = false,
  viewOnly = false,
  customMessage,
  isArray = false,
  onChange,
  suffix,
}: FieldPropsInterface) => {
  return (
    <FormField
      control={form.control}
      name={name}
      // SSR-safe default value
      defaultValue={isArray ? [] : ""}
      render={({ field }) => {
        const error = form?.formState?.errors?.[name];
        const isError = !!error;

        return (
          <FormItem>
            {/* Label */}
            {labelName && (
              <label className="font-semibold text-[14px] leading-[24px] tracking-[0.02em]">
                {TextCaseFormat(labelName)}
                {!optional && <span className="text-[#7E8C9A]">&nbsp;*</span>}
              </label>
            )}

            {/* Read-only view */}
            {viewOnly ? (
              <div className="py-2 px-3 text-sm text-gray-900 bg-white rounded-md border border-gray-200 min-h-[40px]">
                {field.value || ""}
              </div>
            ) : (
              <>
                <FormControl>
                  <div className="flex relative items-center">
                    <Input
                      className={`focus-visible:ring-0 focus-visible:ring-offset-0 ${
                        isError && "border-red-600"
                      }`}
                      placeholder={TextCaseFormat(placeholder)}
                      disabled={disabled}
                      type="text"
                      value={field.value ?? ""} // SSR-safe controlled value
                      onChange={(event) => {
                        const inputValue = event.target.value;

                        // Handle array inputs
                        if (isArray) {
                          const arr = inputValue
                            .split(/[\s,]+/)
                            .map((v) => v.trim())
                            .filter((v) => v.length > 0);

                          form.setValue(name, arr as any, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }

                        field.onChange(event);
                        if (onChange) onChange(event);
                      }}
                    />

                    {/* Optional suffix */}
                    {suffix && (
                      <span className="absolute right-3 text-sm text-gray-500 pointer-events-none">
                        {suffix}
                      </span>
                    )}
                  </div>
                </FormControl>

                {/* Error or custom message */}
                <FormMessage>
                  {isError ? String(error?.message || "") : customMessage || ""}
                </FormMessage>
              </>
            )}
          </FormItem>
        );
      }}
    />
  );
};
