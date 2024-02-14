import { useQuery } from "@tanstack/react-query"
import type { MostVisitedSite } from "@/types/global/site"

type LeastVisitedSite = MostVisitedSite

const getLeastVisitedSiteQuery = async () => {
    const URL = `api/analytics/least-visited`

    const response = await fetch(URL)

    return (await response.json()) as LeastVisitedSite
}

export const useGetLeastVisitedSite = () => {
    const {
        data: dataArray,
        isLoading,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ['least-visited-site'],
        queryFn: () => getLeastVisitedSiteQuery(),
    })

    const data = dataArray ? dataArray[0] : null;

    return {
        data,
        isLoading,
        isFetching,
        isError,
    }


}