"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useSearchParamsHandler = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(searchText);

  useEffect(() => {
    setInputValue(searchText || "");
  }, [searchText]);

  const handleSearch = useDebouncedCallback((text: string) => {
    if (setSearchText) {
      setSearchText(text);
    }
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("query", text);
      params.delete("page");
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 800);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    handleSearch(text);
  };

  return {
    inputValue,
    handleInputChange,
  };
};
