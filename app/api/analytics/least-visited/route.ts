import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const least_visited_query = `
      select s.site_name, count(*) 
      from visitor_logs vl
      join sites s on s.site_id = vl.site_id
      where s.is_active = true
      group by s.site_name
      order by count(*) asc
      limit 1;
    `;

    const result = await sql.query(least_visited_query);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
