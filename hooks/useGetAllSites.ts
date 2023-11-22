import { useQuery } from "@tanstack/react-query";
import type { Site } from "@/types/site";

type GetAllSitesQuery = {
  filter?: string;
};

const getAllSitesQuery = async ({ filter }: GetAllSitesQuery = {}) => {
  const params = new URLSearchParams({
    filter: filter ? filter : "",
  });

  const URL = `/api/sites/all${filter ? `${"?" + params.toString()}` : ""}`;

  const response = await fetch(URL);

  return (await response.json()) as Site[];
};

export const useGetAllSites = (
  { filter }: GetAllSitesQuery = {},
  initialData: Site[],
) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    initialData,
    queryKey: ["all-sites", JSON.stringify(filter)],
    queryFn: () =>
      getAllSitesQuery({
        filter,
      }),
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
