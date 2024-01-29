import { parse } from "json2csv";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import z from 'zod'
import { formatDateToYYMMDD } from "@/lib/utils";

const visitorExportFiltersSchema = z.object({
  site_id: z.string().optional()
})

export async function GET(req: Request) {
  try{

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const query = Object.fromEntries(searchParams);
    const parsedQuery = visitorExportFiltersSchema.safeParse(query);

    if (!parsedQuery.success) {
      return new Response('Invalid query parameters', { status: 400 });
    }

    const {site_id} = parsedQuery.data


    const visitor_query = `
    select 
    v.first_name, 
    v.last_name,
    v.email,
    v.person_to_visit,
    v.company_to_visit,
    s.site_name,
    rov.reason_name
    from visitors v
    join sites s on v.site_id = s.site_id
    join reason_of_visits rov on v.reason_of_visit_id = rov.reason_of_visit_id
    where v.site_id  = '${site_id}' 
    order by v.created_at desc`

    const result = await sql.query(visitor_query)
  
    const csv = parse(result.rows);

    const date = new Date()
  
    return new Response(csv, {
      headers: {
        "content-disposition": `vms-visitors-export-${formatDateToYYMMDD(date.toString())}.csv`,
      },
    });
  }
  catch(error: any){
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }

 
}
