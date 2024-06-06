import z from 'zod'
import { gatePassSchema } from '@/schema/gate-pass'

type GatePass = z.infer<typeof gatePassSchema>

export type {
    GatePass
}