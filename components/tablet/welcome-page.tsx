"use client";

import React from "react";
import Lottie from "lottie-react";
import animation from "../../public/lottie-animation.json";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import kmc from "../../public/kmc-logo-black.png";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@radix-ui/react-select";

const WelcomePage = () => {
  return (
    <Card className="flex h-full flex-col justify-between shadow-none">
      <CardHeader>
        <div className="flex justify-between">
          <Image
            src={kmc}
            width={100}
            height={100}
            alt="kmc visitor management logo"
          />
          <p className="text-sm">Visitor Management System</p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mt-16">
          <Lottie height={50} width={50} animationData={animation} />
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="mx-auto flex w-full justify-between "
              variant="default"
            >
              <p>Get started</p>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </AlertDialogTrigger>
          <DataConsentDialog />
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default WelcomePage;

const DataConsentDialog = () => {
  const router = useRouter();

  return (
    <AlertDialogContent className="rounded-md ">
      <Card className="border-none p-0 shadow-none">
        <CardContent className="p-0 text-xl font-bold text-primary">
          DATA PRIVACY CONSENT
        </CardContent>
        <Separator />
      </Card>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-left">
          COMPANY CORPORATE POLICY
        </AlertDialogTitle>
        <AlertDialogDescription className="text-left">
          KMC shall fully comply with the obligations and requirements of the
          Data Privacy Act and, when applicable, the GDPR. KMC’s officers,
          management, and employees shall, at all times, respect the
          confidentiality and security of all personal data collected and/or
          stored and/or transmitted and/or used for, or on behalf of KMC. KMC
          shall ensure all collection, storage, transmission and other handling
          or usage of personal data by KMC shall be done in accordance with the
          obligations and requirements of the Data Privacy Act and when
          applicable, the GDPR. Where an individual legitimately requests access
          to and/or correction of personal data relating him/her, held by KMC,
          KMC shall provide and/or correct that data in accordance with the data
          privacy laws.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-left">
          SECURITY OF PERSONAL DATA
        </AlertDialogTitle>
        <AlertDialogDescription className="text-left">
          KMC shall fully comply with the obligations and requirements of the
          Data Privacy Act and, when applicable, the GDPR. KMC’s officers,
          management, and employees shall, at all times, respect the
          confidentiality and security of all personal data collected and/or
          stored and/or transmitted and/or used for, or on behalf of KMC. KMC
          shall ensure all collection, storage, transmission and other handling
          or usage of personal data by KMC shall be done in accordance with the
          obligations and requirements of the Data Privacy Act and when
          applicable, the GDPR. Where an individual legitimately requests access
          to and/or correction of personal data relating him/her, held by KMC,
          KMC shall provide and/or correct that data in accordance with the data
          privacy laws.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="mt-4">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() =>
            router.push(window.location.pathname + "/tabletConfig")
          }
        >
          I agree with terms and conditions
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
