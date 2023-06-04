import { PrismaClient, HistoricalRepairRecord } from '@prisma/client';
import { generateFakeHistoricalRepairRecord } from '../mock';
import { HistoricalRepairRecordWithoutId } from '../types';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
  // 清空所有数据
  await prisma.historicalRepairRecord.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
  // 清空所有数据
  await prisma.historicalRepairRecord.deleteMany({});
});

describe('historicalRepairRecord CRUD tests', () => {

  beforeEach(async () => {
    // 在每个测试之前，清空用户表数据
    await prisma.historicalRepairRecord.deleteMany({});
  });

  test('should create a new historicalRepairRecord', async () => {
    const oldHistoricalRepairRecord = generateFakeHistoricalRepairRecord(1)[0]
    const newHistoricalRepairRecord = await prisma.historicalRepairRecord.create({
      data: oldHistoricalRepairRecord
    });

    expect(newHistoricalRepairRecord.deviceName).toBe(oldHistoricalRepairRecord.deviceName);
    expect(newHistoricalRepairRecord.repairPerson).toBe(oldHistoricalRepairRecord.repairPerson);
    expect(newHistoricalRepairRecord.repairAddress).toBe(oldHistoricalRepairRecord.repairAddress);
    expect(newHistoricalRepairRecord.repairReason).toBe(oldHistoricalRepairRecord.repairReason);
    expect(newHistoricalRepairRecord.commentStatus).toBe(oldHistoricalRepairRecord.commentStatus);
  });

  test('should get a historicalRepairRecord by its id', async () => {
    const oldHistoricalRepairRecord: HistoricalRepairRecord = await prisma.historicalRepairRecord.create({
      data: generateFakeHistoricalRepairRecord(1)[0]
    })

    const newHistoricalRepairRecord: HistoricalRepairRecord | null = await prisma.historicalRepairRecord.findUnique({
      where: {
        id: oldHistoricalRepairRecord.id
      }
    })


    if (newHistoricalRepairRecord !== null) {
        expect(newHistoricalRepairRecord.deviceName).toBe(oldHistoricalRepairRecord.deviceName);
        expect(newHistoricalRepairRecord.repairPerson).toBe(oldHistoricalRepairRecord.repairPerson);
        expect(newHistoricalRepairRecord.repairAddress).toBe(oldHistoricalRepairRecord.repairAddress);
        expect(newHistoricalRepairRecord.repairReason).toBe(oldHistoricalRepairRecord.repairReason);
        expect(newHistoricalRepairRecord.commentStatus).toBe(oldHistoricalRepairRecord.commentStatus);
    } else {
      throw new Error("new historicalRepairRecord shouldn't be null");
    }
  })

  test('should get all historicalRepairRecords', async () => {
    let fakeHistoricalRepairRecords: Array<HistoricalRepairRecordWithoutId> = generateFakeHistoricalRepairRecord(2)
    await prisma.historicalRepairRecord.createMany({
      data: fakeHistoricalRepairRecords,
    });

    const historicalRepairRecords = await prisma.historicalRepairRecord.findMany();

    expect(historicalRepairRecords.length).toBe(2);
    expect(historicalRepairRecords[0].deviceName).toBe(fakeHistoricalRepairRecords[0].deviceName);
    expect(historicalRepairRecords[1].repairAddress).toBe(fakeHistoricalRepairRecords[1].repairAddress);
  });

  test('should update a historicalRepairRecord', async () => {
    let newFakeHistoricalRepairRecord = generateFakeHistoricalRepairRecord(1)[0]
    const newHistoricalRepairRecord = await prisma.historicalRepairRecord.create({
      data: newFakeHistoricalRepairRecord,
    });

    const updateHistoricalRepairRecord = await prisma.historicalRepairRecord.update({
      where: { id: newHistoricalRepairRecord.id },
      data: { deviceName: 'New Name' },
    });

    expect(updateHistoricalRepairRecord.deviceName).toBe('New Name');
  });

  test('should delete a device', async () => {
    let newFakeHistoricalRepairRecord = generateFakeHistoricalRepairRecord(1)[0]
    const newHistoricalRepairRecord = await prisma.historicalRepairRecord.create({
      data: newFakeHistoricalRepairRecord,
    });

    const tmpHistoricalRepairRecords = await prisma.historicalRepairRecord.findMany();
    expect(tmpHistoricalRepairRecords.length).toBe(1);

    await prisma.historicalRepairRecord.delete({
      where: { id: newHistoricalRepairRecord.id },
    });

    const historicalRepairRecords = await prisma.historicalRepairRecord.findMany();

    expect(historicalRepairRecords.length).toBe(0);
  });
});
