import { 
    Device,
    User,
    RepairForm,
    HistoricalRepairRecord,
    ReimbursementRecord,
} from "@prisma/client"

export type DeviceInput = Partial<Device>
export type UserInput = Partial<User>
export type RepairFormInput = Partial<RepairForm>
export type HistoricalRepairRecordInput = Partial<HistoricalRepairRecord>
export type ReimbursementRecordInput = Partial<ReimbursementRecord>