import { Input as InputComponent } from "@/components/ui/input";
import { useFormContext, Controller } from "react-hook-form";

interface IInputProps {
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
}

const Input = ({ name, type, placeholder }: IInputProps) => {
  const { control, register } = useFormContext();

  return (
    <InputComponent
      type={type}
      id={type}
      placeholder={placeholder}
      {...register(name)}
    />
  );
};

export default Input;
