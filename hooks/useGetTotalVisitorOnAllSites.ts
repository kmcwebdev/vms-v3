import { useQuery } from "@tanstack/react-query"

const getTotalVisitorOnAllSitesQuery = async () => {
    const URL = `api/analytics/visitor-count/total-visitors`

    const response = await fetch(URL)

    return (await response.json()) as number
}

export const useGetTotalVisitorOnAllSites = () => {

    const {data, isLoading, isFetching, isError} = useQuery({
        queryKey: ['total-visitor-on-all-sites'],
        queryFn: () => getTotalVisitorOnAllSitesQuery(),
    })

    return {
        data,
        isLoading,
        isFetching,
        isError,
    }

}