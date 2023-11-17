import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const visitor_count_by_site_query = `
      select s.site_name, count(*) as visitor_count
      from visitor_logs v
      join sites s on v.site_id = s.site_id
      group by s.site_name
      order by visitor_count;
    `;

    const result = await sql.query(visitor_count_by_site_query);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
