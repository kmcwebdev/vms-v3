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
          and site_id in (${site_ids
            .map((element) => `'${element}'`)
            .join(",")}) -- sites
        group by
          date_trunc('month', visit_time) -- Truncate the visit_time column
      ) as counts on dates.month = counts.month
      order by
        extract(month from dates.month);
    `;

    const result = await sql.query(visitor_count_by_year_group_by_month_query, [
      year,
    ]);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
