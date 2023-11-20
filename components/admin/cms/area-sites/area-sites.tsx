"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useGetAllSites } from "@/hooks/useGetAllSites";

const sites = [
  {
    value: "armstrong-corporate-center",
    label: "Armstrong Corporate Center",
  },
  {
    value: "uptown-place-tower-2",
    label: "UpTown Place Tower 2",
  },
  {
    value: "v-corporate-center",
    label: "V Corporate Center",
  },
  {
    value: "frabelle-corporate-plaza",
    label: "Frabelle Corporate Plaza",
  },
  {
    value: "picadilly-inc",
    label: "Picadilly Inc.",
  },
  {
    value: "four-neo",
    label: "Four Neo",
  },
  {
    value: "arthaland-century-pacific-tower",
    label: "Arthaland Century Pacific Tower",
  },
];

const AreaSites = () => {
  const router = useRouter();

  const { data: allSites, isLoading: isAllSitesLoading } = useGetAllSites();

  console.log(allSites);

  const searchSiteForm = useForm();

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="flex justify-between text-xl font-bold">
          KMC sites
          <Form
            name="searchSiteForm"
            useFormReturn={searchSiteForm}
            onSubmit={handleSubmit}
          >
            <Form.Input
              name="siteName"
              type="text"
              placeholder="Search site "
            />
          </Form>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {!isAllSitesLoading &&
            allSites &&
            allSites.length > 0 &&
            allSites.map((e) => (
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
