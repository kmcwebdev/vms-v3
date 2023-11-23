"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllSites } from "@/hooks/sites/useGetAllSites";
import { createSearchParams } from "@/lib/utils";
import { Site } from "@/types/site";

interface AreaSitesProps {
  sites: Site[];
}

const AreaSites: React.FC<AreaSitesProps> = ({ sites }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: allSites, isLoading: isAllSitesLoading } = useGetAllSites(
    {
      filter: searchParams.get("filter")?.toString(),
    },
    sites,
  );

  const searchSiteForm = useForm();

  const handleSubmit = (data: { filter: string }) => {
    const newSearchParams = createSearchParams(data);

    if (newSearchParams) {
      router.push(`${window.location.pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
    }
  };

  if (isAllSitesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className=" shadow-none">
      <CardHeader>
        <CardTitle className="flex justify-between text-xl font-bold">
          KMC sites
          <Form
            name="searchSiteForm"
            useFormReturn={searchSiteForm}
            onSubmit={handleSubmit}
          >
            <Form.Input name="filter" type="text" placeholder="Search site " />
          </Form>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {allSites &&
            allSites.length > 0 &&
            allSites?.map((e) => (
              <Card
                key={e.site_id}
                onClick={() => router.push(`/cms/area-sites/${e.site_name}`)}
                className="group shadow-none transition ease-in-out hover:cursor-pointer hover:border-orange-400"
              >
                <CardHeader className="p-3">
                  <div className="h-64 w-full rounded-md bg-gray-100" />
                </CardHeader>
                <CardContent className="px-3 pb-3 pt-0">
                  <div className="flex justify-between text-sm">
                    <h2>{e.site_name}</h2>
                    <div className="flex items-center gap-x-2">
                      <Users size={14} className="text-muted-foreground" />
                      <p className="text-primary">63</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaSites;
