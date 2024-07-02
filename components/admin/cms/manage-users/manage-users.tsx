"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/clerk-react";
import GatePassSubmissions from "./submissions/gate-pass/gate-pass";
import WorkPermitSubmissions from "./submissions/work-permit/work-permit";
import TempParkingSubmissions from "./submissions/temp-parking/temp-parking";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

export default function ManageUsers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded) {
      const userRole = user?.publicMetadata?.role;
      if (userRole !== "admin") {
        router.push("/");
      }
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (user?.publicMetadata?.role !== "admin") {
    return null; 
  }

  const tab = searchParams.get("tab") || "gate-pass";

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Permit Application Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={tab}>
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
            <GatePassSubmissions />
          </TabsContent>
          <TabsContent value="work-permit">
            <WorkPermitSubmissions />
          </TabsContent>
          <TabsContent value="temp-parking">
            <TempParkingSubmissions />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

