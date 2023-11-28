"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
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
import type { Visitor } from "@/types/global/visitor";
import { useGetVisitors } from "@/hooks/visitors/useGetVisitors";
import { formatDate } from "@/lib/utils";
import type { VisitorQueryParams } from "@/hooks/visitors/useGetVisitors";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGetAllSites } from "@/hooks/sites/useGetAllSites";
import { createSearchParams } from "@/lib/utils";

const Visitors = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const visitorFiltersForm = useForm();

  const { data: visitors, isLoading: visitorsDataIsLoading } = useGetVisitors({
    pageNumber:
      parseInt(
        (searchParams.has("pageNumber") &&
          searchParams.get("pageNumber")?.toString()) ||
          "1",
      ) || 1,
    pageSize: 10,
    filter: searchParams.get("filter")?.toString(),
    site: searchParams.get("site")?.toString() || "",
  });

  const { data: allSites, isLoading: allSitesIsLoading } = useGetAllSites(
    {
      filter: undefined,
    },
    [],
  );

  const sitesList =
    !allSitesIsLoading && allSites
      ? allSites.map((item) => ({
          label: item.site_name,
          value: item.site_id,
        }))
      : [];

  const handleFilterSubmit = (data: VisitorQueryParams) => {
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

  const handleNextPage = () => {
    const currentPageNumber = searchParams.has("pageNumber")
      ? parseInt(searchParams.get("pageNumber") as string)
      : 1;
    const nextPageNumber = currentPageNumber + 1;

    const totalPages = visitors?.totalPages;

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

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="flex w-full justify-between text-xl font-bold">
          Visitors list
          <Form
            name="visitor-filters"
            useFormReturn={visitorFiltersForm}
            onSubmit={handleFilterSubmit}
            className="flex gap-x-2"
          >
            <Form.Input
              name="filter"
              type="text"
              placeholder="Search visitor"
            />
            <Form.Combobox
              name="site"
              data={sitesList}
              placeholder="Site"
              onSelect={(e: string) => {
                const newSearchParams = createSearchParams({
                  site: e,
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
              }}
            />
          </Form>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!visitorsDataIsLoading &&
          visitors?.data &&
          visitors?.data?.map((visitor) => (
            <VisitorCard key={visitor.visitor_id} {...visitor} />
          ))}
      </CardContent>
      <CardFooter className="flex justify-between ">
        <p className="text-xs text-neutral-500">
          Page {searchParams.get("pageNumber")?.toString() || "1"} of{" "}
          {visitors?.totalPages.toString()}
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

const VisitorCard = ({
  created_at,
  first_name,
  image_url,
  last_name,
  site_name,
  visitor_id,
  email,
}: Visitor) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <Badge
          className={cn("w-fit")}
          // variant={isLoggedOut ? "secondary" : "default"}
        >
          {/* {isLoggedOut ? "Logged out" : `${dateVisited} ${timeVisited}`} */}
          {formatDate(created_at)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="group flex items-center hover:cursor-pointer">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/03.png" alt="Avatar" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none group-hover:underline">
                {`${first_name} ${last_name}`}
              </p>
              <p className="text-sm text-muted-foreground group-hover:underline">
                {email}
              </p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div
                className={cn(
                  // isLoggedOut
                  //   ? "opacity-40 hover:cursor-not-allowed"
                  //   : "hover:cursor-pointer hover:bg-primary hover:text-white",
                  "text-sm font-medium",
                  "w-fit rounded-full bg-gray-100 p-2 shadow-sm transition ease-in-out ",
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
        </div>
      </CardContent>
    </Card>
  );
};
