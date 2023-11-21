"use client";

import React, { useState } from "react";
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
import { Visitor } from "@/types/visitor";
import { zodResolver } from "@hookform/resolvers/zod";
import { visitorSchema } from "@/schema/visitor";

const STEP_INDEX = {
  "Fill up form": 0,
  "Take a snapshot": 1,
  "Review details": 2,
};

const VisitorsLoginForm = () => {
  const [isTakePhotoTriggered, setIsTakePhotoTriggered] = useState(false);
  const [hasImageTaken, setHasImageTaken] = useState(false);

  const { step, steps, currentStepIndex, next, isLastStep, back } =
    useMultistepForm([
      <FillUpForm key="Fill up form" />,
      <SnapshotForm
        key="Take a snapshot"
        takePhotoTrigger={isTakePhotoTriggered}
        setHasImageTaken={(e) => setHasImageTaken(e)}
      />,
      <ReviewDetails key="Review details" />,
    ]);

  const visitorsForm = useForm<Visitor>({
    resolver: zodResolver(
      visitorSchema.pick({
        fillUpForm:
          currentStepIndex === STEP_INDEX["Fill up form"] ? true : undefined,
        snapShot:
          currentStepIndex === STEP_INDEX["Take a snapshot"] ? true : undefined,
      }),
    ),
  });

  const handleOnCancelOrBack = () => {
    if (currentStepIndex > 0) {
      back();
    } else {
      // void router.push()
    }
  };

  const onFormSubmit = (data: any) => {
    if (!isLastStep) {
      next();
    }
    console.log("submitted", visitorsForm.getValues());
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
            <Button
              type={
                currentStepIndex === 1 && !hasImageTaken ? "button" : "submit"
              }
              className="w-full"
              onClick={() => {
                if (currentStepIndex === 1) {
                  setIsTakePhotoTriggered(true);
                }
              }}
            >
              {currentStepIndex === 1 && !hasImageTaken
                ? "Take photo"
                : isLastStep
                ? "Submit"
                : "Next"}
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
  console.log("stepper", currentStepIndex);

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
                  <div
                    className={cn(
                      isStepCompleted && "border-primary",
                      "relative flex h-6 w-7 items-center justify-center rounded-full border text-xs",
                    )}
                  >
                    {isStepCompleted ? (
                      <Check className="mx-auto h-3 w-3 text-primary" />
                    ) : (
                      <p className="m-auto ">{index + 1}</p>
                    )}
                  </div>

                  <Progress
                    value={isStepCompleted ? 100 : 0}
                    className=" h-1"
                  />
                </CardHeader>
                <CardContent className="mt-2 px-0 py-2 text-sm">
                  <p
                    className={cn(
                      isStepCurrent
                        ? "font-semibold text-primary"
                        : " text-neutral-400",
                      "leading-none",
                    )}
                  >
                    {e.key}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
