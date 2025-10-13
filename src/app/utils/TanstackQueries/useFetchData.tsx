/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./controller.tsx/fetchGetData";
import { RemoveEmptyFields } from "@/utils/formatter/RemoveEmptyFields";

interface Props {
  token?: string;
  filterData?: Record<string, any>; // Better typing
  path: string;
  queryKey: string;
  method?: "GET" | "POST";
  enabled?: boolean;
}

const useFetchData = ({
  filterData = {},
  queryKey,
  method = "GET",
  path,
  token,
  enabled = true,
}: Props) => {
  const user = {
    user: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2MjI2ODI0MDAiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjI5NjQ0NjU5LCJleHAiOjE2Mjk2NDQ2NTl9",
      portName: "admin",
    },
  };

  //  const user = useAuths();
  const portalName: string = user?.user?.portName ?? "/admin";
  if (token == "" || token == undefined || token == null) {
    token = user?.user?.token;
  }

  // all query data return from here like data, isLoading
  return useQuery({
    queryKey: [
      queryKey,
      {
        path,
        portalName,
        Method: method,
        token,
        queryParams: RemoveEmptyFields(filterData),
      },
    ],
    queryFn: fetchData,
    enabled: !!token && !!filterData && enabled,
  });
};

export default useFetchData;
