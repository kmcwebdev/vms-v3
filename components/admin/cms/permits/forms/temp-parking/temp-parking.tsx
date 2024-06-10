import { Form } from "@/components/ui/form";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Part1 from "./steps/part1";
import Part2 from "./steps/part2";
import FileUpload from "@/components/ui/file-upload";
import { tempParkingSchema } from "@/schema/temp-parking";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const TempParkingForm = () => {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const form = useForm<z.infer<typeof tempParkingSchema>>({
    resolver: zodResolver(tempParkingSchema),
  });

  const router = useRouter();

  const handleSubmit = (values: z.infer<typeof tempParkingSchema>) => {
    console.log("PERMIT VALUES", { values });
  };

  const handleError = (errors: any) => {
    console.log("Validation errors:", errors); // Log validation errors
  };

  return (
    <div className="rounded-md p-4">
      <h2 className="mb-4 text-lg font-bold">Temporary Parking Form</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, handleError)}>
          <Accordion open={open === 1}>
            <AccordionHeader
              className="text-sm font-medium"
              onClick={() => handleOpen(1)}
            >
              Part 1 (Personal Details)
            </AccordionHeader>
            <AccordionBody>
              <Part1 formControl={form} />
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2}>
            <AccordionHeader
              className="text-sm font-medium"
              onClick={() => handleOpen(2)}
            >
              Part 2 (Vehicle Details)
            </AccordionHeader>
            <AccordionBody>
              <Part2 formControl={form}/>
            </AccordionBody>
          </Accordion>

          {/* Attach File and Submit Buttons */}
          <div className="mt-5 flex flex-row justify-between">
            <FileUpload formControl={form} />
            <Button
              type="submit"
              className="mt-4 max-h-11 rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-orange-500"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TempParkingForm;
