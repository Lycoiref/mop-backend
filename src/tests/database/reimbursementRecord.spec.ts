import { PrismaClient, ReimbursementRecord } from '@prisma/client';
import { generateFakeReimburse } from '../../mock';
import { ReimbursementRecordWithoutId } from '../../types';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
  // 清空所有数据
  await prisma.reimbursementRecord.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
  // 清空所有数据
  await prisma.reimbursementRecord.deleteMany({});
});

describe('ReimburseRecord CRUD tests', () => {

  beforeEach(async () => {
    // 在每个测试之前，清空用户表数据
    await prisma.reimbursementRecord.deleteMany({});
  });

  test('should create a new ReimburseRecord', async () => {
    const oldReimburseRecord = generateFakeReimburse(1)[0]
    console.log(oldReimburseRecord)
    const newReimburseRecord = await prisma.reimbursementRecord.create({
      data: oldReimburseRecord
    });
    console.log(newReimburseRecord)

    expect(newReimburseRecord.applicantName).toBe(oldReimburseRecord.applicantName);
    expect(newReimburseRecord.seller).toBe(oldReimburseRecord.seller);
    expect(newReimburseRecord.taxPrice).toBe(oldReimburseRecord.taxPrice);
    expect(newReimburseRecord.billingDate).toStrictEqual(oldReimburseRecord.billingDate);
    expect(newReimburseRecord.status).toBe(oldReimburseRecord.status);
    expect(newReimburseRecord.approver).toBe(oldReimburseRecord.approver);
  });

  test('should get a ReimburseRecord by its id', async () => {
    const oldReimburseRecord: ReimbursementRecord = await prisma.reimbursementRecord.create({
      data: generateFakeReimburse(1)[0]
    })

    const newReimburseRecord: ReimbursementRecord | null = await prisma.reimbursementRecord.findUnique({
      where: {
        id: oldReimburseRecord.id
      }
    })


    if (newReimburseRecord !== null) {
      expect(newReimburseRecord.applicantName).toBe(oldReimburseRecord.applicantName);
      expect(newReimburseRecord.seller).toBe(oldReimburseRecord.seller);
      expect(newReimburseRecord.taxPrice).toBe(oldReimburseRecord.taxPrice);
      expect(newReimburseRecord.billingDate).toEqual(oldReimburseRecord.billingDate);
      expect(newReimburseRecord.status).toBe(oldReimburseRecord.status);
      expect(newReimburseRecord.approver).toBe(oldReimburseRecord.approver);
    } else {
      throw new Error("new ReimburseRecord shouldn't be null");
    }
  })

  test('should get all ReimburseRecords', async () => {
    let fakeReimburseRecords: Array<ReimbursementRecordWithoutId> = generateFakeReimburse(2)
    await prisma.reimbursementRecord.createMany({
      data: fakeReimburseRecords,
    });

    const ReimburseRecords = await prisma.reimbursementRecord.findMany();

    expect(ReimburseRecords.length).toBe(2);
    expect(ReimburseRecords[0].applicantName).toBe(fakeReimburseRecords[0].applicantName);
    expect(ReimburseRecords[1].approver).toBe(fakeReimburseRecords[1].approver);
  });

  test('should update a ReimburseRecord', async () => {
    let newFakeReimburseRecord = generateFakeReimburse(1)[0]
    const newReimburseRecord = await prisma.reimbursementRecord.create({
      data: newFakeReimburseRecord,
    });

    const updateReimburseRecord = await prisma.reimbursementRecord.update({
      where: { id: newReimburseRecord.id },
        data: { applicantName: 'New Name' },
    });

    expect(updateReimburseRecord.applicantName).toBe('New Name');
  });

  test('should delete a device', async () => {
    let newFakeReimburseRecord = generateFakeReimburse(1)[0]
    const newReimburseRecord = await prisma.reimbursementRecord.create({
      data: newFakeReimburseRecord,
    });

    const tmpReimburseRecords = await prisma.reimbursementRecord.findMany();
    expect(tmpReimburseRecords.length).toBe(1);

    await prisma.reimbursementRecord.delete({
      where: { id: newReimburseRecord.id },
    });

    const ReimburseRecords = await prisma.reimbursementRecord.findMany();

    expect(ReimburseRecords.length).toBe(0);
  });
});
