import DateRangePicker from "@/components/global/date-range-picker";
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

export default function Part2({ formControl }: { formControl: any }) {
  const [selectedWorkTypes, setSelectedWorkTypes] = React.useState<string[]>(
    [],
  );

  const [selectedWorkRequirements, setSelectedWorkRequirements] =
    React.useState<string[]>([]);
  const [emails, setEmails] = React.useState<string[]>([]);
  const [emailInput, setEmailInput] = React.useState("");
  const [selectedOtherWorkTypes, setSelectedOtherWorkTypes] =
    React.useState("");
  const [selectedOtherWorkRequirements, setSelectedOtherWorkRequirements] =
    React.useState("");
  const [selectedScope, setSelectedScope] = React.useState("");

  const { setValue, getValues } = useFormContext();

  const handleWorkRequirementsSelect = (type: string) => {
    const currentRequirements = getValues("workRequirements") || [];
    const updatedRequirements = currentRequirements.includes(type)
      ? currentRequirements.filter((item: string) => item !== type)
      : [...currentRequirements, type];

    setSelectedWorkRequirements(updatedRequirements);
    setValue("workRequirements", updatedRequirements);
  };

  const handleWorkTypesSelect = (type: string) => {
    const currentTypes = getValues("workTypes") || [];
    const updatedTypes = currentTypes.includes(type)
      ? currentTypes.filter((item: string) => item !== type)
      : [...currentTypes, type];

    setSelectedWorkTypes(updatedTypes);
    setValue("workTypes", updatedTypes);
  };

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleEmailInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && emailInput.trim() !== "") {
      const newEmails = [...emails, emailInput.trim()];
      setEmails(newEmails);
      setEmailInput("");
      setValue("emailsToNotify", newEmails);
      e.preventDefault();
    }
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
    setValue("emailsToNotify", newEmails); 
  };

  return (
    <>
      <div className="flex flex-col justify-start p-2">
        <p className="font-medium">Date</p>
        <DateRangePicker name="dateRange" className="mt-1"/>
      </div>

      {/* Type of Work and Work Requirements */}
      <div className="flex flex-row justify-evenly gap-5 p-2">
        <FormField
          control={formControl.control}
          name="workTypes"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Type Of Work</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        {...field}
                        className="mt-1 flex h-16 w-full items-start justify-start overflow-scroll whitespace-pre-line rounded-md border border-gray-300 bg-transparent p-2 font-light text-muted-foreground shadow-none hover:bg-transparent"
                      >
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
                              className="form-checkbox h-4 w-4 text-indigo-500 shadow-none"
                            />
                            <span className="text-xs text-gray-700">
                              {type}
                            </span>
                          </label>
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
          name="otherWorkTypes"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Others</FormLabel>
                <FormControl>
                  <Textarea
                    className="block h-16 w-full rounded-md border border-gray-300"
                    placeholder="Input Other Work Type"
                    onChange={(e) => {
                      setSelectedOtherWorkTypes(e.target.value);
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
          name="workRequirements"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Work Requirements</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        {...field}
                        className="mt-1 flex h-16 w-full items-start justify-start overflow-scroll whitespace-pre-line rounded-md border border-gray-300 bg-transparent p-2 font-light text-muted-foreground shadow-none hover:bg-transparent"
                      >
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
                              className="form-checkbox h-4 w-4 text-indigo-500 shadow-none"
                            />
                            <span className="text-xs text-gray-700">
                              {type}
                            </span>
                          </label>
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
          name="otherWorkRequirements"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Others</FormLabel>
                <FormControl>
                  <Textarea
                    className="block h-16 w-full rounded-md border border-gray-300"
                    placeholder="Input Other Work Requirements"
                    onChange={(e) => {
                      setSelectedOtherWorkRequirements(e.target.value);
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

      {/* Relevant Emails to Notify and Reason */}
      <div className="flex flex-row justify-evenly">
        <FormField
          control={formControl.control}
          name="emailsToNotify"
          render={() => {
            return (
              <FormItem className="flex w-full flex-col p-2">
                <FormLabel>Emails to Notify</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    value={emailInput}
                    onChange={handleEmailInputChange}
                    onKeyPress={handleEmailInputKeyPress}
                    placeholder="Input an Email and Press Enter to Add"
                  />
                </FormControl>
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
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={formControl.control}
          name="scope"
          defaultValue={"Not Specified"}
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col p-2">
                <FormLabel>Scope</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Scope of Work"
                    onChange={(e) => {
                      setSelectedScope(e.target.value);
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
