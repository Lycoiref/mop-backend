import { faker } from '@faker-js/faker';
import generateFakeData from './utils';

// 生成虚拟用户数据
export const generateFakeHistoricalRepairRecord = () => {
  const deviceName = faker.lorem.word()
  const repairPerson = faker.person.firstName()
  const repairAddress = faker.location.streetAddress()
  const repairReason = faker.lorem.sentence()
  const commentStatus = Math.random() < 0.5

  return {
    deviceName,
    repairPerson,
    repairAddress,
    repairReason,
    commentStatus
  };
};

const fakeHistoricalRepairRecords = generateFakeData(generateFakeHistoricalRepairRecord, 10);
console.log(fakeHistoricalRepairRecords)