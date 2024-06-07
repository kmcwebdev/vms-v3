import { Input } from "@/components/ui/input";
import DateRangePicker from "@/components/global/date-range-picker";
import { TimeRangeSelector } from "@/components/ui/time-range-selector";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Part2({ formControl }: { formControl: any }) {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState({
    start: "08:00",
    end: "17:00",
  });
  const [selectedCarrierName, setSelectedCarrierName] = React.useState("");
  const [selectedCompany, setSelectedCompany] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
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
                    {...field}
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

      {/* Date and Time */}
      <div className="flex flex-row justify-start gap-5 p-2">
        <FormField
          control={formControl.control}
          name="dateRange"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DateRangePicker
                    {...field}
                    className="border-gray-300"
                    name="dateRange"
                    onChange={(e) => {
                      console.log(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {/* <FormField
          control={formControl.control}
          name="time"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <TimeRangeSelector
                    {...field}
                    value={selectedTimeRange}
                    onChange={setSelectedTimeRange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        /> */}
      </div>

      {/* Reason for Visit */}
      <FormField
        control={formControl.control}
        name="reason"
        render={({ field }) => {
          return (
            <FormItem className="flex w-full flex-col p-2">
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
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
