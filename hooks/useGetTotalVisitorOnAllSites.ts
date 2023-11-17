import { useQuery } from "@tanstack/react-query"

type TotalVisitorOnAllSites = [
    {
        total_visitors: string
    }
]

const getTotalVisitorOnAllSitesQuery = async () => {
    const URL = `api/analytics/visitor-count/total-visitors`

    const response = await fetch(URL)

    return (await response.json()) as TotalVisitorOnAllSites
}

export const useGetTotalVisitorOnAllSites = () => {

    const {data: dataArray, isLoading, isFetching, isError} = useQuery({
        queryKey: ['total-visitor-on-all-sites'],
        queryFn: () => getTotalVisitorOnAllSitesQuery(),
    })

    const data = dataArray ? dataArray[0] : null;

    return {
        data,
        isLoading,
        isFetching,
        isError,
    }

}