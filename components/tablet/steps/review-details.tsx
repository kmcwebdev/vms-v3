import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Visitor } from "@/types/visitor";

const ReviewDetails = () => {
  const { formState, getValues } = useFormContext<Visitor>();

  const { fillUpForm, snapShot } = getValues();

  return (
    <Card className="border-none  shadow-none">
      <CardHeader className="p-0">
        <div className="relative h-72 w-full rounded-md">
          <Image
            src={snapShot.image}
            alt="Visitor image"
            fill
            className="rounded-md"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <li>
            <label className="text-xs text-neutral-500">First name</label>
            <p>{fillUpForm.firstName}</p>
          </li>
          <li>
            <label className="text-xs text-neutral-500">Last name</label>
            <p>{fillUpForm.lastName}</p>
          </li>
          <li>
            <label className="text-xs text-neutral-500">Email address</label>
            <p>{fillUpForm.email}</p>
          </li>
          <li>
            <label className="text-xs text-neutral-500">Company to visit</label>
            <p>{fillUpForm.companyToVisit}</p>
          </li>
          <li>
            <label className="text-xs text-neutral-500">Person to visit</label>
            <p>{fillUpForm.personToVisit}</p>
          </li>
          <li>
            <label className="text-xs text-neutral-500">Reason to visit</label>
            <p>{fillUpForm.reasonToVisit}</p>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ReviewDetails;
