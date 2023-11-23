import React, { useState } from "react";
import DataTable from "@/components/global/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import { type IRecentVisitors, visitorData } from "./dashboard/recent-visitors";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/global/date-range-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import type { Site } from "@/types/site";
import { useGetAllSites } from "@/hooks/sites/useGetAllSites";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface IReportProps {
  site: Site[];
}

const Reports = ({ site }: IReportProps) => {
  const [enable, setEnable] = useState(false);

  const exportForm = useForm();

  const downloadCSV = async () => {
    try {
      const response = await axios.get("/api/visitors/export-csv", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];

      console.log(contentDisposition);

      link.setAttribute("download", contentDisposition);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const searchParams = useSearchParams();

  const { data: allSites, isLoading: isAllSitesLoading } = useGetAllSites(
    {
      filter: searchParams.get("filter")?.toString(),
    },
    site,
  );

  const allSiteData =
    !isAllSitesLoading && allSites
      ? allSites.map((e) => ({
          value: e.site_id,
          label: e.site_name,
        }))
      : [];

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
        <div className="w-fit truncate  capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "siteVisited",
      header: "Site",
      cell: ({ row }) => (
        <div className="w-fit truncate capitalize ">
          {row.getValue("siteVisited")}
        </div>
      ),
    },
    {
      accessorKey: "reasonToVisit",
      header: "Reason",
      cell: ({ row }) => (
        <div className="w-fit truncate  capitalize">
          {row.getValue("reasonToVisit")}
        </div>
      ),
    },
    {
      accessorKey: "companyToVisit",
      header: "Company ",
      cell: ({ row }) => (
        <div className="w-fit truncate  capitalize">
          {row.getValue("companyToVisit")}
        </div>
      ),
    },
    {
      accessorKey: "personToVisit",
      header: "Person visited ",
      cell: ({ row }) => (
        <div className="w-fit truncate  capitalize">
          {row.getValue("personToVisit")}
        </div>
      ),
    },
    {
      accessorKey: "dateVisited",
      header: "Date ",
      cell: ({ row }) => (
        <div className="w-fit truncate  capitalize">
          {row.getValue("dateVisited")}
        </div>
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
        <CardTitle className="flex w-full justify-end gap-x-2">
          <Form
            name="site"
            useFormReturn={exportForm}
            onSubmit={() => console.log("submitted export")}
          >
            <Form.Combobox
              name="site"
              data={allSiteData}
              placeholder="Select site"
            />
          </Form>
          <DateRangePicker />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Export</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Export visitors data</DialogTitle>
                <DialogDescription>
                  Are you sure you want to export all visitors data?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="secondary">Cancel</Button>
                <Button onClick={downloadCSV}>Export</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={visitorData} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default Reports;
