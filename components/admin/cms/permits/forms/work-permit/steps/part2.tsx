import DateRangePicker from "@/components/global/date-range-picker";
import { TimeRangeSelector } from "@/components/ui/time-range-selector";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { workTypes, workRequirements } from "@/components/global/workdata";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function Part2() {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState({
    start: "08:00",
    end: "17:00",
  });
  const [selectedWorkTypes, setSelectedWorkTypes] = React.useState<string[]>(
    [],
  );
  const [selectedWorkRequirements, setSelectedWorkRequirements] =
    React.useState<string[]>([]);
  const [emails, setEmails] = React.useState<string[]>([]);
  const [emailInput, setEmailInput] = React.useState("");

  const handleWorkRequirementsSelect = (type: string) => {
    if (selectedWorkRequirements.includes(type)) {
      setSelectedWorkRequirements(
        selectedWorkRequirements.filter((item) => item !== type),
      );
    } else {
      setSelectedWorkRequirements([...selectedWorkRequirements, type]);
    }
  };

  const handleWorkTypesSelect = (type: string) => {
    if (selectedWorkTypes.includes(type)) {
      setSelectedWorkTypes(selectedWorkTypes.filter((item) => item !== type));
    } else {
      setSelectedWorkTypes([...selectedWorkTypes, type]);
    }
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

  return (
    <>
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
      {/* Type of Work and Work Requirements */}
      <div className="mb-4 flex flex-row gap-5 p-2">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Type of Work
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mt-1 flex h-16 w-full items-start justify-start overflow-scroll whitespace-pre-line rounded-md border border-gray-300 bg-transparent p-2 font-light text-muted-foreground hover:bg-transparent">
                {selectedWorkTypes.length > 0
                  ? selectedWorkTypes.join(", ")
                  : "Select Work Types"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={5}
              className="max-h-60 w-40 overflow-y-auto text-sm"
            >
              {workTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onSelect={() => handleWorkTypesSelect(type)}
                >
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedWorkTypes.includes(type)}
                      readOnly
                      className="form-checkbox h-4 w-4 text-indigo-500"
                    />
                    <span className="text-xs text-gray-700">{type}</span>
                  </label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Others
          </label>
          <Textarea
            className="mt-1 block h-16 w-full rounded-md border border-gray-300 p-2"
            placeholder="Input Other Work Type"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Work Requirements
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mt-1 flex h-16 w-full items-start justify-start overflow-scroll whitespace-pre-line rounded-md border border-gray-300 bg-transparent p-2 font-light text-muted-foreground hover:bg-transparent">
                {selectedWorkRequirements.length > 0
                  ? selectedWorkRequirements.join(", ")
                  : "Select Work Requirements"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={5}
              className="max-h-60 w-40 overflow-y-auto text-sm"
            >
              {workRequirements.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onSelect={() => handleWorkRequirementsSelect(type)}
                >
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedWorkRequirements.includes(type)}
                      readOnly
                      className="form-checkbox h-4 w-4 text-indigo-500"
                    />
                    <span className="text-xs text-gray-700">{type}</span>
                  </label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Others
          </label>
          <Textarea
            className="mt-1 block h-16 w-full rounded-md border border-gray-300 p-2"
            placeholder="Input Other Work Requirement"
          />
        </div>
      </div>

      {/* Relevant Emails to Notify and Reason */}
      <div className="mb-4 flex flex-row gap-5 p-2">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Emails to Notify
          </label>
          <Input
            type="email"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            value={emailInput}
            onChange={handleEmailInputChange}
            onKeyPress={handleEmailInputKeyPress}
            placeholder="Enter an email and press Enter"
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
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Scope of Work
          </label>
          <Input
            placeholder="Input your Scope of Work"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>
    </>
  );
}
