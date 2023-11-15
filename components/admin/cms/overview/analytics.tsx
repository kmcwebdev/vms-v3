"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarChart from "@/components/global/bar-chart";
import type { ChartData } from "chart.js";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const KMC_SITES_OBJECTS = [
  { label: "VCorp", value: "vcorp" },
  { value: "armstrong", label: "Armstrong" },
  { value: "frabelle", label: "Frabelle" },
  { value: "one-ayala", label: "One Ayala" },
  { value: "picadilly", label: "Picadilly" },
  { value: "cyber-sigma", label: "Cyber Sigma" },
  { value: "sm-aura", label: "SM Aura" },
  { value: "uptown", label: "UpTown" },
  { value: "four-neo", label: "Four/Neo" },
  { value: "arthaland", label: "Arthaland" },
  { value: "gamma", label: "Gamma" },
  { value: "rbc", label: "RBC T1" },
  { value: "jbt", label: "Jollibee Tower" },
  { value: "zeta", label: "Zeta" },
  { value: "sm-north", label: "SM North" },
  { value: "rockwell", label: "Rockwell Sheridan" },
  { value: "podium", label: "Podium West" },
  { value: "aeropark", label: "Aeropark" },
  { value: "og", label: "OG" },
  { value: "axis", label: "Axis Tower" },
  { value: "skyrise", label: "Skyrise 4A" },
  { value: "skyrise-4b", label: "Skyrise 4B" },
  { value: "hm-tower", label: "HM Tower" },
  { value: "lexmark", label: "Lexmark" },
  { value: "five-ecom", label: "Five Ecom" },
];

const Analytics = () => {
  const router = useRouter();

  const filterForm = useForm();

  const randomNumbers = Array.from({ length: KMC_SITES_OBJECTS.length }, () =>
    Math.floor(Math.random() * 100),
  );

  const backgroundColors = randomNumbers.map((_, index) =>
    index % 2 === 0 ? "#f97315" : "#fb923c",
  );

  const visitorAnalyticsGraphData = {
    labels: KMC_SITES_OBJECTS.map((site) => site.label),
    datasets: [
      {
        label: "Visitors",
        data: randomNumbers,
        backgroundColor: backgroundColors,
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
