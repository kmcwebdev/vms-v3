import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

const ReviewDetails = () => {
  const { formState, getValues } = useFormContext();

  const { email } = getValues();

  console.log("review", getValues());

  return (
    <Card className="shadow-none">
      <CardHeader></CardHeader>
      <CardContent>
        <ul>
          <li></li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ReviewDetails;
