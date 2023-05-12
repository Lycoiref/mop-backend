import { 
    device as Device,
    user as User,
    repair_form as RepairForm,
    historical_repair_record as HistoricalRepairRecord,
    reimbursement_record as ReimbursementRecord,

} from "@prisma/client"

export type DeviceInput = Partial<Device>
export type UserInput = Partial<User>
export type RepairFormInput = Partial<RepairForm>
export type HistoricalRepairRecordInput = Partial<HistoricalRepairRecord>
export type ReimbursementRecordInput = Partial<ReimbursementRecord>