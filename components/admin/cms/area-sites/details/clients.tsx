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
import { Button } from "@/components/ui/button";
import { PencilLine, Trash2, Download } from "lucide-react";
import { useForm } from "react-hook-form";
import Form from "@/components/global/form";
import { useDownloadCSV } from "@/hooks/useDownloadToCsv";
import DateRangePicker from "@/components/global/date-range-picker";

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

interface ISiteDetailsProps {
  site_id: string;
  from: string;
  to: string;
}

const Clients = () => {
  const columns = createColumnHelper<Client>();

  const searchClients = useForm();

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

  const onSearchClientHandler = () => {
    console.log("test", searchClients.getValues());
  };

  return (
    <Card className="mt-3 pt-6 shadow-none">
      <CardContent>
        <Form
          name="search-client"
          useFormReturn={searchClients}
          onSubmit={onSearchClientHandler}
          className="mb-8 flex justify-between"
        >
          <Form.Input
            name="search"
            placeholder="Search client"
            type="text"
            className="w-1/4"
          />
        </Form>

        <DataTable data={clients} columns={clientColumns} />
      </CardContent>
    </Card>
  );
};

export default Clients;
