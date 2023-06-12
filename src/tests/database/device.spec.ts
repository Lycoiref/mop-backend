import { PrismaClient, Device } from '@prisma/client';
import { generateFakeDevice } from '../../mock';
import { DeviceWithoutId } from '../../types';
import { addDevice, deleteDeviceById, getAllDevice, updateDeviceById } from '../../utils/request/modules/device';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
  // 清空所有数据
  await prisma.device.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
  // 清空所有数据
  await prisma.device.deleteMany({});
});

describe('device CRUD tests', () => {

  beforeEach(async () => {
    // 在每个测试之前，清空用户表数据
    await prisma.device.deleteMany({});
  });

  test('should create a new device', async () => {
    const oldDevice = generateFakeDevice(1)[0]
    const newDevice = await prisma.device.create({
      data: oldDevice
    });

    expect(newDevice.deviceKind).toBe(oldDevice.deviceKind);
    expect(newDevice.deviceName).toBe(oldDevice.deviceName);
    expect(newDevice.deviceAddress).toBe(oldDevice.deviceAddress);
    expect(newDevice.deviceQrcode).toBe(oldDevice.deviceQrcode);
  });

  test('should get a device by its id', async () => {
    const oldDevice: Device = await prisma.device.create({
      data: generateFakeDevice(1)[0]
    })

    const newDevice: Device | null = await prisma.device.findUnique({
      where: {
        id: oldDevice.id
      }
    })


    if (newDevice !== null) {
      expect(newDevice.deviceKind).toBe(oldDevice.deviceKind);
      expect(newDevice.deviceName).toBe(oldDevice.deviceName);
      expect(newDevice.deviceAddress).toBe(oldDevice.deviceAddress);
      expect(newDevice.deviceQrcode).toBe(oldDevice.deviceQrcode);
    } else {
      throw new Error("new device shouldn't be null");
    }
  })

  test('should get all devices', async () => {
    let fakeDevices: Array<DeviceWithoutId> = generateFakeDevice(2)
    await prisma.device.createMany({
      data: fakeDevices,
    });

    const devices = await prisma.device.findMany();

    expect(devices.length).toBe(2);
    expect(devices[0].deviceKind).toBe(fakeDevices[0].deviceKind);
    expect(devices[1].deviceQrcode).toBe(fakeDevices[1].deviceQrcode);
  });

  test('should update a device', async () => {
    let newFakeDevice = generateFakeDevice(1)[0]
    const newDevice = await prisma.device.create({
      data: newFakeDevice,
    });

    newDevice.deviceName = 'New Name'

    const updateDevice = (await updateDeviceById(newDevice.id, newDevice)).data

    expect(updateDevice.deviceName).toBe('New Name');
  });

  test('should delete a device', async () => {
    let newFakeDevice = generateFakeDevice(1)[0]
    const newDevice = (await addDevice(newFakeDevice)).data

    const tmpDevices = (await getAllDevice()).data;
    expect(tmpDevices.length).toBe(1);

    await deleteDeviceById(newDevice.id)

    const devices = (await getAllDevice()).data;

    expect(devices.length).toBe(0);
  });
});
