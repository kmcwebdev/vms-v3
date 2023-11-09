"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/global/DataTable";
const recentVisitors = [
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

const tableHeaders = [
  "Time out details",
  "Name",
  "Site visited",
  "Date",
  "Time",
  "Company",
  "Reason to visit",
  "Person visited",
];

const RecentVisitors = () => {
  return (
    <Card className="w-2/5 shadow-sm">
      <CardHeader>
        <CardTitle>Recent Visitors</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable />
      </CardContent>
    </Card>
  );
};

export default RecentVisitors;
