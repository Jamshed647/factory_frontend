/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "react-phone-input-2" {
  import * as React from "react";

  export interface PhoneInputProps {
    value?: string;
    onChange?: (
      value: string,
      data: any,
      event: any,
      formattedValue: string,
    ) => void;
    country?: string;
    onlyCountries?: string[];
    preferredCountries?: string[];
    excludeCountries?: string[];
    placeholder?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    containerClass?: string;
    inputClass?: string;
    buttonClass?: string;
    dropdownClass?: string;
    disableDropdown?: boolean;
    disableCountryCode?: boolean;
    enableSearch?: boolean;
    searchPlaceholder?: string;
  }

  const PhoneInput: React.FC<PhoneInputProps>;
  export default PhoneInput;
}
