"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/global/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

interface IRecentVisitors {
  id: number;
  timeout: string;
  name: string;
  siteVisited: string;
  reasonToVisit: string;
  companyToVisit: string;
  personToVisit: string;
  dateVisited: string;
  timeVisited: string;
}

const data: IRecentVisitors[] = [
  {
    id: 1,
    timeout: "12:46 PM November 8, 2023",
    name: "Ryan Raichu",
    siteVisited: "Armstrong Corporate Center",
    reasonToVisit: "Company Visit",
    companyToVisit: "KMC Solutions",
    personToVisit: "Joshuas Migule",
    dateVisited: "November 8, 2023",
    timeVisited: "8:13 AM",
  },
  {
    id: 2,
    timeout: "1:30 PM November 9, 2023",
    name: "Jane Doe",
    siteVisited: "Doe Corporate Center",
    reasonToVisit: "Business Meeting",
    companyToVisit: "Doe Inc.",
    personToVisit: "John Doe",
    dateVisited: "November 9, 2023",
    timeVisited: "9:00 AM",
  },
  {
    id: 3,
    timeout: "1:30 PM November 9, 2023",
    name: "Jane Doe",
    siteVisited: "Doe Corporate Center",
    reasonToVisit: "Business Meeting",
    companyToVisit: "Doe Inc.",
    personToVisit: "John Doe",
    dateVisited: "November 9, 2023",
    timeVisited: "9:00 AM",
  },
  {
    id: 4,
    timeout: "1:30 PM November 9, 2023",
    name: "Jane Doe",
    siteVisited: "Doe Corporate Center",
    reasonToVisit: "Business Meeting",
    companyToVisit: "Doe Inc.",
    personToVisit: "John Doe",
    dateVisited: "November 9, 2023",
    timeVisited: "9:00 AM",
  },
  {
    id: 5,
    timeout: "1:30 PM November 9, 2023",
    name: "Jane Doe",
    siteVisited: "Doe Corporate Center",
    reasonToVisit: "Business Meeting",
    companyToVisit: "Doe Inc.",
    personToVisit: "John Doe",
    dateVisited: "November 9, 2023",
    timeVisited: "9:00 AM",
  },
  {
    id: 6,
    timeout: "1:30 PM November 9, 2023",
    name: "Jane Doe",
    siteVisited: "Doe Corporate Center",
    reasonToVisit: "Business Meeting",
    companyToVisit: "Doe Inc.",
    personToVisit: "John Doe",
    dateVisited: "November 9, 2023",
    timeVisited: "9:00 AM",
  },
];

export const columns: ColumnDef<IRecentVisitors>[] = [
  {
    accessorKey: "timeout",
    header: "Time out details",
    cell: ({ row }) => (
      <Badge className="capitalize">{row.getValue("timeout")}</Badge>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Email
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
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

const RecentVisitors = () => {
  return (
    <Card className="w-full shadow-sm">
      {/* <CardHeader>
        <CardTitle>Recent Visitors</CardTitle>
      </CardHeader> */}
      <CardContent>
        <DataTable data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default RecentVisitors;
