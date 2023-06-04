import { Device, PrismaClient, RepairForm, User } from '@prisma/client';
import { generateFakeDevice, generateFakeRepairForm, generateFakeUser } from '../mock';
import { RepairFormWithoutIds } from '../types';

const prisma = new PrismaClient();

let user: User
let device: Device

beforeAll(async () => {
  await prisma.$connect();
  // 清空所有数据
  await prisma.repairForm.deleteMany({});
  // 由于有外键约束，因此要先为其他表格创建数据
  user = await prisma.user.create({
    data: generateFakeUser(1)[0]
  })
  device = await prisma.device.create({
    data: generateFakeDevice(1)[0]
  })
});

afterAll(async () => {
  await prisma.$disconnect();
  // 清空所有数据
  await prisma.repairForm.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.device.deleteMany({});
});

describe('repairForm CRUD tests', () => {

  beforeEach(async () => {
    // 在每个测试之前，清空用户表数据
    await prisma.repairForm.deleteMany({});
  });

  test('should create a new repairForm', async () => {
    const oldRepairForm = generateFakeRepairForm(1)[0]
    oldRepairForm.userId = user.id
    oldRepairForm.deviceId = device.id
    const newRepairForm = await prisma.repairForm.create({
      data: oldRepairForm
    });

    expect(newRepairForm.deviceId).toBe(oldRepairForm.deviceId);
    expect(newRepairForm.userId).toBe(oldRepairForm.userId);
    expect(newRepairForm.faultDesc).toBe(oldRepairForm.faultDesc);
    expect(newRepairForm.faultPic).toBe(oldRepairForm.faultPic);
    expect(newRepairForm.doorTime).toStrictEqual(oldRepairForm.doorTime);
  });

  test('should get a repairForm by its id', async () => {
    let tmpRepairForm = generateFakeRepairForm(1)[0]
    tmpRepairForm.userId = user.id
    tmpRepairForm.deviceId = device.id
    const oldRepairForm: RepairForm = await prisma.repairForm.create({
      data: tmpRepairForm
    })

    const newRepairForm: RepairForm | null = await prisma.repairForm.findUnique({
      where: {
        id: oldRepairForm.id
      }
    })


    if (newRepairForm !== null) {
      expect(newRepairForm.deviceId).toBe(oldRepairForm.deviceId);
      expect(newRepairForm.userId).toBe(oldRepairForm.userId);
      expect(newRepairForm.faultDesc).toBe(oldRepairForm.faultDesc);
      expect(newRepairForm.faultPic).toBe(oldRepairForm.faultPic);
      expect(newRepairForm.doorTime).toStrictEqual(oldRepairForm.doorTime);
    } else {
      throw new Error("new repairForm shouldn't be null");
    }
  })

  test('should get all repairForms', async () => {
    let fakeRepairForms: Array<RepairForm> = generateFakeRepairForm(2)
    // 添加外键约束
    fakeRepairForms.map((item) => {
      item.userId = user.id
      item.deviceId = device.id
    })
    await prisma.repairForm.createMany({
      data: fakeRepairForms,
    });

    const repairForms = await prisma.repairForm.findMany();

    expect(repairForms.length).toBe(2);
    expect(repairForms[0].userId).toBe(fakeRepairForms[0].userId);
    expect(repairForms[1].faultDesc).toBe(fakeRepairForms[1].faultDesc);
  });

  test('should update a repairForm', async () => {
    let newFakeRepairForm = generateFakeRepairForm(1)[0]
    newFakeRepairForm.userId = user.id
    newFakeRepairForm.deviceId = device.id
    const newRepairForm = await prisma.repairForm.create({
      data: newFakeRepairForm,
    });

    const updateRepairForm = await prisma.repairForm.update({
      where: { id: newRepairForm.id },
      data: { faultDesc: 'New Name' },
    });

    expect(updateRepairForm.faultDesc).toBe('New Name');
  });

  test('should delete a device', async () => {
    let newFakeRepairForm = generateFakeRepairForm(1)[0]
    newFakeRepairForm.userId = user.id
    newFakeRepairForm.deviceId = device.id
    const newRepairForm = await prisma.repairForm.create({
      data: newFakeRepairForm,
    });

    const tmpRepairForms = await prisma.repairForm.findMany();
    expect(tmpRepairForms.length).toBe(1);

    await prisma.repairForm.delete({
      where: { id: newRepairForm.id },
    });

    const repairForms = await prisma.repairForm.findMany();

    expect(repairForms.length).toBe(0);
  });
});
