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
import Image from "next/image";

const people = [
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    site: "Picadilly Star",
    floor: "25",
    type: "Client",
  },
  // More people...
];

const ManageUsers = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedBuilding, setSelectedBuilding] = React.useState("");
  const userFormResponses = useForm<Visitor>({});

  const router = useRouter();

  const onFormSubmit = (data: any) => {
    router.push("/");
  };

  return (
    <>
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
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
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
                    <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent">
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
                    <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent">
                      {selectedStatus || "Select a Status"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    sideOffset={5}
                    className="max-h-60 w-40 overflow-y-auto text-sm"
                  >
                    {[
                      "Pending",
                      "Approved - Site Admin",
                      "Declined - Site Admin",
                      "Approved - Building Admin",
                      "Declined - Building Admin",
                    ].map((type) => (
                      <DropdownMenuItem
                        key={type}
                        onSelect={() => setSelectedStatus(type)}
                      >
                        {type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Site
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent">
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
            <Separator className="mt-2" />
          </CardContent>
        </Form>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Details
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        User Type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Actions
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-gray-900">
                                {person.name}
                              </div>
                              <div className="mt-1 text-gray-500">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{person.site}</div>
                          <div className="mt-1 text-gray-500">
                            {person.floor}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Active
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {person.type}
                        </td>
                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {person.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Separator className="mt-2" />
      </Card>
    </>
  );
};

export default ManageUsers;
