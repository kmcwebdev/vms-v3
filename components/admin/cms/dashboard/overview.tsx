"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User2, Building } from "lucide-react";

const DUMMY_OVERVIEW = [
  {
    title: "Total Visitors",
    value: "1,405",
    description: "Total visitor on all sites",
    icon: <User2 className="w-4 h-4" />,
  },
  {
    title: "Most Visited site",
    value: "Armstrong Corporate Center",
    description: "117 visits",
    icon: <Building className="w-4 h-4" />,
  },
];

const Overview = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-x-4">
      {DUMMY_OVERVIEW.map((e) => (
        <Card key={e.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{e.title}</CardTitle>
            <div className="text-gray-400">{e.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{e.value}</div>
            <p className="text-xs text-muted-foreground">{e.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Overview;
