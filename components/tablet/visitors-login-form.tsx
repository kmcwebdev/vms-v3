"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { useMultistepForm } from "@/hooks/useMultiStepForm";
import FillUpForm from "./steps/fill-up-form";
import SnapshotForm from "./steps/snapshot-form";
import ReviewDetails from "./steps/review-details";
import Form from "../global/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Visitor } from "@/types/visitor";
import { zodResolver } from "@hookform/resolvers/zod";
import { visitorSchema } from "@/schema/visitor";
import Image from "next/image";
import Stepper from "./stepper";
import TimeDateDisplay from "./time-date-display";
import { Separator } from "../ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const STEP_INDEX = {
  "Fill up form": 0,
  "Take a snapshot": 1,
  "Review details": 2,
};

const VisitorsLoginForm = () => {
  const [isTakePhotoTriggered, setIsTakePhotoTriggered] = useState(false);
  const [hasImageTaken, setHasImageTaken] = useState(false);

  const { toast } = useToast();

  const { step, steps, currentStepIndex, next, isLastStep, back, goTo } =
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
    if (isLastStep) {
      console.log("submitted", visitorsForm.getValues());
      toast({
        title: "Success!",
        description: "Your info has been submitted, thank you.",
      });
      visitorsForm.reset();
      goTo(0);
    }
  };

  return (
    <>
      <nav className="mb-6 ">
        <div className="flex items-center justify-between">
          <Image src="/kmc-logo.ico" width={30} height={30} alt="Logo" />
          <TimeDateDisplay />
        </div>
      </nav>

      <div className="mb-3">
        <h1 className="text-sm text-primary">Armstrong Corporate Center</h1>
        <h2 className="text-3xl font-bold leading-none text-[#101622]">
          Visitors Login
        </h2>
      </div>

      <Separator className="mb-6" />

      <Stepper step={steps} currentStepIndex={currentStepIndex} />
      <Form
        name="visitors-form"
        useFormReturn={visitorsForm}
        onSubmit={onFormSubmit}
      >
        <Card className="mt-4 pt-6 shadow-none">
          <CardContent>{step}</CardContent>
          <CardFooter className="mt-4 flex gap-x-2">
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
