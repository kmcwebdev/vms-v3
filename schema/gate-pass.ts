import z from "zod";


const itemSchema = z.object({
  description: z.string().optional(),
  qty: z.number().optional(),
  unit: z.string().optional(),
  remark: z.string().optional(),
});

const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;

const gatePassSchema = z.object({
  type: z.string(),
  email: z.string().email(),
  name: z.string().min(1, "This field has to be filled."),
  serviceCategory: z.string(),
  site: z.string().min(1, { message: "This field has to be filled." }),
  floor: z.string().min(1, { message: "This field has to be filled." }),
  carrierName: z.string().min(1, { message: "This field has to be filled." }),
  company: z.string().min(1, { message: "This field has to be filled." }),
  dateRange: z.string(),
  // startDate: z.date(),
  // endDate: z.date(),
  // startTime: z.string().refine(val => timeRegex.test(val), {
  //   message: "Invalid time format. Expected HH:MM."
  // }),
  // endTime: z.string().refine(val => timeRegex.test(val), {
  //   message: "Invalid time format. Expected HH:MM."
  // }),
  reason: z.string().optional(),
  // emailsToNotify: z
  // .array(
  //   z
  //     .string()
  //     .email("This is not a valid email.")
  // )
  // .optional(),
  // items: z.array(itemSchema).optional(),
  // files: z.array(z.instanceof(File)).optional(),
});

export {gatePassSchema}

