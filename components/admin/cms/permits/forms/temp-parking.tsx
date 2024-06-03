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

interface Building {
  name: string;
  floors: number[];
}

const buildings: Building[] = [
  { name: "UPTOWN", floors: [19, 20] },
  { name: "PICADILLY STAR", floors: [20, 24, 25] },
  { name: "AURA", floors: [11] },
  { name: "ONE GRIFFINSTONE", floors: [9, 10] },
  { name: "SUN LIFE", floors: [8] },
  { name: "AEROPARK", floors: [5, 11] },
  { name: "VCORP", floors: [5, 9] },
  { name: "GAMMA", floors: [15, 16, 27, 28, 29] },
  { name: "ORE CENTRAL", floors: [11, 12] },
  { name: "SHERIDAN", floors: [10] },
  { name: "RUFINO", floors: [29] },
  { name: "FRABELLE", floors: [17, 18] },
  { name: "RBC T1", floors: [6] },
  { name: "RBC T3", floors: [8] },
  { name: "CYBER SIGMA", floors: [19, 20] },
  { name: "ZETA", floors: [7, 8, 9] },
  { name: "SKYRISE 4A", floors: [10, 18] },
  { name: "FESTIVE WALK", floors: [4] },
  { name: "5 ECOM", floors: [11, 12] },
  { name: "SKYRISE 4B", floors: [16, 17] },
  { name: "PODIUM WEST TOWER", floors: [26, 27] },
  { name: "FOUR/NEO", floors: [1, 11, 12, 14] },
  { name: "ARMSTRONG", floors: [7, 8, 9, 10, 11, 12, 14, 15] },
  { name: "HM TOWER", floors: [15] },
  { name: "ONE AYALA", floors: [6, 7, 8, 9, 10, 11, 12] },
  { name: "AXIS TOWER ONE", floors: [24, 26] },
  { name: "ARTHALAND CENTURY PACIFIC TOWER", floors: [10] },
  { name: "Lexmark Plaza 3", floors: [1, 2, 4, 5, 6, 7, 8, 12] },
  { name: "SM North Edsa", floors: [15] },
  { name: "Jollibee Tower", floors: [15, 16] },
  { name: "CASA Living by KMC", floors: [1, 2, 3, 4, 5] },
];

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

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const TimeRangeSelector = ({ onChange, value }) => (
    <div className="flex gap-2">
      <select
        className="block w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-500"
        value={value.start}
        onChange={(e) => onChange({ ...value, start: e.target.value })}
      >
        {timeOptions.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
      <span className="flex items-center">to</span>
      <select
        className=" block max-h-60 w-1/2 overflow-y-auto rounded-md border border-gray-300 p-2 text-sm text-gray-500"
        value={value.end}
        onChange={(e) => onChange({ ...value, end: e.target.value })}
      >
        {timeOptions.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );

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
      <h2 className="mb-4 text-lg font-bold">Temporary Parking Form</h2>
      <Form
        name="gate-pass"
        useFormReturn={visitorsForm}
        onSubmit={onFormSubmit}
      >
        {/* Type of Visitor */}
        <div className="mb-4">
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
        <div className="mb-4 flex flex-row justify-evenly gap-5">
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
        <div className="mb-4 flex flex-row justify-evenly gap-5">
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

        {/* Vehicle and Parking Details */}
        <div className="mb-4 flex flex-row justify-evenly gap-5">
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
        <div className="mb-4 flex flex-row justify-start gap-5">
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
        <div className="mb-4 gap-5">
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

        {/* Attach File and Submit Buttons */}
        <div className="flex flex-row justify-between">
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
                    <XIcon/>
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
