"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import DateRangePicker from "@/components/global/date-range-picker";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import { Visitor } from "@/types/visitor";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { buildings } from "@/components/global/sites";
import { Separator } from "@/components/ui/separator";

const UserManagement = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedBuilding, setSelectedBuilding] = React.useState("");
  const userFormResponses = useForm<Visitor>({});

  const router = useRouter();

  const onFormSubmit = (data: any) => {
    router.push("/");
  };

  return (
    <Card className="mt-5 shadow-none">
      <Form
        name="gate-pass"
        useFormReturn={userFormResponses}
        onSubmit={onFormSubmit}
      >
        <CardHeader>
          <CardTitle className="text-xl font-bold">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-5 p-2">
            <div className="content-end">
              <Button>
                <MagnifyingGlassIcon className="h-6 w-6" />
              </Button>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Cust. Number
              </label>
              <Input
                type="number"
                className="mt-1 block w-full font-light rounded-md border border-gray-300 p-2"
                required
                placeholder="Input Cust. Number"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <DateRangePicker
                className="mt-1 border-gray-300 shadow-none "
                name="dateRange"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                type="number"
                className="mt-1 block w-full rounded-md border font-light border-gray-300 p-2"
                required
                placeholder="Input Customer Name"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Form Type
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="mt-1 block w-full shadow-none rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground hover:bg-transparent">
                    {selectedCategory || "Select a Category"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={5}
                  className="max-h-60 w-40 overflow-y-auto text-sm"
                >
                  {["Gate Pass", "Work Permit", "Temp Parking"].map(
                    (type) => (
                      <DropdownMenuItem
                        key={type}
                        onSelect={() => setSelectedCategory(type)}
                      >
                        {type}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="mt-1 block w-full shadow-none rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground hover:bg-transparent">
                    {selectedStatus || "Select a Status"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={5}
                  className="max-h-60 w-40 overflow-y-auto text-sm"
                >
                  {["Pending", "Approved - Site Admin", "Declined - Site Admin", "Approved - Building Admin", "Declined - Building Admin"].map(
                    (type) => (
                      <DropdownMenuItem
                        key={type}
                        onSelect={() => setSelectedStatus(type)}
                      >
                        {type}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Site
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mt-1 block w-full shadow-none rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground hover:bg-transparent">
                {selectedBuilding || "Select Site"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={5}
              className="max-h-60 w-40 overflow-y-auto text-sm"
            >
              {buildings.map((building) => (
                <DropdownMenuItem
                  key={building.name}
                  onSelect={() => setSelectedBuilding(building.name)}
                >
                  {building.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
          </div>
          <Separator className="mt-2"/>
          <div className="gap-5 p-2 mt-2">
            <p className="flex justify-center">No data</p>

          </div>
          <Separator className="mt-2"/>
        </CardContent>
      </Form>
    </Card>
  );
};

export default UserManagement;
