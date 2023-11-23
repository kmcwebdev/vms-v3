import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { RecentVisitors } from "@/types/global/visitor";



const recentVisitorsQuery = async () => {
    const URL = `/api/analytics/visitors/recent/visits`;

    const response = await axios.get(URL);
  
    return (await response.data) as RecentVisitors[];
}

export const useGetRecentVisitors = () => {

    const {data, isLoading, isFetching, isError, error } = useQuery({
        queryKey: ["recent-visitors"],
        queryFn: () => recentVisitorsQuery()
    })

    return {
        data, isLoading, isFetching, isError, error
    }

}