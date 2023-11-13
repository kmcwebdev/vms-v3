"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export interface IRecentVisitors {
  id: number;
  timeout: string;
  name: string;
  email: string;
  siteVisited: string;
  reasonToVisit: string;
  companyToVisit: string;
  personToVisit: string;
  dateVisited: string;
  timeVisited: string;
  isLoggedOut?: boolean;
}

export const visitorData: IRecentVisitors[] = [
  {
    id: 1,
    timeout: "12:46 PM November 8, 2023",
    name: "Ryan Raichu",
    email: "ryan_raichu@gmail.com",
    siteVisited: "Armstrong Corporate Center",
    reasonToVisit: "Company Visit",
    companyToVisit: "KMC Solutions",
    personToVisit: "Joshuas Migule",
    dateVisited: "November 8, 2023",
    timeVisited: "8:13 AM",
    isLoggedOut: false,
  },
  {
    id: 2,
    timeout: "1:30 PM November 9, 2023",
    name: "Jane Doe",
    email: "janedoe@kmc.solutions",
    siteVisited: "Uptown Place Tower 2",
    reasonToVisit: "Business Meeting",
    companyToVisit: "Doe Inc.",
    personToVisit: "John Doe",
    dateVisited: "November 9, 2023",
    timeVisited: "9:00 AM",
    isLoggedOut: false,
  },
  {
    id: 3,
    timeout: "1:30 PM November 9, 2023",
    name: "John Dont",
    email: "john@yahoo.com",
    siteVisited: "Four/Neo",
    reasonToVisit: "Business Meeting",
    companyToVisit: "Doe Inc.",
    personToVisit: "John Doe",
    dateVisited: "November 9, 2023",
    timeVisited: "9:00 AM",
    isLoggedOut: false,
  },
  {
    id: 4,
    timeout: "1:30 PM November 9, 2023",
    name: "Jomar Pol",
    email: "jomarPoole@rocketmanil.com",
    siteVisited: "Arthaland Century Pacific Tower",
    reasonToVisit: "Business Meeting",
    companyToVisit: "Doe Inc.",
    personToVisit: "John Doe",
    dateVisited: "November 9, 2023",
    timeVisited: "9:00 AM",
    isLoggedOut: false,
  },
  {
    id: 5,
    timeout: "1:30 PM November 9, 2023",
    name: "Jane Doe",
    email: "jane_doe_123@yopmail.com",
    siteVisited: "Doe Corporate Center",
    reasonToVisit: "Business Meeting",
    companyToVisit: "Doe Inc.",
    personToVisit: "John Doe",
    dateVisited: "November 9, 2023",
    timeVisited: "9:00 AM",
    isLoggedOut: true,
  },
];

// export const columns: ColumnDef<IRecentVisitors>[] = [
//   {
//     accessorKey: "timeout",
//     header: "Time out details",
//     cell: ({ row }) => (
//       <Badge className="capitalize">{row.getValue("timeout")}</Badge>
//     ),
//   },
//   {
//     accessorKey: "name",
//     header: "Name",

//     cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "siteVisited",
//     header: "Site",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("siteVisited")}</div>
//     ),
//   },
//   {
//     accessorKey: "reasonToVisit",
//     header: "Reason",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("reasonToVisit")}</div>
//     ),
//   },
//   {
//     accessorKey: "companyToVisit",
//     header: "Company ",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("companyToVisit")}</div>
//     ),
//   },
//   {
//     accessorKey: "personToVisit",
//     header: "Person visited ",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("personToVisit")}</div>
//     ),
//   },
//   {
//     accessorKey: "dateVisited",
//     header: "Date ",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("dateVisited")}</div>
//     ),
//   },
//   {
//     accessorKey: "timeVisited",
//     header: "Time ",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("timeVisited")}</div>
//     ),
//   },
// ];

const RecentVisitors = () => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Recent Visitors</CardTitle>
        <CardDescription>Top five recent visitor</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-8">
        {visitorData.map((visitor) => (
          <VisitorCard key={visitor.id} {...visitor} />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentVisitors;

const VisitorCard = ({
  name,
  dateVisited,
  email,
  siteVisited,
}: IRecentVisitors) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="group flex items-center hover:cursor-pointer">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none  group-hover:underline">
              {name}
            </p>
            <p className="text-sm text-muted-foreground group-hover:underline">
              {email}
            </p>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-700 ">{siteVisited}</p>
      </div>
    </>
  );
};
