/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense } from "react";
import { CommonSearchUI } from "./searchUI";
import { useSearchParamsHandler } from "./searchHandler";

const CommonSearchContent = ({
  width,
  searchText,
  setSearchText,
  placeholder,
}: {
  placeholder?: string;
  width?: string;
  searchText: string;
  setSearchText: (text: string) => void;
}) => {
  const { inputValue, handleInputChange } = useSearchParamsHandler({
    searchText,
    setSearchText,
  });

  return (
    <CommonSearchUI
      width={width}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

const CommonSearch = (props: any) => {
  return (
    <Suspense
      fallback={
        <div
          className={`flex gap-x-2 justify-start items-center py-2 px-4 rounded-lg border bg-[#FFFFFF] ${
            props.width ? `w-[${props.width}]` : "w-[150px] xl:w-[300px]"
          } border border-[#CFD6DD]`}
        >
          <div className="w-full h-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
      }
    >
      <CommonSearchContent {...props} />
    </Suspense>
  );
};

export default CommonSearch;
