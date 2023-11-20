import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const searchTerm = request.query.searchTerm;

    const all_sites_query = `
        select site_id, site_name, site_banner, site_images, address 
        from sites 
        ${searchTerm ? `where site_name ilike '%${searchTerm}%'` : ``}
        order by site_name
    `;

    const result = await sql.query(all_sites_query);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: error.message,
      },
      {
        status: 500,
        statusText: "Internal server error",
      },
    );
  }
}
