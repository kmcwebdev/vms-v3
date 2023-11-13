import React from "react";
import Admin from "@/components/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Admin />
      </CardContent>
    </Card>
  );
};

export default page;
