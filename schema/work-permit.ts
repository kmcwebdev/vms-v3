import z from "zod";

const itemSchema = z.object({
  description: z.string(),
  qty: z.number(),
  unit: z.string(),
  remark: z.string(),
});

const workerSchema = z.object({
  name: z.string(),
  company: z.string(),
  description: z.string(),
});

const fillUpFormSchema = z.object({
  type: z.string(),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  name: z.string().min(1, "This field has to be filled."),
  workArea: z.string().min(1, { message: "This field has to be filled." }),
  site: z.string().min(1, { message: "This field has to be filled." }),
  floor: z.string().min(1, { message: "This field has to be filled." }),
  tenant: z.string().min(1, { message: "This field has to be filled." }),
  contractor: z.string().min(1, { message: "This field has to be filled." }),
  personInCharge: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  number: z.number(),
  date: z.string().date().min(1, { message: "This field has to be filled." }),
  startTime: z
    .string()
    .time()
    .min(1, { message: "This field has to be filled." }),
  endTime: z
    .string()
    .time()
    .min(1, { message: "This field has to be filled." }),
  workType: z.array(
    z.string().min(1, { message: "This field has to be filled." }),
  ),
  otherWorkType: z.string().min(1, { message: "This field has to be filled." }),
  workRequirements: z.array(
    z.string().min(1, { message: "This field has to be filled." }),
  ),
  otherWorkRequirements: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  emailsToNotify: z.array(
    z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
  ),
  scope: z.string().min(1, { message: "This field has to be filled." }),
  workers: z.array(workerSchema),
  items: z.array(itemSchema),
  files: z.instanceof(File)
});

export const workPermitSchema = z.object({
  fillUpForm: fillUpFormSchema,
});
