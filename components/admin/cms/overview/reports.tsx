import React from "react";
import DataTable from "@/components/global/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import { type IRecentVisitors, visitorData } from "./dashboard/recent-visitors";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Reports = () => {
  const columns: ColumnDef<IRecentVisitors>[] = [
    {
      accessorKey: "timeout",
      header: "Time out",
      cell: ({ row }) => (
        <Badge className="truncate text-xs capitalize">
          {row.getValue("timeout")}
        </Badge>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",

      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "siteVisited",
      header: "Site",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("siteVisited")}</div>
      ),
    },
    {
      accessorKey: "reasonToVisit",
      header: "Reason",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("reasonToVisit")}</div>
      ),
    },
    {
      accessorKey: "companyToVisit",
      header: "Company ",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("companyToVisit")}</div>
      ),
    },
    {
      accessorKey: "personToVisit",
      header: "Person visited ",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("personToVisit")}</div>
      ),
    },
    {
      accessorKey: "dateVisited",
      header: "Date ",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("dateVisited")}</div>
      ),
    },
    {
      accessorKey: "timeVisited",
      header: "Time ",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("timeVisited")}</div>
      ),
    },
  ];

  return (
    <Card className=" shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <h1>Visitor</h1>
          <Button>Export</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={visitorData} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default Reports;
