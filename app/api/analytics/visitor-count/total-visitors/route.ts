import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const total_visitors_query = `
            select count(*) as total_visitors
            from visitor_logs;
        `;

    const result = await sql.query(total_visitors_query);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}
