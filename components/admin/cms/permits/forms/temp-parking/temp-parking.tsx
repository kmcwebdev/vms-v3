import { Form } from "@/components/ui/form";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
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
import { useFormState, useFormStatus } from "react-dom";

const accordionData = [
  {id: 1, title: "Part 1 (Personal Information)", Component: Part1},
  {id: 2, title: "Part 2 (Vehicle Information)", Component: Part2}
]

export async function FormSubmit(
  prevState: any,
  values: z.infer<typeof tempParkingSchema>,
) {
  console.log("PERMIT VALUES", { values });
  try {
    const res = await fetch("/api/post-temp-parking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.statusText}`);
    }

    const data = await res.json();
    redirect('/cms');
    return data;
  } catch (error) {
    console.error("Submission error:", error);
  }
}

const TempParkingForm = () => {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const [state, handleSubmit] = useFormState(FormSubmit, "");
  const { pending } = useFormStatus();

  const form = useForm<z.infer<typeof tempParkingSchema>>({
    resolver: zodResolver(tempParkingSchema),
  });

  const router = useRouter();

  const handleError = (errors: any) => {
    console.log("Validation errors:", errors); 
  };

  return (
    <div className="rounded-md p-4">
      <h2 className="mb-4 text-lg font-bold">Temporary Parking Form</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, handleError)}>
        <div className="text/md text-green-500">{state.message}</div>
          {accordionData.map(({id, title, Component}) => (
            <Accordion
              key={id}
              placeholder={null}
              onPointerEnterCapture
              onPointerLeaveCapture
              open={open===id}
            >
              <AccordionHeader
                placeholder={null}
                onPointerEnterCapture
                onPointerLeaveCapture
                className="text-sm font-medium"
                onClick={() => handleOpen(id)}
              >
                {title}
              </AccordionHeader>
              <AccordionBody>
                <Component formControl={form} />
              </AccordionBody>
            </Accordion>
          ))}

          {/* Attach File and Submit Buttons */}
          <div className="mt-5 flex flex-row justify-between">
            <FileUpload formControl={form} />
            <Button
              aria-disabled={pending}
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
