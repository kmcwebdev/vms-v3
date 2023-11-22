import React from "react";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="h-screen overflow-y-auto bg-neutral-50/50 px-24 py-8">
      {children}
      <Toaster />
    </main>
  );
};

export default layout;
