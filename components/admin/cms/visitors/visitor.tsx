"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const sites = [
  {
    value: "armstrong-corporate-center",
    label: "Armstrong Corporate Center",
  },
  {
    value: "uptown-place-tower-2",
    label: "UpTown Place Tower 2",
  },
  {
    value: "v-corporate-center",
    label: "V Corporate Center",
  },
  {
    value: "frabelle-corporate-plaza",
    label: "Frabelle Corporate Plaza",
  },
  {
    value: "picadilly-inc",
    label: "Picadilly Inc.",
  },
  {
    value: "four-neo",
    label: "Four Neo",
  },
  {
    value: "arthaland-century-pacific-tower",
    label: "Arthaland Century Pacific Tower",
  },
];

const Visitors = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const visitorFiltersForm = useForm();

  const { data: visitorsData, isLoading: visitorsDataIsLoading } =
    useGetVisitors({
      filter: searchParams.get("filter")?.toString(),
    });

  const handleFilterSubmit = (data: VisitorQueryParams) => {
    console.log("submit", visitorFiltersForm.getValues());
    if (data) {
      router.replace(`${window.location.pathname}?filter=${data.filter}`, {
        scroll: false,
      });
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
              name="sites"
              data={sites}
              placeholder="Site"
              onSelect={(e) => router.push(`${pathname}?site=${e}`)}
            />
            <Form.Combobox
              name="status"
              data={[
                {
                  value: "logged-in",
                  label: "Logged in",
                },
                {
                  value: "logged-out",
                  label: "Logged out",
                },
              ]}
              placeholder="Status"
              onSelect={(e) => router.push(`${pathname}?status=${e}`)}
            />
          </Form>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!visitorsDataIsLoading &&
          visitorsData &&
          visitorsData?.map((visitor) => (
            <VisitorCard key={visitor.visitor_id} {...visitor} />
          ))}
      </CardContent>
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
                isabella.nguyen@email.com
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
