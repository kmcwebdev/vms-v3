"use client";

import React from "react";
import Dashboard from "./cms/overview/dashboard/dashboard";
import Analytics from "./cms/overview/analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Tabs defaultValue={searchParams.get("tab") || "dashboard"}>
      <TabsList>
        <TabsTrigger
          value="dashboard"
          onClick={() =>
            router.push(`${window.location.pathname}?tab=dashboard`)
          }
        >
          Dashboard
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
          onClick={() => router.push(`${window.location.pathname}?tab=reports`)}
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
      <TabsContent value="dashboard">
        <Dashboard />
      </TabsContent>
      <TabsContent value="analytics">
        <Analytics />
      </TabsContent>
    </Tabs>
  );
};

export default Admin;
