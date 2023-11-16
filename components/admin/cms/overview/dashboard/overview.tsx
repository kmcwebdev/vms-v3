"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2, Building } from "lucide-react";

const DUMMY_OVERVIEW = [
  {
    title: "Total visitors",
    value: "1,405",
    description: "Total visitor on all sites",
    icon: <Users2 />,
  },
  {
    title: "Most Visited site",
    value: "Armstrong Corporate Center",
    description: "117 visits",
    icon: <Building />,
  },
];

const Overview = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-x-4">
      {DUMMY_OVERVIEW.map((e) => (
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
