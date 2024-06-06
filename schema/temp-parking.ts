import z from "zod";

const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;

const fillUpFormSchema = z.object({
  type: z.string(),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  name: z.string().min(1, "This field has to be filled."),
  site: z.string().min(1, { message: "This field has to be filled." }),
  floor: z.string().min(1, { message: "This field has to be filled." }),
  driverName: z.string().min(1, { message: "This field has to be filled." }),
  vehicleModel: z.string().min(1, { message: "This field has to be filled." }),
  vehicleColor: z.string().min(1, { message: "This field has to be filled." }),
  vehicleNumber: z.number(),
  parkingNumber: z.number(),
  date: z.date(),
  startTime: z.string().refine(val => timeRegex.test(val), {
    message: "Invalid time format. Expected HH:MM."
  }),
  endTime: z.string().refine(val => timeRegex.test(val), {
    message: "Invalid time format. Expected HH:MM."
  }),
  managerEmail: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
    files: z.array(z.instanceof(File)).optional()
});

export const gatePassSchema = z.object({
  fillUpForm: fillUpFormSchema,
});
