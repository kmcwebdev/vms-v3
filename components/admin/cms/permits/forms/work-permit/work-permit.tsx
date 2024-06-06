import Form from "../../../../../global/form";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Visitor } from "@/types/visitor";
import { XIcon } from "lucide-react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import Part1 from "./steps/part1";
import Part2 from "./steps/part2";
import Part3 from "./steps/part3";
import FileUpload from "@/components/ui/file-upload";

const WorkPermitForm = () => {
  const [attachedFiles, setAttachedFiles] = React.useState<File[]>([]);
  const [fileError, setFileError] = React.useState<string | null>(null);

  const [open, setOpen] = React.useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const visitorsForm = useForm<Visitor>({});
  const router = useRouter();

  const onFormSubmit = (data: any) => {
    router.push("/cms");
  };

  return (
    <div className="rounded-md p-4">
      <h2 className="mb-4 text-lg font-bold">Work Permit Form</h2>
      <Form
        name="work-permit"
        useFormReturn={visitorsForm}
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
            Part 3 (Further Information)
          </AccordionHeader>
          <AccordionBody>
            <Part3 />
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

export default WorkPermitForm;
