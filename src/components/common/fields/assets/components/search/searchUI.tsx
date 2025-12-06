"use client";

import { Search } from "lucide-react";

interface CommonSearchUIProps {
  width?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const CommonSearchUI = ({
  width,
  placeholder,
  value,
  onChange,
}: CommonSearchUIProps) => {
  return (
    <div
      className={`flex gap-x-2 justify-start items-center py-2 px-4 rounded-lg border bg-[#FFFFFF] ${
        width ? `w-[${width}]` : "w-[150px] xl:w-[300px]"
      } border border-[#CFD6DD]`}
    >
      <Search size={16} />
      <input
        type="text"
        placeholder={placeholder ?? "Search"}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="flex-grow w-full text-black bg-transparent outline-none placeholder:text-gray-500"
      />
    </div>
  );
};
