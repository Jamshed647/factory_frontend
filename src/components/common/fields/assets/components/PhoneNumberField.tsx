/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/custom_ui/form";
import { TextCaseFormat } from "@/utils/formatter/textFormate";
import { maskString } from "@/utils/maskString/maskString";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneFieldPropsInterface {
  form: any;
  name: string;
  labelName?: string;
  defaultCountry?: string;
  placeholder?: string;
  disabled?: boolean;
  optional?: boolean;
  customMessage?: string;
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
  viewOnly?: boolean;
  hasPhone?: boolean;
}

export const PhoneNumber = ({
  form,
  name,
  labelName,
  disabled = false,
  optional = true,
  defaultCountry = "US",
  placeholder = "Enter phone number",
  customMessage,
  viewOnly = false,
  onValueChange,
  isLoading = false,
  hasPhone = false,
}: PhoneFieldPropsInterface) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const error = form.formState.errors?.[name];
        const isError = !!error;

        return (
          <FormItem>
            {labelName && (
              <label className="font-semibold text-[14px] leading-[24px] tracking-[0.02em]">
                {TextCaseFormat(labelName)}
                {!optional && <span className="text-[#7E8C9A]">&nbsp;*</span>}
              </label>
            )}

            {viewOnly ? (
              <div className="py-2 px-3 text-sm text-gray-900 bg-white rounded-md border border-gray-200 min-h-[40px]">
                {hasPhone ? maskString(field.value) : field.value || ""}
              </div>
            ) : (
              <>
                <FormControl>
                  <PhoneInput
                    defaultCountry={defaultCountry}
                    value={field.value}
                    disabled={disabled || isLoading}
                    placeholder={TextCaseFormat(placeholder)}
                    onChange={(value: string) => {
                      field.onChange(value);
                      if (onValueChange) onValueChange(value);
                    }}
                    onBlur={field.onBlur}
                    inputClassName={`w-full px-4 py-2 rounded-md border ${
                      isError ? "border-red-600" : "border-gray-300"
                    }`}
                  />
                </FormControl>
                <FormMessage>
                  {isError
                    ? String(error?.message || "")
                    : isLoading
                      ? "Checking..."
                      : customMessage || ""}
                </FormMessage>
              </>
            )}
          </FormItem>
        );
      }}
    />
  );
};
