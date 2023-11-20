import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET () {
    try{
        const all_sites_query = `SELECT site_id, site_name, site_banner, site_images, address FROM sites ORDER BY site_name`

        const result = await sql.query(all_sites_query);

        return NextResponse.json(result.rows);
    }
    catch(error: any){
        return NextResponse.json({
            status: 500, message: error.message
        },{
            status: 500, statusText: "Internal server error"
        });
    }

}