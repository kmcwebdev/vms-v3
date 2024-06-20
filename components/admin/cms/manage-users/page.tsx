"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Visitor } from "@/types/visitor";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import GatePassSubmissions from "./submissions/gate-pass/gate-pass";
import WorkPermitSubmissions from "./submissions/work-permit/work-permit";
import TempParkingSubmissions from "./submissions/temp-parking/temp-parking";

const ManageUsers = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  let title;
  const tab = searchParams.get("tab");

  switch (tab) {
    case "Gate Pass":
      title = "Gate Pass";
      break;
    case "Work Permit":
      title = "Work Permit";
      break;
    case "Temp Parking":
      title = "Temp Parking";
      break;
    default:
      title = "KMC Permits";
      break;
  }

  return (
    <>
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Permit Application Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={searchParams.get("tab") || "gate-pass"}>
            <TabsList>
              <TabsTrigger
                value="gate-pass"
                onClick={() =>
                  router.push(`${window.location.pathname}?tab=gate-pass`)
                }
              >
                Gate Pass
              </TabsTrigger>
              <TabsTrigger
                value="work-permit"
                onClick={() =>
                  router.push(`${window.location.pathname}?tab=work-permit`)
                }
              >
                Work Permit
              </TabsTrigger>
              <TabsTrigger
                value="temp-parking"
                onClick={() =>
                  router.push(`${window.location.pathname}?tab=temp-parking`)
                }
              >
                Temp Parking
              </TabsTrigger>
            </TabsList>
            <TabsContent value="gate-pass">
              <Suspense fallback="Loading...">
                <GatePassSubmissions />
              </Suspense>
            </TabsContent>
            <TabsContent value="work-permit">
              <Suspense fallback="Loading...">
                <WorkPermitSubmissions />
              </Suspense>
            </TabsContent>
            <TabsContent value="temp-parking">
              <Suspense fallback="Loading...">
                <TempParkingSubmissions />
              </Suspense>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageUsers;
