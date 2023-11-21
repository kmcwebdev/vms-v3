import z from 'zod'

const fillUpFormSchema = z.object({
    lastName: z.string().min(1, {message: 'Last name must be at least 1 character'}),
    firstName: z.string().min(1, {message: 'First name must be at least 1 character'}),
    email: z.string().min(1, {message: 'Email must be at least 1 character'}),
    companyToVisit: z.string(),
    personToVisit: z.string(),
    reasonToVisit: z.string()
})

const snapShotSchema = z.string()

export const visitorSchema = z.object({
   fillUpForm: fillUpFormSchema,
    snapShot: snapShotSchema
})


