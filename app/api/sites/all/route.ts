import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const querySchema = z.object({
  filter: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const queryParams = querySchema.safeParse(Object.fromEntries(searchParams));

    if (queryParams.success === false) {
      return new Response(queryParams.error.message, {
        status: 400,
        statusText: "Bad request",
      });
    }

    const { filter } = queryParams.data;

    const all_sites_query = `
    select count(s.site_id) as visitor_count, s.site_id , s.site_name, s.site_banner, s.site_images, address  from visitors v 
    inner join sites s on s.site_id = v.site_id 
    ${filter ? `where site_name ilike '%${filter}%'` : ``}
    group by s.site_id order by s.site_name 

    `;
    // select site_id, site_name, site_banner, site_images, address 
    // from sites 
    // ${filter ? `where site_name ilike '%${filter}%'` : ``}
    // order by site_name



    const result = await sql.query(all_sites_query);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message,
      },
      {
        status: 500,
        statusText: "Internal server error",
      },
    );
  }
}
