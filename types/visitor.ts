import z from 'zod'
import { visitorSchema } from '@/schema/visitor'

type Visitor = z.infer<typeof visitorSchema>

type TotalVisitorOnAllSites = {
    total_visitors: string
}[]

type VisitorQueryParams = {
    pageSize?: number,
    pageNumber?: number,
    filter?:string | undefined | null
    site?:string | undefined | null
}


export type {
    TotalVisitorOnAllSites,
    Visitor,
    VisitorQueryParams
}