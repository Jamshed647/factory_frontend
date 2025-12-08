/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./controller.tsx/fetchGetData";
import { RemoveEmptyFields } from "@/utils/formatter/RemoveEmptyFields";
import { useAuthStore } from "@/store/authStore";

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
  const { accessToken } = useAuthStore();

  //  const user = useAuths();
  // const portalName: string = "/admin";
  if (token == "" || token == undefined || token == null) {
    token = accessToken as string;
  }

  // all query data return from here like data, isLoading
  return useQuery({
    queryKey: [
      queryKey,
      {
        path,
        // portalName,
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
