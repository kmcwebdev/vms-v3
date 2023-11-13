import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import BarChart from "@/components/global/bar-chart";
import type { ChartData } from "chart.js";

const MostVisitedSites = () => {
  const sites = ["Armstrong", "VCorp", "OG", "Sigma", "SM Aura ", "UPT"];

  const mostVisitedSitesGraphData = {
    labels: sites,
    datasets: [
      {
        label: "Visitors",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ["#f97315"],
        borderRadius: 6,
        barThickness: 45,
        maxBarThickness: 55,
      },
    ],
  };

  return (
    <Card className=" w-full">
      <CardHeader>
        <CardTitle>Most visited sites</CardTitle>
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
