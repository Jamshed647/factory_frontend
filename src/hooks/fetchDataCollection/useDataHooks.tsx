/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";

/* Fetch Factories */
export function fetchFactories({
  filter,
  path,
}: {
  filter?: any;
  path?: string;
}) {
  const { data, isLoading, isError } = useFetchData({
    path: path ?? `auth/factory`,
    queryKey: "fetch-match-awarding-bodies",
    filterData: { ...filter },
    //enabled: !!sessionId,
  });

  const options = data?.data?.map((item: any) => ({
    label: item?.name || item?.title || "Unknown",
    value: item?.id,
    code: item?.code,
  }));

  return { options, data, isLoading, isError };
}

/* Fetch Companies */

export function fetchCompanies({
  filter,
  path,
}: {
  filter?: any;
  path?: string;
}) {
  const { data, isLoading, isError } = useFetchData({
    path: path ?? `auth/company/users`,
    queryKey: "fetch-match-awarding-bodies",
    filterData: { ...filter },
    //enabled: !!sessionId,
  });

  const options = data?.data?.map((item: any) => ({
    label: item?.name || item?.title || "Unknown",
    value: item?.id,
    code: item?.code,
  }));

  return { options, data, isLoading, isError };
}

/* Fetch Modules by Course Id */
export function fetchModulesByCourseId({
  courseId,
  filter,
  enabled,
}: {
  courseId: string;
  filter?: any;
  enabled?: boolean;
}) {
  const { data, isLoading, isError } = useFetchData({
    method: "GET",
    path: `faculty-management/courses-list?id=${courseId}`,
    queryKey: `fetch-modules-list-by-courseId`,
    enabled,
    filterData: { ...filter },
  });
  const course = data?.data?.find((c: any) => c.courseId === courseId);
  const modules: any = course?.modules || [];

  const options =
    modules.map((mod: any) => ({
      value: mod.id,
      label: mod.title,
    })) ?? [];

  return { options, data, isLoading, isError };
}
