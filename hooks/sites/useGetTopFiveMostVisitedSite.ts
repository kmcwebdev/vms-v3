import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type TopFiveMostVisitedSite = {
    site_name: string,
    visitor_count: string
}

const getTopFiveMostVisitedSiteQuery = async () => {
    const url = `/api/analytics/sites/top-five`
    const response = await axios(url)

    return (await response.data()) as TopFiveMostVisitedSite[]

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