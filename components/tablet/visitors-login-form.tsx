"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Progress } from "../ui/progress";
import { Check } from "lucide-react";
import { useMultistepForm } from "@/hooks/useMultiStepForm";
import FillUpForm from "./steps/fill-up-form";
import SnapshotForm from "./steps/snapshot-form";
import ReviewDetails from "./steps/review-details";
import type { ReactElement } from "react";
import { cn } from "@/lib/utils";
import Form from "../global/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

const VisitorsLoginForm = () => {
  const { step, steps, currentStepIndex, next, isLastStep, back } =
    useMultistepForm([
      <FillUpForm key="Fill up form" />,
      <SnapshotForm key="Take a snapshot" />,
      <ReviewDetails key="Review details" />,
    ]);

  const visitorsForm = useForm();

  const handleOnCancelOrBack = () => {
    if (currentStepIndex > 0) {
      back();
    } else {
      // void router.push('/sales/clients')
    }
  };

  const onFormSubmit = (data: any) => {
    if (!isLastStep) {
      next();
    }
    console.log("submitted", data);
  };

  return (
    <>
      <Stepper step={steps} currentStepIndex={currentStepIndex} />
      <Form
        name="visitors-form"
        useFormReturn={visitorsForm}
        onSubmit={onFormSubmit}
      >
        <Card className="mt-4 pt-6 shadow-none">
          <CardContent>{step}</CardContent>
          <CardFooter className="flex gap-x-2">
            <Button
              type="button"
              className="w-full shadow-none"
              variant="outline"
              onClick={handleOnCancelOrBack}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full">
              Next
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
};

export default VisitorsLoginForm;

interface IStepperProps {
  step: ReactElement[];
  currentStepIndex: number;
}

const Stepper = ({ step, currentStepIndex }: IStepperProps) => {
  console.log(currentStepIndex);

  return (
    <Card className="px-4 py-4 pt-0 shadow-none">
      <CardContent className="p-0">
        <div className="mt-4 flex w-full justify-evenly">
          {step.map((e, index) => {
            const isStepCurrent = currentStepIndex === index;
            const isStepCompleted = currentStepIndex > index;

            return (
              <Card key={e.key} className="w-full border-none p-2 shadow-none">
                <CardHeader className="flex flex-row items-center gap-x-3 p-0">
                  <div className="relative flex h-6 w-7 items-center justify-center rounded-full border text-xs">
                    {/* <p className="m-auto">1</p> */}
                    <Check className="mx-auto h-3 w-3" />
                  </div>

                  <Progress value={100} className=" h-1" />
                </CardHeader>
                <CardContent className="mt-2 px-0 py-2 text-sm">
                  <p className="leading-none">{e.key}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
