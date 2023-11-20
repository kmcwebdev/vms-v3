import { useQuery } from "@tanstack/react-query";
import type {Site} from "@/types/site";

const getAllSitesQuery = async () => {
  const URL = `/api/area-sites/all`;
  const response = await fetch(URL);
  return (await response.json()) as Site[];
};

export const useGetAllSites = () => {
    const {
        data: dataArray,
        isLoading,
        isFetching,
        isError
    } = useQuery({
        queryKey: ['all-sites'],
        queryFn: () => getAllSitesQuery()
    });
    const data = dataArray ? dataArray : null;
    return {
        data,
        isLoading,
        isFetching,
        isError
    };
}