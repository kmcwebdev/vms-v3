import { Input } from "@/components/ui/input";
import DateRangePicker from "@/components/global/date-range-picker";
import { TimeRangeSelector } from "@/components/ui/time-range-selector";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function Part2() {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState({
    start: "08:00",
    end: "17:00",
  });
  return (
    <>
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
        <Textarea placeholder="Input your Reason" className="border-gray-300" />
      </div>
    </>
  );
}
