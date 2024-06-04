import { Input } from "@/components/ui/input";
import Form from "../../../../global/form";
import * as React from "react";
import DateRangePicker from "@/components/global/date-range-picker";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Visitor } from "@/types/visitor";
import { XIcon, PlusIcon } from "lucide-react";
import { TimeRangeSelector } from "@/components/ui/time-range-selector";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { buildings } from "@/components/global/sites";

const TempParkingForm = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedBuilding, setSelectedBuilding] = React.useState("");
  const [selectedFloor, setSelectedFloor] = React.useState("");
  const [availableFloors, setAvailableFloors] = React.useState<number[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = React.useState({
    start: "08:00",
    end: "17:00",
  });
  const [selectedType, setSelectedType] = React.useState("Client");
  const [items, setItems] = React.useState([
    { description: "", qty: 1, unit: "pcs", remarks: "" },
  ]);
  const [emails, setEmails] = React.useState<string[]>([]);
  const [emailInput, setEmailInput] = React.useState("");
  const [attachedFiles, setAttachedFiles] = React.useState<File[]>([]);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  React.useEffect(() => {
    const building = buildings.find((b) => b.name === selectedBuilding);
    if (building) {
      setAvailableFloors(building.floors);
      setSelectedFloor("");
    } else {
      setAvailableFloors([]);
    }
  }, [selectedBuilding]);

  const visitorsForm = useForm<Visitor>({});
  const router = useRouter();

  const onFormSubmit = (data: any) => {
    router.push("/cms");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    let newFiles = Array.from(files);
    let totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);

    if (attachedFiles.length + newFiles.length > 3) {
      setFileError("You can only attach up to 3 files.");
      return;
    }

    if (totalSize > 15 * 1024 * 1024) {
      setFileError("Total file size exceeds 15MB.");
      return;
    }

    setAttachedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles];
      totalSize = updatedFiles.reduce((acc, file) => acc + file.size, 0);

      if (totalSize > 15 * 1024 * 1024) {
        setFileError("Total file size exceeds 15MB.");
        return prevFiles;
      } else {
        setFileError(null);
        return updatedFiles;
      }
    });
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      return updatedFiles;
    });
  };

  return (
    <div className="rounded-md p-4">
      <h2 className="mb-4 text-lg font-bold">Temporary Parking Form</h2>
      <Form
        name="gate-pass"
        useFormReturn={visitorsForm}
        onSubmit={onFormSubmit}
      >
        <Accordion open={open === 1}>
          <AccordionHeader
            className="text-sm font-medium"
            onClick={() => handleOpen(1)}
          >
            Part 1 (Personal Details)
          </AccordionHeader>
          <AccordionBody>
            {/* Type of Visitor */}
            <div className="mb-4 p-2">
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
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
                    <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-normal text-muted-foreground hover:bg-transparent">
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
                    <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-normal text-muted-foreground hover:bg-transparent">
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
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader
            className="text-sm font-medium"
            onClick={() => handleOpen(2)}
          >
            Part 2 (Vehicle Details)
          </AccordionHeader>
          <AccordionBody>
            {/* Vehicle and Parking Details */}
            <div className="mb-4 flex flex-row justify-evenly gap-5 p-2">
              {[
                "Vehicle Model",
                "Vehicle Color",
                "Vehicle Plate Number",
                "Parking Slot Number",
              ].map((type) => (
                <div className="w-full" key={type}>
                  <label className="block text-sm font-medium text-gray-700">
                    {type}
                  </label>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    required
                    placeholder={`Input ${type}`}
                  />
                </div>
              ))}
            </div>

            {/* Date and Time */}
            <div className="mb-4 flex flex-row justify-start gap-5 p-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <DateRangePicker className="border-gray-300" name="dateRange" />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Time Range
                </label>
                <TimeRangeSelector
                  value={selectedTimeRange}
                  onChange={setSelectedTimeRange}
                />
              </div>
            </div>

            {/* Manager Email */}
            <div className="mb-4 gap-5 p-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Manager Email
                </label>
                <Input
                  type="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                  placeholder="Input Your Manager's Email"
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>

        {/* Attach File and Submit Buttons */}
        <div className="mt-5 flex flex-row justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Attach Files
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
            {fileError && (
              <p className="mt-2 text-sm text-red-600">{fileError}</p>
            )}
            <ul className="mt-2">
              {attachedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-600"
                  >
                    <XIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Button
            type="submit"
            className="mt-4 max-h-11 rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-orange-500"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default TempParkingForm;
