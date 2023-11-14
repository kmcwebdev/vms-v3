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

const SiteDetails = () => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="mb-2 flex items-center justify-between">
          <p>Armstrong Corporate Center</p>
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
        <div className="flex ">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="visitors">Visitors</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p>faf</p>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteDetails;
