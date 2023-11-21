import React from "react";
import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";

interface ISelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  data: {
    label: string;
    value: string;
  }[];
}

const Select = ({ name, label, placeholder, data }: ISelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <div>
          {label && (
            <label htmlFor={name} className="text-sm">
              {label}
            </label>
          )}

          <SelectComponent onValueChange={onChange} defaultValue={value}>
            <SelectTrigger className="w-full ">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data.map((e) => (
                  <SelectItem key={e.value} value={e.value}>
                    {e.label}
                  </SelectItem>
                ))}
                {/* <SelectLabel>Fruits</SelectLabel> */}
                {/* <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </SelectComponent>
        </div>
      )}
    />
  );
};

export default Select;
