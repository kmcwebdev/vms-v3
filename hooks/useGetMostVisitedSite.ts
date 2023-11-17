import { useQuery } from "@tanstack/react-query"


const getMostVisitedSiteQuery = async () => {
    const URL = `api/analytics/most-visited`

    const response = await fetch(URL)

    return (await response.json()) 
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