import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import DataTable from "@/components/global/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Download, LogOut } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { createSearchParams } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import DateRangePicker from "@/components/global/date-range-picker";
import axios from "axios";
import type { VisitorQueryParams } from "@/types/visitor";

const Visitors = ({ siteId }: { siteId: string }) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const searchClients = useForm();

  const dateSelected = searchClients.watch("date");

  const downloadCSV = async () => {
    try {
      const response = await axios.get("/api/visitors/export-csv", {
        responseType: "blob",
        params: {
          site_id: siteId,
          from: dateSelected.from,
          to: dateSelected.to,
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];

      link.setAttribute("download", contentDisposition);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const {
    data: visitorsData,
    isLoading: visitorsDataIsLoading,
    isFetching: visitorsDataIsFetching,
  } = useGetVisitors({
    site: siteId,
    pageNumber:
      parseInt(
        (searchParams.has("pageNumber") &&
          searchParams.get("pageNumber")?.toString()) ||
          "1",
      ) || 1,
    pageSize: 10,
    filter: searchParams.get("filter")?.toString(),
  });

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

  const handleNextPage = () => {
    const currentPageNumber = searchParams.has("pageNumber")
      ? parseInt(searchParams.get("pageNumber") as string)
      : 1;
    const nextPageNumber = currentPageNumber + 1;

    const totalPages = visitorsData?.totalPage;

    const newSearchParams = createSearchParams({
      pageNumber: nextPageNumber,
      filter: searchParams.get("filter")?.toString(),
    });

    if (newSearchParams) {
      if (currentPageNumber !== totalPages) {
        router.replace(
          `${window.location.pathname}?${newSearchParams.toString()}`,
          {
            scroll: false,
          },
        );
      }
    }
  };

  const handlePreviousPage = () => {
    const currentPageNumber = searchParams.has("pageNumber")
      ? parseInt(searchParams.get("pageNumber") as string)
      : 1;
    const previousPageNumber =
      currentPageNumber > 1 ? currentPageNumber - 1 : 1;

    const newSearchParams = createSearchParams({
      pageNumber: previousPageNumber,
      filter: searchParams.get("filter")?.toString(),
    });

    if (newSearchParams) {
      router.replace(
        `${window.location.pathname}?${newSearchParams.toString()}`,
        {
          scroll: false,
        },
      );
    }
  };

  const onSearchVisitorHandler = (data: VisitorQueryParams) => {
    const newSearchParams = createSearchParams({
      filter: data.filter,
      pageNumber: searchParams.get("pageNumber")?.toString(),
      site: data.site,
    });

    if (newSearchParams) {
      router.replace(
        `${window.location.pathname}?${newSearchParams.toString()}`,
        {
          scroll: false,
        },
      );
    }
  };

  const onDownloadVisitorsHandler = async () => {
    downloadCSV();
  };

  return (
    <Card className="mt-3 pt-6 shadow-none">
      <CardHeader className="py-0">
        <Form
          name="search-client"
          useFormReturn={searchClients}
          onSubmit={onSearchVisitorHandler}
          className="mb-8 flex justify-between"
        >
          <Form.Input
            name="filter"
            placeholder="Search visitor"
            type="text"
            className="w-1/4"
          />
          <div className="inline-flex gap-x-2">
            <DateRangePicker name="date" />
            <Button
              type="button"
              variant="secondary"
              className="space-x-2 text-emerald-600 hover:text-emerald-800"
              onClick={onDownloadVisitorsHandler}
            >
              <p>Export</p>
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        </Form>
      </CardHeader>
      <CardContent>
        {!visitorsDataIsLoading &&
        !visitorsDataIsFetching &&
        visitorsData &&
        visitorsData?.data ? (
          <DataTable data={visitorsData?.data} columns={visitorColumns} />
        ) : (
          <p>Test</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between ">
        <p className="text-xs text-neutral-500">
          Page {searchParams.get("pageNumber")?.toString() || "1"} of{" "}
          {visitorsData?.totalPage.toString()}
        </p>
        <div className="space-x-2">
          <Button variant="outline" onClick={handlePreviousPage}>
            Back
          </Button>
          <Button variant="outline" onClick={handleNextPage}>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Visitors;
