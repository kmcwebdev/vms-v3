import { parse } from "json2csv";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  try{

    const visitor_query = `select first_name, last_name from visitors where site_id  = '922c71be-f78b-4593-8186-de9c2f4f7680' limit 10`

    const result = await sql.query(visitor_query)
  
    const csv = parse(result.rows);
  
    return new Response(csv, {
      headers: {
        "content-disposition": `attachment; filename=${Date.now()}.csv`,
      },
    });
  }
  catch(error: any){
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" },
    );
  }

 
}
