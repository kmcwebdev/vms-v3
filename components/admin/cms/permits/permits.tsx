"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import GatePassForm from "./forms/gate-pass";
import WorkPermitForm from "./forms/work-permit";
import TempParkingForm from "./forms/temp-parking";

const Permits = () => {
  const [activeForm, setActiveForm] = useState("");

  const renderForm = () => {
    switch (activeForm) {
      case "Gate Pass":
        return <GatePassForm />;
      case "Work Permit":
        return <WorkPermitForm />;
      case "Temp Parking":
        return <TempParkingForm />;
      default:
        return null;
    }
  };
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="flex w-full justify-between text-xl font-bold">
          KMC Permits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="group flex items-center hover:cursor-pointer">
            <div className="ml-4 space-y-1">
              <div className="flex justify-center gap-10">
                <button
                  className="rounded-3xl bg-yellow-500 p-6 text-sm font-bold text-white hover:bg-orange-400"
                  onClick={() => setActiveForm("Gate Pass")}
                >
                  Gate Pass
                </button>
                <button
                  className="rounded-3xl bg-yellow-500 p-6 text-sm font-bold text-white hover:bg-orange-400"
                  onClick={() => setActiveForm("Work Permit")}
                >
                  Work Permit
                </button>
                <button
                  className="rounded-3xl bg-yellow-500 p-6 text-sm font-bold text-white hover:bg-orange-400"
                  onClick={() => setActiveForm("Temp Parking")}
                >
                  Temp Parking
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">{renderForm()}</div>
      </CardContent>
    </Card>
  );
};
export default Permits;
