import type { UseFormReturn } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import Combobox from "./combo-box";
import Input from "./input";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
  useFormReturn: UseFormReturn<any, object>;
  onSubmit: (data: any) => void;
  name: string;
}

const Form: React.FC<FormProps> = ({
  children,
  className,
  useFormReturn,
  onSubmit,
  name,
}) => {
  const { handleSubmit } = useFormReturn;

  return (
    <FormProvider {...useFormReturn}>
      <form name={name} className={className} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Object.assign(Form, {
  Combobox,
  Input,
});
