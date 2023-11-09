import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import BarChart from "@/components/global/BarChart";
import type { ChartData } from "chart.js";

const MostVisitedSites = () => {
  const sites = [
    "Armstrong Corporate Center",
    "V Corporate Center",
    "One Griffinstone",
    "Cyber Sigma",
    "SM Aura Office Tower",
    "UpTown Place Tower 2",
  ];

  const mostVisitedSitesGraphData = {
    labels: sites,
    datasets: [
      {
        label: "Visitors",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderRadius: 4,
        barThickness: 45,
        maxBarThickness: 55,
      },
    ],
  };

  return (
    <Card className="w-3/5">
      <CardHeader>
        <CardTitle>Most visited sites</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
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
