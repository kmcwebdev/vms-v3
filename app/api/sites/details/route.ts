import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import z from 'zod'

const querySchema = z.object({
    id: z.any(),
  });

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const queryParams = querySchema.safeParse(Object.fromEntries(searchParams));

        if (queryParams.success === false) {
            return new Response(queryParams.error.message, {
              status: 400,
              statusText: "Bad request",
            });
          }

          const { id } = queryParams.data;

          const get_site_by_id_query = `
          SELECT * FROM sites WHERE site_id = $1
        `;
        const result = await sql.query(get_site_by_id_query, [id]);

        return NextResponse.json(result.rows);
    } 
    catch(error:any) {
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
