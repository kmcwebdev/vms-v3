"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

type Data = {
  value: string;
  label: string;
};

interface IComboboxProps {
  placeholder?: string;
  data: Data[];
  onSelect?: (e: string) => void;
  name: string;
  defaultValue?: string;
}

const Combobox = ({
  placeholder,
  data,
  onSelect,
  name,
  defaultValue,
}: IComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { control, setValue: setFormValue } = useFormContext();

  useEffect(() => {
    setValue(defaultValue || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, ref } }) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex w-auto justify-between"
            >
              <p className="truncate">
                {value
                  ? data.find((e) => e.value === value)?.label
                  : placeholder
                  ? placeholder
                  : "Select"}
              </p>

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className=" w-fit p-0">
            <Command ref={ref}>
              <CommandInput placeholder="Search here" />
              <CommandEmpty>No framework found.</CommandEmpty>
              <ScrollArea className="h-fit max-h-60 overflow-y-auto">
                <CommandGroup>
                  {data.map((e) => (
                    <CommandItem
                      key={e.value}
                      value={e.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        onSelect && onSelect(e.value);
                        setFormValue(name, e.value);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === e.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {e.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
};

export default Combobox;
