import z from "zod";

const itemSchema = z.object({
  description: z.string(),
  qty: z.string().optional(),
  unit: z.string().optional(),
  remarks: z.string().optional(),
});


const gatePassSchema = z.object({
  type: z.string(),
  email: z.string().email(),
  name: z.string(),
  serviceCategory: z.string(),
  site: z.string(),
  floor: z.string(),
  carrierName: z.string(),
  company: z.string(),
  dateRange: z.object({
    from: z.date(),
    to: z.date()
  }),
  reason: z.string().optional(),
  emailsToNotify: z
    .array(z.string().email("This is not a valid email."))
    .optional(),
  items: z.array(itemSchema).optional(),
  files: z.array(z.instanceof(File)).optional(),
});

export { gatePassSchema };
