import React from "react";
import AreaSites from "@/components/admin/cms/area-sites/area-sites";
import { Site } from "@/types/site";
import { env } from "@/lib/env.mjs";

const page = async () => {
  const response = await fetch(`${env.BASEURL}/api/sites/all`);

  const sites = (await response.json()) as Site[];

  return <AreaSites sites={sites} />;
};

export default page;
