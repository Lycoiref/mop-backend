import { Device } from "@prisma/client";
import request from "./instance";

export const addDevice = (body: Device) => request.post(
    '/device',
    body
)

export const deleteDeviceById = (id: number) => request.delete(`/device/${id}`)

export const updateDeviceById = (id: number, device: Device) => request.put(
    `/device/${id}`,
    device
)

export const getAllDevice = () => request.get('/device')

export const getDeviceById = (id: number) => request.get(`/device/${id}`)