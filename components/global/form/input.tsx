import { Input as InputComponent } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    // <Controller
    //   name={name}
    //   control={control}
    //   render={({field})=>(
    //     <div className="grid w-full max-w-sm items-center gap-1.5">
    //     <Label htmlFor="email">Email</Label>
    //     <InputComponent type="email" id="email" placeholder="Email" />
    //   </div>
    //   )}
    // />
  );
};

export default Input;
