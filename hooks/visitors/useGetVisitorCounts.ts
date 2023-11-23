import { useQuery } from "@tanstack/react-query";

interface QueryParams {
  month_in_number?: string;
  year?: string;
  site_ids: string;
}

type DateTrunc = "daily" | "weekly" | "monthly";

const getVisitorCount = async (
  dateTrunc: DateTrunc,
  filter?: { month_in_number?: string; year?: string; site_ids: string },
) => {
  const params = new URLSearchParams(filter);

  const url = `/api/analytics/visitors/count/${dateTrunc}${
    dateTrunc ? `${"?" + params.toString()}` : ""
  }`;

  const response = await fetch(url);

  return (await response.json()) as {
    formatted_date: string;
    visitor_count: number;
  }[];
};

export const useGetVisitorCounts = (
  dateTrunc: DateTrunc,
  filter?: QueryParams,
) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [dateTrunc, JSON.stringify(filter)],
    queryFn: () => getVisitorCount(dateTrunc, filter),
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
