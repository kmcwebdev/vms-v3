import { useQuery } from "@tanstack/react-query"
import type { Visitor } from "@/types/global/visitor";

type QueryParams = {
    pageSize: number,
    pageNumber: number
}

const getVisitorsQuery = async ({pageNumber,
    pageSize}:QueryParams) => {

        const params = new URLSearchParams({
            pageNumber: pageNumber ? pageNumber.toString() :'1',
            pageSize: pageSize ? pageSize.toString() : '10'
          });

    const url = `/api/visitors${pageNumber 
        ? `${"?" + params}`:""}`

    const result = await fetch(url)

    return await (result.json()) as Visitor[]
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
        queryKey: ['all-visitors', `pageNumber:${JSON.stringify(pageNumber)}` , `pageSize:${JSON.stringify(pageSize) }` ],
        queryFn: () => getVisitorsQuery({
            pageNumber: pageNumber,
            pageSize: pageSize
        })
    })

    return {
        data,
        isLoading,
        isFetching,
        isError
    }
}