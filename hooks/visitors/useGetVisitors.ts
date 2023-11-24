import { useQuery } from "@tanstack/react-query"
import type { Visitor } from "@/types/global/visitor";
import axios from "axios";

type QueryParams = {
    pageSize?: number,
    pageNumber?: number
}

const getVisitorsQuery = async ({pageNumber,
    pageSize}:QueryParams) => {

        const params = new URLSearchParams({
            pageNumber: pageNumber ? pageNumber.toString() :'1',
            pageSize: pageSize ? pageSize.toString() : '10'
          });

        const url = `/api/visitors?${params && params.toString()}`





    const result = await axios(url)

    return (await result.data) as Visitor[]
}

export const useGetVisitors = ({
pageNumber,
pageSize
}:QueryParams) => {
    const {
        data,
        isLoading,
        isFetching,
        isError
    } = useQuery({
        // queryKey: ['all-visitors-list', `pageNumber:${JSON.stringify(pageNumber)}` , `pageSize:${JSON.stringify(pageSize) }` ],
        queryKey: ['all-visitors-list'],
        queryFn: () => getVisitorsQuery({
            pageNumber: pageNumber ? pageNumber : 1,
            pageSize: pageSize ? pageSize : 10
        })
    })

    return {
        data,
        isLoading,
        isFetching,
        isError
    }
}