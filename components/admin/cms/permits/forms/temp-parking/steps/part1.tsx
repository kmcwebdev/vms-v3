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

export default function Part1() {
  const [selectedType, setSelectedType] = React.useState("Client");
  const [selectedBuilding, setSelectedBuilding] = React.useState("");
  const [selectedFloor, setSelectedFloor] = React.useState("");
  const [availableFloors, setAvailableFloors] = React.useState<number[]>([]);
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
      <div className="mb-4 p-2">
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <span className="isolate mt-1 inline-flex rounded-md shadow-sm">
          {["Client", "Internal", "Vendor"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
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
      </div>

      {/* Email and Name */}
      <div className="mb-4 flex flex-row justify-evenly gap-5 p-2">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <Input
            type="email"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
            placeholder="Input Requester Email"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
            placeholder="Input Requestor Name"
          />
        </div>
      </div>

      {/* Site, Floor, and Driver Name */}
      <div className="mb-4 flex flex-row justify-evenly gap-5 p-2">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Site
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground hover:bg-transparent">
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
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Floor
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground hover:bg-transparent">
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
                  onSelect={() => setSelectedFloor(floor.toString())}
                  disabled={!availableFloors.length}
                >
                  {floor}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Driver Name
          </label>
          <Input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
            placeholder="Input Driver's Name"
          />
        </div>
      </div>
    </>
  );
}
