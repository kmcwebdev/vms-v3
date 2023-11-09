"use client";

import React, { Suspense } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Dashboard from "./cms/dashboard/dashboard";

const TAB_MENUS = [
  {
    name: "dashboard",
    label: "Dashboard",
    // component: React.lazy(() => import("@/components/admin/Overview")),
  },
  {
    name: "visitors",
    label: "Visitors",
    // component: React.lazy(() => import("@/components/admin/AgGridTable")),
  },
  {
    name: "area-sites",
    label: "Area Sites",
    // component: React.lazy(() => import("@/components/admin/AgGridTable")),
  },
];

const CmsAdmin = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  return (
    <div>
      <Tabs
        defaultValue={activeTab ? activeTab : "dashboard"}
        className="space-y-4"
      >
        <TabsList>
          {TAB_MENUS.map((tab) => (
            <TabsTrigger key={tab.name} value={tab.name}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <Dashboard />
        </TabsContent>
        <TabsContent value="visitors" className="space-y-4">
          <div>Table</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CmsAdmin;
