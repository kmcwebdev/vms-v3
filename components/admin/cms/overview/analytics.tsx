"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarChart from "@/components/global/bar-chart";
import type { ChartData } from "chart.js";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import { createSearchParams } from "@/lib/utils";
import { useRouter } from "next/navigation";

const KMC_SITES = [
  "VCorp",
  "Armstrong",
  "Frabelle",
  "One Ayala",
  "Picadilly",
  "Cyber Sigma",
  "SM Aura",
  "UpTown",
  "Four/Neo",
  "Arthaland",
  "Gamma",
  "RBC T1",
  "Jollibee Tower",
  "Zeta",
  "SM North",
  "Rockwell Sheridan",
  "Podium West",
  "Aeropark",
  "OG",
  "Axis Tower",
  "Skyrise 4A",
  "Skyrise 4B",
  "HM Tower",
  "Lexmark",
  "Five Ecom",
];

const KMC_SITES_OBJECTS = KMC_SITES.map((site) => ({
  value: site,
  label: site,
}));

const Analytics = () => {
  const router = useRouter();

  const filterForm = useForm();

  const visitorAnalyticsGraphData = {
    labels: KMC_SITES,
    datasets: [
      {
        label: "Visitors",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ["#f97315"],
        borderRadius: 6,
        barThickness: 28,
        maxBarThickness: 40,
      },
    ],
  };

  const onFilterSubmit = () => {
    console.log("sub");
  };

  return (
    <Card className="mt-4 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>Visitors per site</p>
          <Form
            name="filter"
            useFormReturn={filterForm}
            onSubmit={onFilterSubmit}
            className="flex items-center space-x-2"
          >
            <Form.Combobox
              name="site"
              placeholder="Site"
              onSelect={(e) => {
                const url = new URL(window.location.href);
                url.searchParams.set("site", e);
                router.replace(url.toString(), {
                  scroll: false,
                });
              }}
              data={KMC_SITES_OBJECTS}
            />
            <Form.Combobox
              name="filter"
              placeholder="Filter by"
              onSelect={(e) => {
                const url = new URL(window.location.href);
                url.searchParams.set("filter", e);
                router.replace(url.toString(), {
                  scroll: false,
                });
              }}
              data={[
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
              ]}
            />
          </Form>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          height="180"
          data={visitorAnalyticsGraphData as ChartData<"bar">}
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

export default Analytics;
