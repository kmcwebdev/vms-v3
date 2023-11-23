const getVisitorCount = async (
  dateTrunc: "dayly" | "weekly" | "monthly",
  filter: string,
) => {
  const params = new URLSearchParams(filter);

  const url = `/api/analytics/visitors/count/${dateTrunc}${
    dateTrunc ? `${"?" + params.toString()}` : ""
  }`;

  const response = await fetch(url);

  return await response.json();
};

export const useGetVisitorCounts = () => {};
