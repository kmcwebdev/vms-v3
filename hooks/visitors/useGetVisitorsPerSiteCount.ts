import { useQuery } from "@tanstack/react-query";

type VisitorsPerSiteCount = {
    site_name: string,
    visitor_count: string
}

const getVisitorPerSiteQuery = async () => {
    const url = `/api/analytics/visitors/count/sites`

    const response = await fetch(url);

    return (await response.json()) as VisitorsPerSiteCount[]
}

export const useGetVisitorsPerSiteCount = () => {

    const {data, isLoading, isFetching, isError} = useQuery({
        queryKey: ['visitors-per-site'],
        queryFn: () => getVisitorPerSiteQuery()
    })

    return {
        data, isLoading, isFetching, isError
    }

}