"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/custom_ui/form";
import { Input } from "@/components/ui/custom_ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { FieldPropsInterface } from "../interface/inputPropsType";
import { passwordRules } from "@/utils/formatter/passwordRules";
import { TextCaseFormat } from "@/utils/formatter/textFormate";

/**
 * Password
 * A reusable password input component with optional visibility toggle and strength validation.
 *
 * Features:
 * - Toggle between masked and unmasked text
 * - Displays strength rules when `mode === "validate"`
 * - Integrated with react-hook-form
 */
export const Password = ({
  form,
  name,
  labelName,
  placeholder,
  optional = true,
  mode = "normal",
}: FieldPropsInterface) => {
  const [showPassword, setShowPassword] = useState(false); // Show/hide password input

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
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={TextCaseFormat(placeholder)}
                {...field}
                value={field.value ?? ""} // SSR-safe controlled input
                onChange={(e) => field.onChange(e)}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 px-3 h-full hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <EyeOffIcon className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </FormControl>

          {/* Password validation rules */}
          {mode === "validate" &&
            field.value &&
            !passwordRules.every((rule) => rule.test(field.value)) && (
              <ul className="mt-2 space-y-1 text-sm">
                {passwordRules.map((rule, index) => {
                  const passed = rule.test(field.value);
                  return (
                    <li
                      key={index}
                      className={`flex items-center gap-2 ${
                        passed ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full inline-block ${
                          passed ? "bg-green-600" : "bg-gray-400"
                        }`}
                      />
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            )}

          {/* Error message from react-hook-form */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
