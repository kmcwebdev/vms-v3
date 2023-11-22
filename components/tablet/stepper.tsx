import type { ReactElement } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Progress } from "../ui/progress";

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
                      <p className="m-auto text-neutral-700 ">{index + 1}</p>
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

export default Stepper;
