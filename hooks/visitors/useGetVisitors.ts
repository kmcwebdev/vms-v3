import { useQuery } from "@tanstack/react-query"
import type { Visitor } from "@/types/global/visitor";
import axios from "axios";

export type VisitorQueryParams = {
    pageSize?: number,
    pageNumber?: number,
    filter?:string | undefined | null
}

const getVisitorsQuery = async ({pageNumber,
    pageSize, filter}:VisitorQueryParams) => {

        const params = new URLSearchParams({
            pageNumber: pageNumber ? pageNumber.toString() :'1',
            pageSize: pageSize ? pageSize.toString() : '10',
          });
        const url = `/api/visitors?${params && params.toString()}${filter ? `&filter=${filter.toString() }`: ''}`

    const result = await axios(url)

    return (await result.data) as {
        data:Visitor[],
        totalPages: number
    }
}

export const useGetVisitors = ({
pageNumber,
pageSize,
filter
}:VisitorQueryParams) => {
    const {
        data,
        isLoading,
        isFetching,
        isError
    } = useQuery({
        queryKey: ['all-visitors-list', `pageNumber:${JSON.stringify(pageNumber)}` , `pageSize:${JSON.stringify(pageSize) }`, `filter:${JSON.stringify(filter?.toString()) }` ],
        queryFn: () => getVisitorsQuery({
            pageNumber: pageNumber ? pageNumber : 1,
            pageSize: pageSize ? pageSize : 10,
            filter: filter
        })
    })

    return {
        data,
        isLoading,
        isFetching,
        isError
    }
}