import { useQuery } from "@tanstack/react-query";
import type { TotalVisitorOnAllSites } from "@/types/visitor";

const getTotalVisitorOnAllSitesQuery = async () => {
  const URL = `api/analytics/visitors/count/total`;

  const response = await fetch(URL);

  return (await response.json()) as TotalVisitorOnAllSites;
};

export const useGetTotalVisitorOnAllSites = () => {
  const {
    data: dataArray,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["total-visitor-on-all-sites"],
    queryFn: () => getTotalVisitorOnAllSitesQuery(),
  });

  const data = dataArray ? dataArray[0] : null;

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
