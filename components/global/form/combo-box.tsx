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

type Data = {
  value: string;
  label: string;
};

interface IComboboxProps {
  placeholder?: string;
  data: Data[];
  onSelect?: (e: string) => void;
  name: string;
}

const Combobox = ({ placeholder, data, onSelect, name }: IComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { control, setValue: setFormValue } = useFormContext();

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
              className="w-[200px] justify-between"
            >
              {value
                ? data.find((e) => e.value === value)?.label
                : placeholder
                ? placeholder
                : "Select"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command ref={ref}>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
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
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
};

export default Combobox;
