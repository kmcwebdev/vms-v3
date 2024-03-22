"use client";

import React from "react";
import Dashboard from "./cms/overview/dashboard/dashboard";
import Analytics from "./cms/overview/analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Reports from "./cms/overview/reports";
import Notifications from "./cms/overview/notifications";
import type { Site } from "@/types/global/site";

interface IAdminProps {
  site: Site[];
}

const Admin = ({ site }: IAdminProps) => {
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
        <Tabs defaultValue={searchParams.get("tab") || "overview"}>
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
          <TabsContent value="reports">
            <Reports site={site} />
          </TabsContent>
          <TabsContent value="notifications">
            <Notifications />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Admin;
