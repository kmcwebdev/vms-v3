"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TabsContent } from "@radix-ui/react-tabs";
import Clients from "./clients";
import Visitors from "./visitors";
import { Building2, User2 } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface ISiteDetailsProps {
  siteId: string;
}

const SiteDetails = ({ siteId }: ISiteDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log(siteId);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="mb-2 flex items-center justify-between">
          <p className="font-medium">Armstrong Corporate Center</p>
          <TooltipProvider>
            <Tooltip>
              <Badge
                variant="secondary"
                className=" w-1/2 space-x-2 py-2 text-sm font-normal text-gray-700"
              >
                <TooltipTrigger asChild>
                  <Copy className="h-5 w-5 cursor-pointer text-primary " />
                </TooltipTrigger>
                <p className="truncate">
                  https://visitor-management.kmc.solutions/tablet?tabletConfigId=cld9xhppq0001pevzvegwc8ou
                </p>
              </Badge>
              <TooltipContent>
                <p>Copy tablet link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <div className=" h-96 w-full rounded-md bg-gray-100" />
      </CardHeader>
      <CardContent>
        <div>
          <ClientAndVisitorCount />

          <Tabs defaultValue={searchParams.get("tab") || "clients"}>
            <TabsList>
              <TabsTrigger
                value="clients"
                onClick={() =>
                  router.push(`${window.location.pathname}?tab=client`, {
                    scroll: false,
                  })
                }
              >
                Clients
              </TabsTrigger>
              <TabsTrigger
                value="visitors"
                onClick={() =>
                  router.push(`${window.location.pathname}?tab=visitors`, {
                    scroll: false,
                  })
                }
              >
                Visitors
              </TabsTrigger>
            </TabsList>

            <TabsContent value="clients">
              <Clients />
            </TabsContent>
            <TabsContent value="visitors">
              <Visitors />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteDetails;

const ClientAndVisitorCount = () => {
  return (
    <div className="float-right">
      <TooltipProvider>
        <ul className="flex gap-x-3 text-sm font-medium">
          <Tooltip>
            <TooltipTrigger asChild>
              <li className="inline-flex items-start gap-x-1 hover:cursor-pointer">
                <Building2 className="h-4 w-4 text-gray-500" />
                <p>5</p>
              </li>
            </TooltipTrigger>
            <TooltipContent className="border bg-white text-neutral-800">
              <h1>Total clients on this site</h1>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <li className="inline-flex items-start gap-x-1 hover:cursor-pointer">
                <User2 className="h-4 w-4 text-gray-500 " />
                <p>47</p>
              </li>
            </TooltipTrigger>
            <TooltipContent className="border bg-white text-neutral-800">
              <h1>Total visitors of this site</h1>
            </TooltipContent>
          </Tooltip>
        </ul>
      </TooltipProvider>
    </div>
  );
};
