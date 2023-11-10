"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  visitorData,
  type IRecentVisitors,
} from "../dashboard/recent-visitors";
import { cn } from "@/lib/utils";
import { LogOut, User2 } from "lucide-react";

const Visitors = () => {
  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle className="flex w-full justify-between text-2xl">
          Visitors list
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select site" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">
                  Armstrong Corporate Center
                </SelectItem>
                <SelectItem value="banana">Picadilly Inc.</SelectItem>
                <SelectItem value="blueberry">Uptown Place Tower 2</SelectItem>
                <SelectItem value="grapes">Four/Neo</SelectItem>
                <SelectItem value="pineapple">SM Aura</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {visitorData.map((visitor) => (
          <VisitorCard key={visitor.id} {...visitor} />
        ))}
      </CardContent>
    </Card>
  );
};

export default Visitors;

const VisitorCard = ({
  id,
  timeout,
  name,
  siteVisited,
  reasonToVisit,
  companyToVisit,
  personToVisit,
  dateVisited,
  timeVisited,
  isLoggedOut,
}: IRecentVisitors) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <Badge
          className={cn("w-fit")}
          variant={isLoggedOut ? "secondary" : "default"}
        >
          {isLoggedOut ? "Logged out" : `${dateVisited} ${timeVisited}`}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="group flex items-center hover:cursor-pointer">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/03.png" alt="Avatar" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none  group-hover:underline">
                {name}
              </p>
              <p className="text-sm text-muted-foreground group-hover:underline">
                isabella.nguyen@email.com
              </p>
            </div>
          </div>
          <div className="w-fit rounded-full bg-gray-100 p-2 shadow-sm transition ease-in-out hover:cursor-pointer hover:bg-primary hover:text-white">
            <LogOut size={12} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
