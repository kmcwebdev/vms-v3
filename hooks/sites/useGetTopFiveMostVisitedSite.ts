import { useQuery } from "@tanstack/react-query";

type TopFiveMostVisitedSite = {
    site_name: string,
    visitor_count: string
}

const getTopFiveMostVisitedSiteQuery = async () => {
    const url = `/api/analytics/sites/top-five`
    const response = await fetch(url)

    return (await response.json()) as TopFiveMostVisitedSite[]

}

export const useGetTopFiveMostVisitedSite = () => {
    const {data, isLoading, isError, isFetching} = useQuery({
        queryKey: ['top-five-most-visited-site'],
        queryFn: () => getTopFiveMostVisitedSiteQuery()
    })

    return {
        data, isLoading, isError, isFetching
    }
}