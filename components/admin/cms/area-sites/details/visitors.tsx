import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "@/components/global/data-table";
import {
  visitorData,
  type IRecentVisitors,
} from "../../overview/dashboard/recent-visitors";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const Visitors = () => {
  const columnHelper = createColumnHelper<IRecentVisitors>();

  const visitorColumns = [
    columnHelper.accessor("timeout", {
      header: "Time ",
      cell: (value) => (
        <Badge className="font-normal">{value.getValue()}</Badge>
      ),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (value) => <p>{value.getValue()}</p>,
    }),
    columnHelper.accessor("siteVisited", {
      header: "Site",
      cell: (value) => <p>{value.getValue()}</p>,
    }),
    columnHelper.accessor("companyToVisit", {
      header: "Company visited",
      cell: (value) => <p>{value.getValue()}</p>,
    }),
    columnHelper.accessor("reasonToVisit", {
      header: "Reason visited",
      cell: (value) => <p>{value.getValue()}</p>,
    }),
    columnHelper.display({
      id: "action",
      cell: () => (
        <div
          className={cn(
            // isLoggedOut
            //   ? "opacity-40 hover:cursor-not-allowed"
            //   : "hover:cursor-pointer hover:bg-primary hover:text-white",
            "w-fit rounded-full bg-gray-100 p-2 text-sm font-medium shadow-sm transition ease-in-out hover:cursor-pointer hover:bg-primary hover:text-white ",
          )}
        >
          <LogOut size={12} />
        </div>
      ),
    }),
  ];

  return (
    <Card className="mt-3 pt-6 shadow-none">
      <CardContent>
        <DataTable data={visitorData} columns={visitorColumns} hasSearch />
      </CardContent>
    </Card>
  );
};

export default Visitors;
