import z from "zod";

const itemSchema = z.object({
  description: z.string(),
  qty: z.string(),
  unit: z.string(),
  remarks: z.string(),
});

const workerSchema = z.object({
  name: z.string(),
  company: z.string(),
  description: z.string(),
});

const workPermitSchema = z.object({
  type: z.string(),
  email: z.string().email(),
  name: z.string(),
  workArea: z.string(),
  site: z.string(),
  floor: z.string(),
  tenant: z.string(),
  contractor: z.string(),
  personInCharge: z.string(),
  number: z.string(),
  dateRange: z.object({
    from: z.date(),
    to: z.date()
  }),
  // timeRange: z.string(),
  workTypes: z.array(z.string()),
  otherWorkTypes: z.string().optional(),
  workRequirements: z.array(z.string()),
  otherWorkRequirements: z.string().optional(),
  emailsToNotify: z
    .array(z.string().email("This is not a valid email."))
    .optional(),
  scope: z.string().optional(),
  workers: z.array(workerSchema).optional(),
  items: z.array(itemSchema).optional(),
  files: z.array(z.instanceof(File)).optional(),
});

export { workPermitSchema };
