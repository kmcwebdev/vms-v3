import { useQuery } from "@tanstack/react-query";

const getVisitorPerSiteQuery = async () => {
    const url = `/api/analytics/visitors/count/sites`

    const response = await fetch(url);

    return (await response.json())
}

export const useGetVisitorPerSite = () => {

    const {data, isLoading, isFetching, isError} = useQuery({
        queryKey: ['visitors-per-site'],
        queryFn: () => getVisitorPerSiteQuery()
    })

    return {
        data, isLoading, isFetching, isError
    }

}