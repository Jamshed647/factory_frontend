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
 * Number
 * A reusable numeric input field integrated with react-hook-form.
 *
 * Features:
 * - Accepts only numeric values (integer or float depending on numberType)
 * - Prevents values below 0
 * - Hides native number input arrows
 * - Supports custom placeholder, label, and disabled state
 * - Works with react-hook-form for validation and control
 */

export const Number = ({
  form,
  name,
  labelName,
  placeholder,
  optional = true,
  viewOnly = false,
  disableTextFormat = false,
  numberType = "integer", // default to integer
}: FieldPropsInterface & {
  disableTextFormat?: boolean;
  numberType?: "float" | "integer";
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {/* Label */}
          {labelName && (
            <label className="font-semibold text-[14px] leading-[24px] tracking-[0.02em]">
              {disableTextFormat ? labelName : TextCaseFormat(labelName)}
              {!optional && <span className="text-[#7E8C9A]">&nbsp;*</span>}
            </label>
          )}

          <FormControl>
            <Input
              type="number"
              step={numberType === "float" ? "any" : "0"}
              min={0}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 
                         [&::-webkit-outer-spin-button]:appearance-none 
                         [&::-webkit-inner-spin-button]:appearance-none 
                         [appearance:textfield]"
              placeholder={TextCaseFormat(`${placeholder}`)}
              value={field.value ?? ""} // ✅ ensure empty string shows correctly
              onKeyDown={(e: any) => {
                // Prevent invalid characters
                if (["-", "+", "e", "E"].includes(e.key)) {
                  e.preventDefault();
                }
                if (numberType === "integer" && e.key === ".") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const val = e.target.value;

                if (val === "") {
                  field.onChange(""); // ✅ keep empty instead of undefined
                  return;
                }

                let numberVal: number | undefined;

                if (numberType === "float") {
                  numberVal = parseFloat(val);
                } else {
                  numberVal = parseInt(val, 10);
                }

                if (!isNaN(numberVal) && numberVal >= 0) {
                  field.onChange(numberVal);
                } else {
                  field.onChange("");
                }
              }}
              disabled={viewOnly}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
