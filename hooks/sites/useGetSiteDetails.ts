import { useQuery } from "@tanstack/react-query";
import type { Site } from "@/types/global/site";
import axios from "axios";

type SiteQueryParams = {
    id: string
} 

const getSiteDetailsQuery = async ({id}:SiteQueryParams) => {
    const url = `/api/sites/details?id=${id}`

    const response = await fetch(url)

    return (await response.json()) as Site
}

export const useGetSiteDetails = (id:SiteQueryParams) => {
        const {data, isLoading, isFetching, isError} = useQuery({
            queryKey: ['site-details', JSON.stringify(id)],
            queryFn: () => getSiteDetailsQuery(id)
        })

        return {
            data,
            isLoading,
            isFetching,
            isError
        }
}