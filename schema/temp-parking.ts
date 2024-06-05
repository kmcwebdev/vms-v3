import z from "zod";

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
  date: z.string().date().min(1, { message: "This field has to be filled." }),
  startTime: z
    .string()
    .time()
    .min(1, { message: "This field has to be filled." }),
  endTime: z
    .string()
    .time()
    .min(1, { message: "This field has to be filled." }),
  managerEmail: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  files: z.instanceof(File),
});
