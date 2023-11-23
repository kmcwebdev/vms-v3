"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarChart from "@/components/global/bar-chart";
import type { ChartData } from "chart.js";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Users2 } from "lucide-react";
import VisitorCount from "./charts/visitor-count";

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

  const visitorAnalyticsGraphData = {
    labels: KMC_SITES_OBJECTS.map((site) => site.label),
    datasets: [
      {
        label: "Visitors",
        data: randomNumbers,
        backgroundColor: "#f97315",
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
    <div className="space-y-2.5">
      <DataCard
        title="Current visitors"
        description="Visitor count by month of December (2023)"
        value="200+"
        icon={<Users2 />}
      />
      <VisitorCount />
      <Card className="mt-4 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between ">
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
                  { label: "Weekly", value: "week" },
                  { label: "Monthly", value: "month" },
                ]}
              />
            </Form>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
    </div>
  );
};

export default Analytics;

interface DataCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  description: string;
}

const DataCard = ({ title, icon, value, description }: DataCardProps) => {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-gray-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="truncate text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
