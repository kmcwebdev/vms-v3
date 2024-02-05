import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "@/components/global/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useGetVisitors } from "@/hooks/visitors/useGetVisitors";
import type { Visitor } from "@/types/global/visitor";
import { formatDate } from "@/lib/utils";

const Visitors = () => {
  const { data: visitorsData, isLoading: visitorsDataIsLoading } =
    useGetVisitors({
      pageNumber: 1,
      pageSize: 10,
    });

  console.log(visitorsData);

  const columnHelper = createColumnHelper<Visitor>();

  const visitorColumns = [
    columnHelper.accessor("created_at", {
      header: "Time ",
      cell: (value) => (
        <Badge className=" font-normal">{formatDate(value.getValue())}</Badge>
      ),
    }),
    columnHelper.accessor("first_name", {
      header: "First name",
      cell: (value) => <p>{value.getValue()}</p>,
    }),
    columnHelper.accessor("last_name", {
      header: "Last name",
      cell: (value) => <p>{value.getValue()}</p>,
    }),
    columnHelper.accessor("reason_name", {
      header: "Reason of visit",
      cell: (value) => <p>{value.getValue()}</p>,
    }),

    columnHelper.display({
      id: "action",
      cell: () => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div
              className={cn(
                "w-fit rounded-full bg-gray-100 p-2 text-sm font-medium shadow-sm transition ease-in-out hover:cursor-pointer hover:bg-primary hover:text-white ",
              )}
            >
              <LogOut size={12} />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log-out this visitor?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <ul>
                  <li>Name: John Doe</li>
                  <li>Site: Armstrong corporate center</li>
                  <li>Reason of visit: Meeting</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    }),
  ];

  return (
    <Card className="mt-3 pt-6 shadow-none">
      <CardContent>
        {!visitorsDataIsLoading && visitorsData && visitorsData?.data ? (
          <DataTable
            data={visitorsData?.data}
            columns={visitorColumns}
            hasSearch
          />
        ) : (
          <p>Test</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Visitors;
