import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import z from 'zod'

const querySchema = z.object({
  pageSize: z.preprocess(
    (input) => Number(input ? input : "1"),
    z.number().min(1).max(12),
  )
  .optional(),
  pageNumber: z.preprocess(
    (input) => Number(input ? input : "1"),
    z.number().min(1).max(12),
  )
  .optional(),

})

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

    let {pageNumber = 1, pageSize = 10} = queryParams.data


const offset = (pageNumber - 1) * pageSize;
const get_visitors_query = `SELECT * FROM visitors ORDER BY visitor_id LIMIT ${pageSize} OFFSET ${offset}`;

    const result = await sql.query(get_visitors_query);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }
}


