import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const MostVisitedSites = () => {
  return (
    <Card className="w-3/5">
      <CardHeader>
        <CardTitle>Most visited sites</CardTitle>
      </CardHeader>
      <CardContent>{/* <DataTable /> */}</CardContent>
    </Card>
  );
};

export default MostVisitedSites;
