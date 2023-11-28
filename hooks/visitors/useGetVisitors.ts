import { useQuery } from "@tanstack/react-query"
import type { Visitor } from "@/types/global/visitor";
import axios from "axios";

export type VisitorQueryParams = {
    pageSize?: number,
    pageNumber?: number,
    filter?:string | undefined | null
    site?:string | undefined | null
}

const getVisitorsQuery = async ({pageNumber,
    pageSize, filter, site}:VisitorQueryParams) => {

        const params = new URLSearchParams({
            pageNumber: pageNumber ? pageNumber.toString() :'1',
            pageSize: pageSize ? pageSize.toString() : '10'
            // site: '922c71be-f78b-4593-8186-de9c2f4f7680'
          });
        const url = `/api/visitors?${params && params.toString()}${filter ? `&filter=${filter.toString() }`: ''}${site ? `&site=${site.toString()}` : ''}`

    const result = await axios(url)

    return (await result.data) as {
        data:Visitor[],
        totalPages: number
    }
}

export const useGetVisitors = ({
pageNumber,
pageSize,
filter,
site
}:VisitorQueryParams) => {
    const {
        data,
        isLoading,
        isFetching,
        isError
    } = useQuery({
        queryKey: 
        ['all-visitors-list'
        , `pageNumber:${JSON.stringify(pageNumber)}`
        , `pageSize:${JSON.stringify(pageSize) }`
        , `filter:${JSON.stringify(filter)}`
        , `site:${JSON.stringify(site)}`
    ],

        
        queryFn: () => getVisitorsQuery({
            pageNumber: pageNumber ? pageNumber : 1,
            pageSize: pageSize ? pageSize : 10,
            filter: filter,
            site: site,
        })
    })

    return {
        data,
        isLoading,
        isFetching,
        isError
    }
}