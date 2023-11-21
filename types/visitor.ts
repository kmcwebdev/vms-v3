import z from 'zod'
import { visitorSchema } from '@/schema/visitor'

type Visitor = z.infer<typeof visitorSchema>

type TotalVisitorOnAllSites = {
    total_visitors: string
}[]


export type {
    TotalVisitorOnAllSites,
    Visitor
}