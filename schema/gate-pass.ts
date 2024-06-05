import z from "zod";

const itemSchema = z.object({
  description: z.string().optional(),
  qty: z.number().optional(),
  unit: z.string().optional(),
  remark: z.string().optional(),
});

const fillUpFormSchema = z.object({
  type: z.string(),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  name: z.string().min(1, "This field has to be filled."),
  serviceCategory: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  site: z.string().min(1, { message: "This field has to be filled." }),
  floor: z.string().min(1, { message: "This field has to be filled." }),
  carrierName: z.string().min(1, { message: "This field has to be filled." }),
  company: z.string().min(1, { message: "This field has to be filled." }),
  date: z.string().date().min(1, { message: "This field has to be filled." }),
  startTime: z
    .string()
    .time()
    .min(1, { message: "This field has to be filled." }),
  endTime: z
    .string()
    .time()
    .min(1, { message: "This field has to be filled." }),
  reason: z.string().optional(),
  emailsToNotify: z.array(
    z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email.")
      .optional()
  ).optional(),
  items: z.array(itemSchema).optional(),
  files: z.array(z.instanceof(File)).optional(),
});

export const gatePassSchema = z.object({
  fillUpForm: fillUpFormSchema,
});
