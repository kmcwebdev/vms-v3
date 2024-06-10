"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";
import { z } from "zod";

interface IDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  name: string;
}

const DateRangePicker = ({ className, name }: IDateRangePickerProps) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(2024, 0, 30), 30),
  });

  const { control } = useFormContext();

  const parseDateString = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start border-gray-300 text-left font-light",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                // onSelect={(e) => {
                //   setDate(e);
                //   field.onChange(e);
                // }}

                // onSelect={(e) => {
                //   setDate(e);
                //   // Format the selected dates to YYYY-MM-DD before updating the field
                //   const formattedDateRange = {
                //     from: e?.from ? format(e.from, "yyyy-MM-dd") : null,
                //     to: e?.to ? format(e.to, "yyyy-MM-dd") : null,
                //   };
                //   field.onChange(formattedDateRange);
                // }}

                onSelect={(e) => {
                  setDate(e);
                  // Format and convert the selected dates to Date objects in YYYY-MM-DD format
                  const formattedDateRange = {
                    from: e?.from ? parseDateString(format(e.from, "yyyy-MM-dd")) : null,
                    to: e?.to ? parseDateString(format(e.to, "yyyy-MM-dd")) : null,
                  };
                  // Ensure the dates are ZodDate compatible
                  const zodFormattedDateRange = {
                    from: formattedDateRange.from ? z.date().parse(formattedDateRange.from) : null,
                    to: formattedDateRange.to ? z.date().parse(formattedDateRange.to) : null,
                  };
                  field.onChange(zodFormattedDateRange);
                }}

                numberOfMonths={2}
              />
            )}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
