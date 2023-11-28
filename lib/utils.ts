import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
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