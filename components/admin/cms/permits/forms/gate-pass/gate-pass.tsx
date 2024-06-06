"use client";

import Form from "../../../../../global/form";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { GatePass } from "@/types/gate-pass";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Part1 from "./steps/part1";
import Part2 from "./steps/part2";
import Part3 from "./steps/part3";
import FileUpload from "@/components/ui/file-upload";

const GatePassForm = () => {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const gatePassForm = useForm<GatePass>({});

  const router = useRouter();

  const onFormSubmit = (data: any) => {
    console.log("submitted", gatePassForm.getValues());
    gatePassForm.reset();
    router.push("/cms/permits?tab=default/");
  };

  return (
    <div className="rounded-md p-4">
      <h2 className="mb-4 text-lg font-bold">Gate Pass Form</h2>
      <Form
        name="gate-pass"
        useFormReturn={gatePassForm}
        onSubmit={onFormSubmit}
      >
        <Accordion
          onPointerLeaveCapture={null}
          onPointerEnterCapture
          placeholder={null}
          open={open === 1}
        >
          <AccordionHeader
            className="text-sm font-medium"
            onClick={() => handleOpen(1)}
            onPointerLeaveCapture={null}
            onPointerEnterCapture
            placeholder={null}
          >
            Part 1 (Personal Information)
          </AccordionHeader>
          <AccordionBody>
            <Part1 />
          </AccordionBody>
        </Accordion>

        <Accordion
          onPointerLeaveCapture={null}
          onPointerEnterCapture
          placeholder={null}
          open={open === 2}
        >
          <AccordionHeader
            className="text-sm font-medium"
            onClick={() => handleOpen(2)}
            onPointerLeaveCapture={null}
            onPointerEnterCapture
            placeholder={null}
          >
            Part 2 (Work Details)
          </AccordionHeader>
          <AccordionBody>
            <Part2 />
          </AccordionBody>
        </Accordion>

        <Accordion
          onPointerLeaveCapture={null}
          onPointerEnterCapture
          placeholder={null}
          open={open === 3}
        >
          <AccordionHeader
            className="text-sm font-medium"
            onClick={() => handleOpen(3)}
            onPointerLeaveCapture={null}
            onPointerEnterCapture
            placeholder={null}
          >
            Part 3 (Additional Information)
          </AccordionHeader>
          <AccordionBody>
            <Part3 />
          </AccordionBody>
        </Accordion>

        {/* Attach File and Submit Buttons */}
        <div className="mt-5 flex flex-row justify-between">
          <FileUpload />
          <Button
            onSubmit={onFormSubmit}
            type="submit"
            className="mt-4 max-h-11 rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-orange-500"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default GatePassForm;
