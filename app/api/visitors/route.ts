import { NextResponse } from "next/server";
import { QueryResult, sql } from "@vercel/postgres";
import z from 'zod'
import { paginateQuery } from "@/lib/utils";

const querySchema = z.object({
  pageSize: z.preprocess(
    (input) => Number(input ? input : "1"),
    z.number().min(1),
  )
  .optional(),
  pageNumber: z.preprocess(
    (input) => Number(input ? input : "1"),
    z.number().min(1),
  )
  .optional(),
  filter: z.string().min(1).optional(),
  site: z.string().optional().nullable(),
})


export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url);

    const queryParams = querySchema.safeParse(Object.fromEntries(searchParams));

    if (queryParams.success === false) {
      return new Response(queryParams.error.message, {
        status: 400,
        statusText: "Bad request",
      });
    }

    let {pageNumber = 1, pageSize = 10, filter, site} = queryParams.data
    
    let get_visitors_query = 
    `select *, 
    count(*) over() as total_records 
    from visitors v 
    inner join sites s on v.site_id = s.site_id 
    inner join reason_of_visits rov on v.reason_of_visit_id = rov.reason_of_visit_id`;
    
    if (filter) {
      get_visitors_query += ` where tsv @@ to_tsquery('${filter}')` ;
    }

    if (site) {
      const siteCondition = ` ${filter ? 'and' : 'where'} site_id = '${site}'`;
      get_visitors_query += siteCondition;
    }

    get_visitors_query += `
      order by visitor_id

    `;
  
    const result = await paginateQuery(pageNumber, pageSize, get_visitors_query)
    
    return NextResponse.json({ data: result.items, pageNumber: result.pageNumber, pageSize: result.pageLimit, totalPage: result.totalPages, totalRecord: result.totalRecords });
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}


