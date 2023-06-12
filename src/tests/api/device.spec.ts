import { PrismaClient, Device } from '@prisma/client';
import { generateFakeDevice } from '../../mock';
import { DeviceWithoutId } from '../../types';
import { addDevice, getAllDevice } from '../../utils/request/modules/device';

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

    let newDevice: Device
    await addDevice(oldDevice).then(res => {
        newDevice = res.data
        expect(newDevice.deviceKind).toBe(oldDevice.deviceKind);
        expect(newDevice.deviceName).toBe(oldDevice.deviceName);
        expect(newDevice.deviceAddress).toBe(oldDevice.deviceAddress);
        expect(newDevice.deviceQrcode).toBe(oldDevice.deviceQrcode);
    })
  });

  test('should get a device by its id', async () => {
    let oldDevice: Device = generateFakeDevice(1)[0]
    const newDevice: Device = (await addDevice(oldDevice)).data

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
    let fakeDevice1: Device = generateFakeDevice(1)[0]
    let fakeDevice2: Device = generateFakeDevice(1)[0]
    await addDevice(fakeDevice1)
    await addDevice(fakeDevice2)

    const devices = (await getAllDevice()).data;

    expect(devices.length).toBe(2);
    expect(devices[0].deviceKind).toBe(fakeDevice1.deviceKind);
    expect(devices[1].deviceQrcode).toBe(fakeDevice2.deviceQrcode);
  });

  test('should update a device', async () => {
    let newFakeDevice = generateFakeDevice(1)[0]
    const newDevice = (await addDevice(newFakeDevice)).data

    
    const updateDevice = await prisma.device.update({
      where: { id: newDevice.id },
      data: { deviceName: 'New Name' },
    });

    expect(updateDevice.deviceName).toBe('New Name');
  });

});
