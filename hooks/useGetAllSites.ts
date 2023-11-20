import { useQuery } from "@tanstack/react-query";
import type {Site} from "@/types/site";

type GetAllSitesQuery = {
    filter?: string | undefined
}

const getAllSitesQuery = async ({filter}:GetAllSitesQuery = {}) => {

    const params = new URLSearchParams({
        filter: filter ? filter : ''
    });
  const URL = `/api/area-sites/all${filter ? `${'?' + params.toString()}` : ''}`;
  const response = await fetch(URL);
  return (await response.json()) as Site[];
};

export const useGetAllSites = ({
    filter 
}: GetAllSitesQuery = {}) => {
    const {
        data: dataArray,
        isLoading,
        isFetching,
        isError
    } = useQuery({
        queryKey: ['all-sites'],
        queryFn: () => getAllSitesQuery({
            filter
        })
    });
    const data = dataArray ? dataArray : null;
    return {
        data,
        isLoading,
        isFetching,
        isError
    };
}