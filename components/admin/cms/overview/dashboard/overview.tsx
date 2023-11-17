"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2, Building } from "lucide-react";
import { useGetTotalVisitorOnAllSites } from "@/hooks/useGetTotalVisitorOnAllSites";
import { useGetMostVisitedSite } from "@/hooks/useGetMostVisitedSite";

const Overview = () => {
  const { data: totalVisitor } = useGetTotalVisitorOnAllSites();

  const { data: mostVisitedSite } = useGetMostVisitedSite();

  const overview_data = [
    {
      title: "Total visitors",
      value: totalVisitor ? totalVisitor?.total_visitors : 0,
      description: "Total visitor on all sites",
      icon: <Users2 />,
    },
    {
      title: "Most Visited site",
      value: mostVisitedSite ? mostVisitedSite?.site_name : "No data",
      description: mostVisitedSite ? mostVisitedSite?.count : "No data",
      icon: <Building />,
    },
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-x-4">
      {overview_data.map((e) => (
        <Card key={e.title} className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{e.title}</CardTitle>
            <div className="text-gray-400">{e.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="truncate text-2xl font-bold">{e.value}</div>
            <p className="text-xs text-muted-foreground">{e.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Overview;
