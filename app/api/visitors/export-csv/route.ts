import { parse } from "json2csv";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  try{

    const site_query = `select site_id, site_name from sites`

    const result = await sql.query(site_query)
  
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
