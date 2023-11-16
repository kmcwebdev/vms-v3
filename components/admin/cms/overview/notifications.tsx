import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User2, Clock } from "lucide-react";

const Notifications = () => {
  return (
    <Card className="mt-4 shadow-none">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <RecentActivityCard />
        <RecentActivityCard />
        <RecentActivityCard />
      </CardContent>
    </Card>
  );
};

export default Notifications;

const RecentActivityCard = () => {
  return (
    <Card className="border-none bg-gray-50 pt-4 shadow-none">
      <CardContent className="flex justify-between px-4 pb-4 text-sm text-gray-500">
        <div className="inline-flex items-center space-x-1">
          <User2 className="h-4 w-4 text-gray-500" />
          <h1 className="text-gray-900">Armstrong Corporate Center</h1>
          <p>has a new visitor</p>
        </div>
        <div className="inline-flex items-center space-x-2">
          <p className="">Nov. 16, 2023 • 10:19 PM</p>
        </div>
      </CardContent>
    </Card>
  );
};
