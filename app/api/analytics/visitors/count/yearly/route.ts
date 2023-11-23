import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const querySchema = z.object({
  year: z.preprocess((input) => Number(input), z.number().min(1)),
  site_ids: z.array(z.string().uuid()).min(1),
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

    const { year, site_ids } = queryParams.data;

    const visitor_count_by_year_group_by_month_query = `
      -- visitor count group by month in a year with default result of 0 (line chart)
      select
        to_char(dates.month, 'Month') as month,
        coalesce(visitor_count, 0) as visitor_count
      from
        (
          select
            generate_series(
              date_trunc('year', current_date),
              date_trunc('year', current_date) + interval '1 year' - interval '1 day',
              interval '1 month'
            ) as month
        ) as dates
      left join (
        select
          date_trunc('month', visit_time) as month,
          count(*) as visitor_count
        from
          visitor_logs
        where
          extract(year from visit_time) = $1 -- year
          and site_id in $2 -- sites
        group by
          date_trunc('month', visit_time) -- Truncate the visit_time column
      ) as counts on dates.month = counts.month
      order by
        extract(month from dates.month);
    `;

    return NextResponse.json(
      await sql.query(visitor_count_by_year_group_by_month_query, [
        year,
        site_ids,
      ]),
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
