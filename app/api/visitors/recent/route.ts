import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const top_five_recent_visitor_query = `
      select
        v.visitor_id,
        initcap(v.first_name) as first_name, 
        initcap(v.last_name) as last_name,
        v.image_url,
        s.site_name,
        case
          when current_timestamp - v.created_at < interval '10 second' then 'just now'
          when current_timestamp - v.created_at < interval '1 minute' then extract(second from current_timestamp - v.created_at) || ' seconds ago'
          when current_timestamp - v.created_at < interval '1 hour' then extract(minute from current_timestamp - v.created_at) || ' minutes ago'
          else extract(hour from current_timestamp - v.created_at) || ' hours ago'
        end as created_at
      from visitors v
      join sites s on v.site_id = s.site_id
      order by v.created_at desc
      limit 5;
    `;

    return NextResponse.json(await sql.query(top_five_recent_visitor_query));
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
