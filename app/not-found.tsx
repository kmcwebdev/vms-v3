import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Component = () => {
  return (
    <div>
      <Link href="/">
        <Button className="rounded-md px-4 py-2 text-white">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default Component;
