import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const clients = [
  {
    id: 1,
    name: "KMC Solutions",
    isClientActive: true,
  },
  {
    id: 2,
    name: "Bethaine PH",
    isClientActive: true,
  },
  {
    id: 3,
    name: "Royal Carribbean",
    isClientActive: true,
  },
  {
    id: 4,
    name: "SOCI",
    isClientActive: false,
  },
  {
    id: 5,
    name: "HIIP Philippines",
    isClientActive: false,
  },
];

const Clients = () => {
  return (
    <Card className="mt-3 pt-6 shadow-none">
      <CardContent>
        <div className="flex flex-col gap-4">
          {clients.map((e) => (
            <ClientCard key={e.id} {...e} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Clients;

interface IClientCardProps {
  id: number;
  name: string;
  isClientActive: boolean;
}

const ClientCard = ({ name, isClientActive }: IClientCardProps) => {
  return (
    <Card className=" p-4 text-sm font-medium shadow-none">
      <CardContent className="flex items-center gap-x-4 p-0">
        <div className="relative z-0 h-4 w-4 rounded-full bg-orange-100 ">
          <div
            className={cn(
              "absolute left-1/2 top-0 z-10 h-2 w-2 -translate-x-1/2 translate-y-1/2 transform rounded-full opacity-100 transition ease-in-out",
              isClientActive ? "bg-orange-400" : "bg-primary-foreground",
            )}
          />
        </div>
        <p> {name}</p>
      </CardContent>
    </Card>
  );
};
