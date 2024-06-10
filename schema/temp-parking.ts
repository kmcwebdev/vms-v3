import z from "zod";

const tempParkingSchema = z.object({
  type: z.string(),
  email: z.string().email(),
  name: z.string(),
  site: z.string(),
  floor: z.string(),
  driverName: z.string(),
  vehicleModel: z.string(),
  vehicleColor: z.string(),
  vehicleNumber: z.string(),
  parkingNumber: z.string(),
  dateRange: z.object({
    from: z.date(),
    to: z.date()
  }),
  managerEmail: z.string().email(),
  files: z.array(z.instanceof(File)).optional(),
});

export { tempParkingSchema };
