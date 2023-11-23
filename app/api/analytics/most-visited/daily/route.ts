import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const most_visited_site_on_daily_basis_query = `
      -- most visited site on a daily basis (card)
      select s.site_name, visitor_count
      from (
        select site_id, count(*) as visitor_count, row_number() over (order by count(*) desc) as rn
        from visitor_logs
        group by site_id, date_trunc('day', visit_time)
      ) as subquery
      join sites as s on s.site_id = subquery.site_id
      where s.is_active = true and rn = 1;
    `;

    const result = await sql.query(most_visited_site_on_daily_basis_query);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
