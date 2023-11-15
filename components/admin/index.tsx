"use client";

import React from "react";
import Dashboard from "./cms/overview/dashboard/dashboard";
import Analytics from "./cms/overview/analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  let title;
  const tab = searchParams.get("tab");

  switch (tab) {
    case "overview":
      title = "Overview";
      break;
    case "analytics":
      title = "Analytics";
      break;
    case "reports":
      title = "Reports";
      break;
    case "notifications":
      title = "Notifications";
      break;
    default:
      title = "Default";
      break;
  }

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={searchParams.get("tab") || "dashboard"}>
          <TabsList>
            <TabsTrigger
              value="overview"
              onClick={() =>
                router.push(`${window.location.pathname}?tab=overview`)
              }
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              onClick={() =>
                router.push(`${window.location.pathname}?tab=analytics`)
              }
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              onClick={() =>
                router.push(`${window.location.pathname}?tab=reports`)
              }
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              onClick={() =>
                router.push(`${window.location.pathname}?tab=notifications`)
              }
            >
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Dashboard />
          </TabsContent>
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Admin;
