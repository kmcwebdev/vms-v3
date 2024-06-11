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

      <div className="flex flex-col justify-start p-2">
        <p className="font-medium">Date</p>
        <DateRangePicker name="dateRange" className="mt-1"/>
      </div>

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
