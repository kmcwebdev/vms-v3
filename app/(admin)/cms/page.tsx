import React from "react";
import Admin from "@/components/admin";
import type { Site } from "@/types/global/site";
import { env } from "@/lib/env.mjs";

const page = async () => {
  const response = await fetch(`${env.BASEURL}/api/sites/all`);

  const sites = (await response.json()) as Site[];

  return <Admin site={sites} />;
};

export default page;
