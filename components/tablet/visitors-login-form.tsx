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
import Image from "next/image";
import Stepper from "./stepper";

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
      <Image src="/kmc-logo.ico" width={30} height={30} alt="Logo" />
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
