import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "@/components/global/data-table";
import { Badge } from "@/components/ui/badge";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2, PencilLine } from "lucide-react";

interface Client {
  id: number;
  name: string;
  pocCount: number;
  totalVisits: number;
  isClientActive: boolean;
}

const clients: Client[] = [
  {
    id: 1,
    name: "KMC Solutions",
    pocCount: 29,
    totalVisits: 100,
    isClientActive: true,
  },
  {
    id: 2,
    name: "Bethaine PH",
    pocCount: 3,
    totalVisits: 241,
    isClientActive: true,
  },
  {
    id: 3,
    name: "Royal Carribbean",
    pocCount: 20,
    totalVisits: 100,
    isClientActive: true,
  },
  {
    id: 4,
    name: "SOCI",
    pocCount: 4,
    totalVisits: 142,
    isClientActive: false,
  },
  {
    id: 5,
    name: "HIIP Philippines",
    pocCount: 2,
    totalVisits: 40,
    isClientActive: false,
  },
];

const Clients = () => {
  const columns = createColumnHelper<Client>();

  const clientColumns = [
    columns.accessor("name", {
      header: "Client name",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <p className="hover:cursor-pointer hover:underline">
              {row.getValue("name")}
            </p>
          </DialogTrigger>
          <DialogContent className="p-4">
            <DialogHeader>
              <DialogTitle>{row.getValue("name")}</DialogTitle>
              <DialogDescription>
                List of client&apos;s point of contact
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2">
              <Card className="p-4 text-sm shadow-none">
                <CardContent className="flex items-center justify-between p-0">
                  <div>
                    <p>Ryan Christsupher Rizo</p>
                    <p className="text-sm text-muted-foreground ">
                      ryanrizo@kmc.solutions
                    </p>
                  </div>
                  <Trash2 className="h-5 w-5 text-muted-foreground transition ease-in-out hover:cursor-pointer hover:text-red-500" />
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      ),
    }),
    columns.accessor("pocCount", {
      header: "POC count",
      cell: (row) => <p>{row.getValue().toString()}</p>,
    }),
    columns.accessor("totalVisits", {
      header: "Total visitors",
      cell: (row) => <p>{row.getValue().toString()}</p>,
    }),
    columns.accessor("isClientActive", {
      header: "Status",
      cell: (row) => {
        const status = row.getValue() ? "Active" : "Inactive";
        const variant = row.getValue() ? "default" : "secondary";

        return (
          <Badge variant={variant} className="font-normal">
            {status}
          </Badge>
        );
      },
    }),
    columns.display({
      id: "actions",
      cell: (props) => (
        <PencilLine className="h-5 w-5 text-muted-foreground transition ease-in-out hover:cursor-pointer hover:text-primary" />
      ),
    }),
  ];

  return (
    <Card className="mt-3 pt-6 shadow-none">
      <CardContent>
        <DataTable data={clients} columns={clientColumns} hasSearch />
      </CardContent>
    </Card>
  );
};

export default Clients;
