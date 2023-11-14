import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

const SiteDetails = () => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="h-64 w-full rounded-md bg-gray-100" />
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default SiteDetails;
