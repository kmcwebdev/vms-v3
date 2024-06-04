"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import GatePassForm from "./forms/gate-pass";
import WorkPermitForm from "./forms/work-permit";
import TempParkingForm from "./forms/temp-parking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Permits = () => {
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
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={searchParams.get("tab") || "default"}>
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
            <GatePassForm />
          </TabsContent>
          <TabsContent value="work-permit">
            <WorkPermitForm />
          </TabsContent>
          <TabsContent value="temp-parking">
            <TempParkingForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
export default Permits;
