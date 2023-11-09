import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const querySchema = z.object({
  month_in_number: z.preprocess(
    (input) => Number(input),
    z.number().min(1).max(12).default(1),
  ),
  year: z.preprocess((input) => Number(input), z.number().min(1)),
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

    const count_by_days_in_month_query = `
      select to_char(date_trunc('day', visit_time), 'Month DD, YYYY') as formatted_date, count(*) as visitor_count
      from visitor_logs
      where extract(month from visit_time) = $1 -- October
      and extract(year from visit_time) = $2 -- Year 2023
      group by formatted_date
      order by formatted_date;
    `;

    return NextResponse.json(
      await sql.query(count_by_days_in_month_query, [
        queryParams.data.month_in_number,
        queryParams.data.year,
      ]),
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
