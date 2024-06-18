import { Input } from "@/components/ui/input";
import DateRangePicker from "@/components/global/date-range-picker";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Part2({ formControl }: { formControl: any }) {
  const [selectedCarrierName, setSelectedCarrierName] = React.useState("");
  const [selectedCompany, setSelectedCompany] = React.useState("");
  const [selectedReason, setSelectedReason] = React.useState("");

  return (
    <>
      {/* Carrier Name and Company / Contractor */}

      <div className="flex flex-row justify-evenly gap-5 p-2">
        <FormField
          control={formControl.control}
          name="carrierName"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Carrier Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Personnel Name"
                    onChange={(e) => {
                      setSelectedCarrierName(e.target.value);
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
          name="company"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Company / Contractor</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Personnel Company"
                    onChange={(e) => {
                      setSelectedCompany(e.target.value);
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

      <div className="flex flex-col justify-start p-2">
        <p className="font-medium">Date</p>
        <DateRangePicker name="dateRange" className="mt-1"/>
      </div>


      {/* Reason for Visit */}
      <FormField
        control={formControl.control}
        name="reason"
        defaultValue={"No Specified Reason"}
        render={({ field }) => {
          return (
            <FormItem className="flex w-full flex-col p-2">
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input your Reason"
                  className="border-gray-300"
                  onChange={(e) => {
                    setSelectedReason(e.target.value);
                    field.onChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}
