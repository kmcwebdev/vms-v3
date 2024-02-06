import { useQuery } from "@tanstack/react-query"
import type { MostVisitedSite } from "@/types/global/site"

const getMostVisitedSiteQuery = async () => {
    const URL = `api/analytics/most-visited`

    const response = await fetch(URL)

    return (await response.json()) as MostVisitedSite
}

export const useGetMostVisitedSite = () => {
    const {
        data: dataArray,
        isLoading,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ['most-visited-site'],
        queryFn: () => getMostVisitedSiteQuery(),
    })

    const data = dataArray ? dataArray[0] : null;

    return {
        data,
        isLoading,
        isFetching,
        isError,
    }


}