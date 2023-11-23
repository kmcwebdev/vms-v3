import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

export const querySchema = z.object({
  year: z
    .preprocess((input) => Number(input), z.number().min(2000))
    .optional()
    .default(new Date().getFullYear()),
  site_ids: z
    .preprocess(
      (input) => String(input).split(/\s*,\s*/),
      z.array(z.string().uuid()),
    )
    .optional(),
});

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

    let { year, site_ids } = queryParams.data;

    if (!site_ids) {
      site_ids = (await sql.query("select site_id from sites")).rows.map(
        (data) => data.site_id,
      );
    }

    const visitor_count_by_site_query = `
      select s.site_name, count(*) as visitor_count
      from visitor_logs v
      join sites s on v.site_id = s.site_id
      where
          extract(year from visit_time) = $1 -- year
          and site_id in (${site_ids
            .map((element) => `'${element}'`)
            .join(",")}) -- sites
      group by s.site_name
      order by visitor_count;
    `;

    const result = await sql.query(visitor_count_by_site_query, [year]);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
