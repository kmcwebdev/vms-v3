import { useQuery } from "@tanstack/react-query";

type VisitorsPerSiteCount = {
    site_name: string,
    visitor_count: string
}

const getVisitorPerSiteQuery = async (year: string) => {
    const params = new URLSearchParams({
        year: year ? year : "",
      });
    

    const url = `/api/analytics/visitors/count/sites${year ? `${"?" + params.toString()}` : ""}`

    const response = await fetch(url);

    return (await response.json()) as VisitorsPerSiteCount[]
}

export const useGetVisitorsPerSiteCount = (year:string) => {

    const {data, isLoading, isFetching, isError} = useQuery({
        queryKey: ['visitors-per-site-count',  JSON.stringify(year)],
        queryFn: () => getVisitorPerSiteQuery(year)
    })

    return {
        data, isLoading, isFetching, isError
    }

}