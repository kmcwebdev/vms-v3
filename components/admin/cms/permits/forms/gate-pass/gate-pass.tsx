"use client";

import { Form } from "@/components/ui/form";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Part1 from "./steps/part1";
import Part2 from "./steps/part2";
import Part3 from "./steps/part3";
import FileUpload from "@/components/ui/file-upload";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { gatePassSchema } from "@/schema/gate-pass";
import { useFormState, useFormStatus } from "react-dom";

export async function FormSubmit(
  prevState: any,
  values: z.infer<typeof gatePassSchema>,
) {
  console.log("PERMIT VALUES", { values });
  try {
    const res = await fetch("/api/post-gate-pass", {
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
    return data;
  } catch (error) {
    console.error("Submission error:", error);
  }
}

const GatePassForm = () => {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const [state, handleSubmit] = useFormState(FormSubmit, "");
  const { pending } = useFormStatus();

  const form = useForm<z.infer<typeof gatePassSchema>>({
    resolver: zodResolver(gatePassSchema),
  });

  const handleError = (errors: any) => {
    console.log("Validation errors:", errors); 
  };

  return (
    <div className="rounded-md p-4">
      <h2 className="mb-4 text-lg font-bold">Gate Pass Form</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, handleError)}>
          {/* <div className="text-green-500 text/md">{state.message}</div> */}
          <Accordion
            placeholder={null}
            onPointerEnterCapture
            onPointerLeaveCapture
            open={open === 1}
          >
            <AccordionHeader
              placeholder={null}
              onPointerEnterCapture
              onPointerLeaveCapture
              className="text-sm font-medium"
              onClick={() => handleOpen(1)}
            >
              Part 1 (Personal Information)
            </AccordionHeader>
            <AccordionBody>
              <Part1 formControl={form} />
            </AccordionBody>
          </Accordion>

          <Accordion
            placeholder={null}
            onPointerEnterCapture
            onPointerLeaveCapture
            open={open === 2}
          >
            <AccordionHeader
              placeholder={null}
              onPointerEnterCapture
              onPointerLeaveCapture
              className="text-sm font-medium"
              onClick={() => handleOpen(2)}
            >
              Part 2 (Work Details)
            </AccordionHeader>
            <AccordionBody>
              <Part2 formControl={form} />
            </AccordionBody>
          </Accordion>

          <Accordion
            placeholder={null}
            onPointerEnterCapture
            onPointerLeaveCapture
            open={open === 3}
          >
            <AccordionHeader
              placeholder={null}
              onPointerEnterCapture
              onPointerLeaveCapture
              className="text-sm font-medium"
              onClick={() => handleOpen(3)}
            >
              Part 3 (Additional Information)
            </AccordionHeader>
            <AccordionBody>
              <Part3 formControl={form} />
            </AccordionBody>
          </Accordion>

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

export default GatePassForm;
