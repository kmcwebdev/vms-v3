import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

export const querySchema = z.object({
  month_in_number: z
    .preprocess(
      (input) => Number(input ? input : "1"),
      z.number().min(1).max(12),
    )
    .optional()
    .default(1),
  year: z
    .preprocess((input) => Number(input), z.number().min(2000))
    .optional()
    .default(new Date().getFullYear()),
  site_ids: z.preprocess(
    (input) => String(input).split(","),
    z.array(z.string().uuid()).min(1),
  ),
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

    const { month_in_number, year, site_ids } = queryParams.data;

    const visitor_count_by_month_query = `
      -- visitor count by month and year (line chart)
      select to_char(date_trunc('month', visit_time), 'Month DD, YYYY') as formatted_date, count(*) as visitor_count
      from visitor_logs
      where extract(month from visit_time) = $1 -- Month in number
      and extract(year from visit_time) = $2 -- Year
      and site_id in $3 -- sites
      group by formatted_date
      order by formatted_date;
    `;

    const result = await sql.query(visitor_count_by_month_query, [
      month_in_number,
      year,
      site_ids,
    ]);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
