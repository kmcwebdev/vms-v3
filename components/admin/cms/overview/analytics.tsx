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
import { useGetVisitorsPerSiteCount } from "@/hooks/visitors/useGetVisitorsPerSiteCount";

const Analytics = () => {
  const router = useRouter();

  const { data: visitorsPerSiteCountData } = useGetVisitorsPerSiteCount();

  const filterForm = useForm();

  const visitorPerSiteCount =
    visitorsPerSiteCountData &&
    visitorsPerSiteCountData.map((item) => parseInt(item.visitor_count));

  const visitorPerSiteCountLabel =
    visitorsPerSiteCountData &&
    visitorsPerSiteCountData.map((item) => item.site_name);

  const visitorAnalyticsGraphData = {
    labels: visitorPerSiteCountLabel,
    datasets: [
      {
        label: "Visitors",
        data: visitorPerSiteCount,
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
                data={[]}
                // data={KMC_SITES_OBJECTS}
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
