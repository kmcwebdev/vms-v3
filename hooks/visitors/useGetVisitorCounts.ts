const getVisitorCount = async (
  dateTrunc: "dayly" | "weekly" | "monthly",
  filter: { month_in_number: string; year: string; site_ids: string },
) => {
  const params = new URLSearchParams(filter);

  const url = `/api/analytics/visitors/count/${dateTrunc}${
    dateTrunc ? `${"?" + params.toString()}` : ""
  }`;

  const response = await fetch(url);

  return (await response.json()) as {
    formatted_date: string;
    visitor_count: number;
  };
};

export const useGetVisitorCounts = () => {};
