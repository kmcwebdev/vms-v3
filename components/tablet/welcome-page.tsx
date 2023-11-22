"use client";

import React from "react";
import Lottie from "lottie-react";
import animation from "../../public/lottie-animation.json";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import kmc from "../../public/kmc-logo-black.png";

const WelcomePage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <Image
          src={kmc}
          width={100}
          height={80}
          alt="kmc visitor management logo"
        />
        <p>Visitor Management System</p>
      </div>
      <div className="mt-16">
        <Lottie animationData={animation} />
      </div>

      <div className="flex">
        <Button className="mx-auto flex justify-between" variant="outline">
          <p>Get started</p>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
