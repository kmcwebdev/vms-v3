import { Input } from "@/components/ui/input";
import DateRangePicker from "@/components/global/date-range-picker";
import { TimeRangeSelector } from "@/components/ui/time-range-selector";
import React from "react";

export default function Part2() {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState({
    start: "08:00",
    end: "17:00",
  });
  return (
    <>
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
    </>
  );
}
