import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import BarChart from "@/components/global/bar-chart";
import type { ChartData } from "chart.js";
import { useGetTopFiveMostVisitedSite } from "@/hooks/sites/useGetTopFiveMostVisitedSite";

const MostVisitedSites = () => {
  const { data: topFiveMostVisitedSite } = useGetTopFiveMostVisitedSite();

  const topFiveMostVisitedSitesData = {
    label:
      topFiveMostVisitedSite &&
      topFiveMostVisitedSite.map((item) => item.site_name),
    data:
      topFiveMostVisitedSite &&
      topFiveMostVisitedSite.map((item) => parseInt(item.visitor_count)),
  };

  const mostVisitedSitesGraphData = {
    labels: topFiveMostVisitedSitesData.label,
    datasets: [
      {
        label: "Visitors",
        data: topFiveMostVisitedSitesData.data,
        backgroundColor: ["#f97315"],
        borderRadius: 6,
        barThickness: 45,
        maxBarThickness: 55,
      },
    ],
  };

  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle>Most visited sites</CardTitle>
        <CardDescription>Top five most visited</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          height="200"
          data={mostVisitedSitesGraphData as ChartData<"bar">}
          options={{
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                border: {
                  dash: [4, 8],
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MostVisitedSites;
