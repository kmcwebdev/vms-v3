import { Input as InputComponent } from "@/components/ui/input";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

interface IInputProps {
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  className?: string;
}

const Input = ({ name, type, placeholder, className }: IInputProps) => {
  const { control, register } = useFormContext();

  return (
    <InputComponent
      {...register(name)}
      type={type}
      id={type}
      placeholder={placeholder}
      className={cn(className)}
    />
  );
};

export default Input;
