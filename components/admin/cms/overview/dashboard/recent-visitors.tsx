"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useGetRecentVisitors } from "@/hooks/visitors/useGetRecentVisitors";
import type { RecentVisitors } from "@/types/global/visitor";
import { Skeleton } from "@/components/ui/skeleton";

const RecentVisitors = () => {
  const { data: recentVisitorsData, isLoading: recentVisitorsDataIsLoading } =
    useGetRecentVisitors();

  console.log(recentVisitorsData);

  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle>Recent Visitors</CardTitle>
        <CardDescription>Top five recent visitor</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-8">
        {recentVisitorsData ? (
          recentVisitorsData.map((visitor) => (
            <VisitorCard key={visitor.visitor_id} {...visitor} />
          ))
        ) : (
          <>
            <VisitorCardSkeletonLoader />
            <VisitorCardSkeletonLoader />
            <VisitorCardSkeletonLoader />
            <VisitorCardSkeletonLoader />
            <VisitorCardSkeletonLoader />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentVisitors;

const VisitorCard = ({
  first_name,
  last_name,
  site_name,
  image_url,
  visitor_id,
  created_at,
}: RecentVisitors) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="group flex items-center hover:cursor-pointer">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none group-hover:underline">
              {`${first_name} ${last_name}`}
            </p>
            <p className="text-sm text-muted-foreground group-hover:underline">
              {site_name}
            </p>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-700 ">{created_at}</p>
      </div>
    </>
  );
};

const VisitorCardSkeletonLoader = () => {
  return (
    <Skeleton className="bg-neutral-100">
      <div className="h-10 w-8 rounded-full " />
    </Skeleton>
  );
};
