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
import Image from "next/image";

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
                onClick={() => router.push(`/cms/area-sites/${e.site_id}`)}
                className="group shadow-none transition ease-in-out hover:cursor-pointer hover:border-orange-400"
              >
                <CardHeader className="p-3">
                  {e.site_banner ? (
                    <div className="relative h-60 w-full rounded-md">
                      <Image
                        src={e.site_banner || "/kmc-logo-black.png"}
                        alt="Site image"
                        className="bottom-0 rounded-md object-cover"
                        fill
                      />
                    </div>
                  ) : (
                    <div className="flex h-64 w-full items-center justify-center rounded-md bg-gray-100">
                      <p className=" font-bold text-white">No image</p>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="px-3 pb-3 pt-0">
                  <div className="flex justify-between text-sm">
                    <h2>{e.site_name}</h2>
                    <div className="flex items-center gap-x-2">
                      <Users size={14} className="text-muted-foreground" />
                      <p className="text-muted-foreground">{e.visitor_count}</p>
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
