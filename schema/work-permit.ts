import z from "zod";

const itemSchema = z.object({
  description: z.string().optional(),
  qty: z.number().optional(),
  unit: z.string().optional(),
  remark: z.string().optional(),
});

const workerSchema = z.object({
  name: z.string().optional(),
  company: z.string().optional(),
  description: z.string().optional(),
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
  otherWorkType: z.string().min(1, { message: "This field has to be filled." }).optional(),
  workRequirements: z.array(
    z.string().min(1, { message: "This field has to be filled." }),
  ),
  otherWorkRequirements: z
    .string()
    .min(1, { message: "This field has to be filled." }).optional(),
  emailsToNotify: z.array(
    z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email.")
      .optional()
  ).optional(),
  scope: z.string().min(1, { message: "This field has to be filled." }).optional(),
  workers: z.array(workerSchema).optional(),
  items: z.array(itemSchema).optional(),
  files: z.array(z.instanceof(File)).optional()
});

export const workPermitSchema = z.object({
  fillUpForm: fillUpFormSchema,
});
