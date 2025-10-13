/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/custom_ui/form";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldPropsInterface } from "../interface/inputPropsType";
import { TextCaseFormat } from "@/utils/formatter/textFormate";

export const SingleSelectField = ({
  form,
  name,
  labelName,
  options,
  placeholder,
  optional = true,
  disabled = false,
  viewOnly = false,
  onValueChange,
  isLoading = false,
  defaultValue = "",
}: FieldPropsInterface) => {
  // Local state only used when no form is provided
  const [localValue, setLocalValue] = useState(defaultValue);

  // Render Select dropdown
  const renderSelect = (
    value: string,
    onChange: (val: string) => void,
    withFormControl: boolean,
  ) => {
    const selectElement = (
      <Select
        onValueChange={(val: any) => {
          onChange(val);
          if (onValueChange) onValueChange(val);
        }}
        value={value}
        disabled={disabled}
      >
        {withFormControl && <FormControl />}
        <SelectTrigger
          className={`focus-visible:ring-0 focus-visible:ring-offset-0 ${
            withFormControl && form?.formState?.errors?.[name]
              ? "border-red-600"
              : ""
          }`}
        >
          <SelectValue placeholder={TextCaseFormat(`${placeholder}`)} />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {isLoading ? (
            <SelectItem key="loading" value="loading" disabled>
              Loading...
            </SelectItem>
          ) : options && options.length > 0 ? (
            options.map((option) => (
              <SelectItem key={option} value={option} className="capitalize">
                {option}
              </SelectItem>
            ))
          ) : (
            <SelectItem key="no-options" value="no-options" disabled>
              {TextCaseFormat(labelName || "")} options not available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    );

    return selectElement;
  };

  // ----- Mode 1: With react-hook-form -----
  if (form) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {labelName && (
              <label className="font-semibold text-[14px] leading-[24px] tracking-[0.02em]">
                {TextCaseFormat(labelName)}
                {!optional && <span className="text-[#7E8C9A]">&nbsp;*</span>}
              </label>
            )}

            {viewOnly ? (
              <div className="py-2 px-3 text-sm text-gray-900 capitalize bg-white rounded-md border border-gray-200 min-h-[40px]">
                {field.value || ""}
              </div>
            ) : (
              <>
                {renderSelect(field.value, field.onChange, true)}
                <FormMessage />
              </>
            )}
          </FormItem>
        )}
      />
    );
  }

  // ----- Mode 2: Without react-hook-form -----
  return (
    <div className="flex flex-col gap-1">
      {labelName && (
        <label className="font-semibold capitalize text-[14px] leading-[24px] tracking-[0.02em]">
          {/* {TextCaseFormat(labelName)} */}
          {labelName}
          {!optional && <span className="text-[#7E8C9A]">&nbsp;*</span>}
        </label>
      )}

      {viewOnly ? (
        <div className="py-2 px-3 text-sm text-gray-900 !capitalize bg-white rounded-md border border-gray-200 min-h-[40px]">
          {localValue || ""}
        </div>
      ) : (
        renderSelect(localValue, setLocalValue, false) // no FormControl in standalone mode
      )}
    </div>
  );
};
