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

export type DeviceWithoutId = Omit<Device, "id"> & { id?: number }
export type UserWithoutId = Omit<User, "id"> & { id?: number }
export type RepairFormWithoutIds = Omit<RepairForm, "id" | "deviceId" | "userId"> & { id?: number }
export type HistoricalRepairRecordWithoutId = Omit<HistoricalRepairRecord, "id"> & { id?: number }
export type ReimbursementRecordWithoutId = Omit<ReimbursementRecord, "id"> & { id?: number }