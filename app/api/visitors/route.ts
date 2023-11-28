import { NextResponse } from "next/server";
import { QueryResult, sql } from "@vercel/postgres";
import z from 'zod'

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

    const offset = (pageNumber - 1) * pageSize;
    
    let get_visitors_query = 
    `select * from visitors v`;
    
    let count_query = `select count(*) from visitors v`;
    
    if (filter) {
      get_visitors_query += ` where tsv @@ to_tsquery('${filter}')` ;
      count_query += ` where tsv @@ to_tsquery('${filter}')`;
    }

    if (site) {
      const siteCondition = ` ${filter ? 'and' : 'where'} site_id = '${site}'`;
      get_visitors_query += siteCondition;
      count_query += siteCondition;
    }
    // and site_id='${site ? site?.toString() : null}'`;
    get_visitors_query += `
      order by visitor_id
      limit ${pageSize} 
      offset ${offset}`;
    
    const result = await sql.query(get_visitors_query);
    const countResult: QueryResult<{ count: number }> = await sql.query(count_query);
    
    const totalRecords = countResult.rows[0].count;
    const totalPages = Math.ceil(totalRecords / pageSize);
    
    return NextResponse.json({ data: result.rows, totalPages: totalPages });
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}


