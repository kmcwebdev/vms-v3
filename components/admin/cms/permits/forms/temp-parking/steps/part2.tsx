import { Input } from "@/components/ui/input";
import DateRangePicker from "@/components/global/date-range-picker";
import { TimeRangeSelector } from "@/components/ui/time-range-selector";
import React from "react";
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
  const [selectedModel, setSelectedModel] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState("");
  const [selectedPlate, setSelectedPlate] = React.useState("");
  const [selectedLot, setSelectedLot] = React.useState("");
  const stateSetterMap = {
    vehicleModel: setSelectedModel,
    vehicleColor: setSelectedColor,
    vehicleNumber: setSelectedPlate,
    parkingNumber: setSelectedLot
  };
  const [selectedDateRange, setSelectedDateRange] = React.useState("");
  const [selectedManagerEmail, setSelectedManagerEmail] = React.useState("");
  return (
    <>
      {/* Vehicle and Parking Details */}
      <div className="mb-4 flex flex-row justify-evenly gap-5 p-2">
        {[
          ["Vehicle Model", "vehicleModel"],
          ["Vehicle Color", "vehicleColor"],
          ["Vehicle Plate Number", "vehicleNumber"],
          ["Parking Slot Number", "parkingNumber"]
        ].map((type) => (
          <FormField
          key={type[1]}
          control={formControl.control}
          name={type[1]}
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>{type[0]}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder={`Input ${type[0]}`}
                    onChange={(e) => {
                      if (type[1] == "vehicleModel") {
                        setSelectedModel(e.target.value)
                      } else if (type[1] == "vehicleColor") {
                        setSelectedColor(e.target.value)
                      } else if (type[1] == "vehicleNumber") {
                        setSelectedPlate(e.target.value)
                      } else {
                        setSelectedLot(e.target.value)
                      }
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        ))}
      </div>

      <div className="flex flex-row justify-start gap-5 p-2">
        <DateRangePicker name="dateRange" />
      </div>

      {/* Date and Time */}
      {/* <div className="flex flex-row justify-start gap-5 p-2">
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
                      setSelectedDateRange(e.target.toString())
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
        /> 
      </div>  */}

      {/* Manager Email */}
      <FormField
          control={formControl.control}
          name="managerEmail"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col p-2">
                <FormLabel>Manager Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="mt-1 block w-full rounded-md border border-gray-300"
                    placeholder="Input Your Manager's Email"
                    onChange={(e) => {
                      setSelectedManagerEmail(e.target.value);
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
