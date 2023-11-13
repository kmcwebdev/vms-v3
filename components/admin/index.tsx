"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Dashboard from "./cms/dashboard/dashboard";
import MostVisitedSites from "./cms/dashboard/most-visited-sites";

// import Visitors from "./cms/visitors/visitor";

const TAB_MENUS = [
  {
    name: "overview",
    label: "Overview",
    // component: React.lazy(() => import("@/components/admin/Overview")),
  },
  {
    name: "most-visited-sites",
    label: "Most Visited Sites",
    // component: React.lazy(() => import("@/components/admin/AgGridTable")),
  },
];

const Admin = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  return (
    <div>
      <Tabs
        defaultValue={activeTab ? activeTab : "overview"}
        className="space-y-4"
      >
        <TabsList>
          {TAB_MENUS.map((tab) => (
            <TabsTrigger
              key={tab.name}
              value={tab.name}
              onClick={() =>
                router.replace(`${window.location.pathname}?tab=${tab.name}`)
              }
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Dashboard />
        </TabsContent>
        <TabsContent value="most-visited-sites" className="space-y-4">
          <MostVisitedSites />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
