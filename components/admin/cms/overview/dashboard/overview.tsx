"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2, Building } from "lucide-react";
import { useGetTotalVisitorOnAllSites } from "@/hooks/useGetTotalVisitorOnAllSites";
import { useGetMostVisitedSite } from "@/hooks/useGetMostVisitedSite";
import { Skeleton } from "@/components/ui/skeleton";

const Overview = () => {
  const { data: totalVisitor, isLoading: isTotalVisitorLoading } =
    useGetTotalVisitorOnAllSites();

  const { data: mostVisitedSite, isLoading: isMostVisitedSiteLoading } =
    useGetMostVisitedSite();

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
      {isTotalVisitorLoading || isMostVisitedSiteLoading ? (
        <>
          <OverviewCardSkeleton />
          <OverviewCardSkeleton />
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Overview;

const OverviewCardSkeleton = () => {
  return (
    <Card className="shadow-none">
      <Skeleton className="h-full w-full bg-transparent">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>
            <div className="h-6 w-32 rounded-lg bg-neutral-100" />
          </CardTitle>
          <div className="h-6 w-6 rounded-lg bg-neutral-100" />
        </CardHeader>
        <CardContent>
          <div className="h-6 w-24 rounded-lg bg-neutral-100" />
          <div className="mt-2 h-3 w-14 rounded-lg bg-neutral-100" />
        </CardContent>
      </Skeleton>
    </Card>
  );
};
