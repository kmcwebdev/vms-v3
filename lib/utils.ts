import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { sql } from "@vercel/postgres";

interface PaginationResult {
  items: any[];
  pageNumber: number;
  pageLimit: number;
  totalPages: number;
  totalRecords: number;
}
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSearchParams(queryParams: Record<string, any>) {
  const isValidJSONObject =
    queryParams !== null &&
    typeof queryParams === "object" &&
    !Array.isArray(queryParams);

  if (isValidJSONObject) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== "" && value !== null) {
        searchParams.append(key, String(value));
      }
    }

    return searchParams;
  }
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleString('en-US', options);
}

export function formatDateToYYMMDD(date: string) {
  const dateNow = new Date(date)
  const formattedDate = `${dateNow.getFullYear()}${dateNow.getMonth()}${dateNow.getDate()}`
  return formattedDate
}

export async function paginateQuery(
  pageNumber: number,
  pageLimit: number,
  query: string,
): Promise<PaginationResult> {
  try {
    const offset = (pageNumber - 1) * pageLimit;

    const paginatedQuery = `${query} limit ${pageLimit} offset ${offset}`;

    const result = await sql.query(paginatedQuery);

    const totalRecords = Number(result.rows[0]?.total_records) || 0;
    const totalPages = Math.ceil(totalRecords / pageLimit);


    return {
      items: result.rows,
      pageNumber: pageNumber,
      pageLimit: pageLimit,
      totalPages: totalPages,
      totalRecords: totalRecords,
    };
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Database query error");
  }
}