import React from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { buildings } from "@/components/global/sites";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Part1({ formControl }: { formControl: any }) {
  const [selectedType, setSelectedType] = React.useState("Client");
  const [selectedBuilding, setSelectedBuilding] = React.useState("");
  const [selectedFloor, setSelectedFloor] = React.useState("");
  const [availableFloors, setAvailableFloors] = React.useState<number[]>([]);
  const [selectedEmail, setSelectedEmail] = React.useState("");
  const [selectedName, setSelectedName] = React.useState("");
  const [selectedWorkArea, setSelectedWorkArea] = React.useState("");
  const [selectedContractor, setSelectedContractor] = React.useState("");
  const [selectedPersonInCharge, setSelectedPersonInCharge] = React.useState("");
  const [selectedNumber, setSelectedNumber] = React.useState("");

  React.useEffect(() => {
    const building = buildings.find((b) => b.name === selectedBuilding);
    if (building) {
      setAvailableFloors(building.floors);
      setSelectedFloor("");
    } else {
      setAvailableFloors([]);
    }
  }, [selectedBuilding]);

  return (
    <>
      {/* Type of Visitor */}
      <FormField
        control={formControl.control}
        name="type"
        render={({ field }) => {
          return (
            <FormItem className="flex flex-col p-2">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <span className="isolate mt-1 inline-flex rounded-md">
                  {["Client", "Internal", "Vendor"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedType(type);
                        field.onChange(type);
                      }}
                      {...field}
                      className={`relative inline-flex items-center px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 ${
                        selectedType === type ? "bg-gray-200" : "bg-white"
                      } ${type === "Client" ? "rounded-l-md" : ""} ${
                        type === "Vendor" ? "-ml-px rounded-r-md" : "-ml-px"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </span>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* Email and Name */}
      <div className="flex flex-row justify-evenly gap-5 p-2">
        <FormField
          control={formControl.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Requester Email"
                    onChange={(e) => {
                      setSelectedEmail(e.target.value);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={formControl.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Requester Name"
                    onChange={(e) => {
                      setSelectedName(e.target.value);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      {/* Work Area, Site, Floor, and Tenant */}
      <div className="flex flex-row justify-evenly gap-5 p-2">
        <FormField
          control={formControl.control}
          name="workArea"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Work Area</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Work Area"
                    onChange={(e) => {
                      setSelectedWorkArea(e.target.value);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={formControl.control}
          name="site"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Site</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        {...field}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent"
                      >
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
                          onSelect={() => {
                            setSelectedBuilding(building.name);
                            field.onChange(building.name);
                          }}
                        >
                          {building.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={formControl.control}
          name="floor"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Floor</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        {...field}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent"
                      >
                        {selectedFloor || "Select Floor"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      sideOffset={5}
                      className="max-h-60 w-40 overflow-y-auto text-sm"
                    >
                      {availableFloors.map((floor) => (
                        <DropdownMenuItem
                          key={floor}
                          onSelect={() => {
                            setSelectedFloor(floor.toString());
                            field.onChange(floor.toString());
                          }}
                          disabled={!availableFloors.length}
                        >
                          {floor}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={formControl.control}
          name="tenant"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Tenant</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Personnel Name"
                    onChange={(e) => {
                      setSelectedWorkArea(e.target.value);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      {/* Name of Contractor, Person in Charge and Contact Number */}
      <div className="flex flex-row justify-evenly gap-5 p-2">
        <FormField
          control={formControl.control}
          name="contractor"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Name of Contractor</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Contractor Name"
                    onChange={(e) => {
                      setSelectedContractor(e.target.value);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={formControl.control}
          name="personInCharge"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Person In Charge</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Person In Charge"
                    onChange={(e) => {
                      setSelectedPersonInCharge(e.target.value);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={formControl.control}
          name="number"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Person In Charge Contact Number"
                    onChange={(e) => {
                      setSelectedNumber(e.target.value);
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
    </>
  );
}
