"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { Check } from "lucide-react";
import { useMultistepForm } from "@/hooks/useMultiStepForm";

interface ISteps {
  id: number;
  label: string;
  field: string;
}
const Steps: ISteps[] = [
  {
    id: 1,
    label: "STEP 1",
    field: "Fill up form",
  },
  {
    id: 2,
    label: "STEP 2",
    field: "Take a snapshot",
  },
  {
    id: 1,
    label: "STEP 3",
    field: "Review details",
  },
];

const VisitorsLoginForm = () => {
  const {} = useMultistepForm;

  return (
    <Card className="px-4 py-4 pt-0 shadow-none">
      <CardContent className="p-0">
        <div className="mt-4 flex w-full justify-evenly">
          {Steps.map((e) => (
            <Card key={e.id} className="w-full border-none p-2 shadow-none">
              <CardHeader className="flex flex-row items-center gap-x-3 p-0">
                <div className="relative flex h-6 w-7 items-center justify-center rounded-full border text-xs">
                  {/* <p className="m-auto">1</p> */}
                  <Check className="mx-auto h-3 w-3" />
                </div>

                <Progress value={100} className=" h-1" />
              </CardHeader>
              <CardContent className="mt-2 px-0 py-2 text-sm">
                <p className="leading-none">{e.field}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorsLoginForm;
