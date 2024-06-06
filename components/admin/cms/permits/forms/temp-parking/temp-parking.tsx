import Form from "../../../../../global/form";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Visitor } from "@/types/visitor";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Part1 from "./steps/part1";
import Part2 from "./steps/part2";
import FileUpload from "@/components/ui/file-upload";

const TempParkingForm = () => {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const tempParkingForm = useForm<Visitor>({});
  const router = useRouter();

  const onFormSubmit = (data: any) => {
    router.push("/cms");
  };

  return (
    <div className="rounded-md p-4">
      <h2 className="mb-4 text-lg font-bold">Temporary Parking Form</h2>
      <Form
        name="gate-pass"
        useFormReturn={tempParkingForm}
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
            Part 1 (Personal Details)
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
            Part 2 (Vehicle Details)
          </AccordionHeader>
          <AccordionBody>
            <Part2 />
          </AccordionBody>
        </Accordion>

        {/* Attach File and Submit Buttons */}
        <div className="mt-5 flex flex-row justify-between">
          <FileUpload />
          <Button
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

export default TempParkingForm;
