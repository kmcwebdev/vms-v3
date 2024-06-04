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

const GatePassForm = () => {
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

  const gatePassForm = useForm<Visitor>({});
  const router = useRouter();

  const onFormSubmit = (data: any) => {
    router.push("/cms");
  };

  const handleAddItem = () => {
    setItems([...items, { description: "", qty: 1, unit: "pcs", remarks: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleEmailInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && emailInput.trim() !== "") {
      setEmails([...emails, emailInput.trim()]);
      setEmailInput("");
      e.preventDefault();
    }
  };

  const handleRemoveEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
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
      <h2 className="mb-4 text-lg font-bold">Gate Pass Form</h2>
      <Form
        name="gate-pass"
        useFormReturn={gatePassForm}
        onSubmit={onFormSubmit}
      >
        <Accordion open={open === 1}>
          <AccordionHeader
            className="text-sm font-medium"
            onClick={() => handleOpen(1)}
          >
            Part 1 (Personal Information)
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

            {/* Service Category, Building, and Floor */}
            <div className="mb-4 flex flex-row justify-evenly gap-5 p-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Service Category
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-normal text-muted-foreground hover:bg-transparent">
                      {selectedCategory || "Select Category"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={5} className="w-40 text-sm">
                    {[
                      "Delivery",
                      "Pull-Out",
                      "Transfer Unit Between Floors",
                    ].map((type) => (
                      <DropdownMenuItem
                        key={type}
                        onSelect={() => setSelectedCategory(type)}
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
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader
            className="text-sm font-medium"
            onClick={() => handleOpen(2)}
          >
            Part 2 (Work Details)
          </AccordionHeader>
          <AccordionBody>
            {/* Carrier Name and Company / Contractor */}
            <div className="mb-4 flex flex-row justify-evenly gap-5 p-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Carrier Name
                </label>
                <Input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                  placeholder="Input Personnel Name"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Company / Contractor
                </label>
                <Input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                  placeholder="Input Personnel Company"
                />
              </div>
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

            {/* Reason for Visit */}
            <div className="mb-4 gap-5 p-2">
              <label className="block text-sm font-medium text-gray-700">
                Reason
              </label>
              <Textarea
                placeholder="Input your Reason"
                className="border-gray-300"
              />
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3}>
          <AccordionHeader
            className="text-sm font-medium"
            onClick={() => handleOpen(3)}
          >
            Part 3 (Additional Information)
          </AccordionHeader>
          <AccordionBody>
            {/* Relevant Emails to Notify */}
            <div className="mb-4 p-2">
              <label className="block text-sm font-medium text-gray-700">
                Emails to Notify
              </label>
              <Input
                type="email"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                value={emailInput}
                onChange={handleEmailInputChange}
                onKeyPress={handleEmailInputKeyPress}
                placeholder="Input an Email and Press Enter to Add"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {emails.map((email, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md bg-gray-200 px-2 py-1 text-sm"
                  >
                    <span>{email}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => handleRemoveEmail(index)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Items being carried */}
            <div className="mb-4 p-2">
              <label className="block text-sm font-medium text-gray-700">
                Items Being Carried
              </label>
              {items.map((item, index) => (
                <div key={index} className="mb-2 flex gap-2">
                  <Input
                    type="text"
                    placeholder="Input Item Description/Name"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    className="mt-1 block w-1/2 rounded-md border border-gray-300 p-2 text-sm"
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Qty"
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(index, "qty", e.target.value)
                    }
                    className="mt-1 block w-1/4 rounded-md border border-gray-300 p-2"
                  />
                  <Input
                    type="text"
                    placeholder="Unit"
                    value={item.unit}
                    onChange={(e) =>
                      handleItemChange(index, "unit", e.target.value)
                    }
                    className="mt-1 block w-1/4 rounded-md border border-gray-300 p-2"
                  />
                  <Input
                    type="text"
                    placeholder="Input Remarks"
                    value={item.remarks}
                    onChange={(e) =>
                      handleItemChange(index, "remarks", e.target.value)
                    }
                    className="mt-1 block w-1/2 rounded-md border border-gray-300 p-2"
                  />
                  <Button
                    onClick={() => handleRemoveItem(index)}
                    className="mt-1 rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
              <Button
                onClick={handleAddItem}
                className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                <div className="flex flex-row items-center justify-center">
                  <PlusIcon className="h-4 w-4" />
                  Add Item
                </div>
              </Button>
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

export default GatePassForm;
