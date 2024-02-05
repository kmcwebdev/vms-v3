"use client";

import React from "react";
import Lottie from "lottie-react";
import animation from "../../public/not-found-animation.json";
import Link from "next/link";
import { Button } from "../ui/button";

const NotFoundUi = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex h-1/4 w-1/4">
        <Lottie animationData={animation} />
      </div>
      <h1 className="text-5xl font-bold ">404</h1>
      <p className="text-neutral-500">Page not found</p>
      <Link href="/cms" className="mt-6">
        <Button className="rounded-md px-4 py-2" variant="link">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundUi;
