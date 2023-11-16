import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "@/components/global/data-table";
import { Badge } from "@/components/ui/badge";
import { createColumnHelper } from "@tanstack/react-table";

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
        <p className="hover:cursor-pointer hover:underline">
          {row.getValue("name")}
        </p>
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
