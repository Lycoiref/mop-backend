import { faker } from "@faker-js/faker";
import { generateFakeData } from './utils';
import { ReimbursementRecordWithoutId } from "../types";

function createFakeReimburse(): ReimbursementRecordWithoutId {
  // 生成假数据
  const fakeReimbursementRecord = {
    applicantName: faker.person.firstName(),
    seller: faker.company.name(),
    taxPrice: parseInt(faker.string.numeric()),
    billingDate: faker.date.birthdate(),
    status: Math.random() < 0.5,
    approver: faker.person.firstName(),
  }

  return fakeReimbursementRecord
}

export const generateFakeReimburse = (num: number) => {
  const fakeReimbursementRecords = generateFakeData(createFakeReimburse, num)
  return fakeReimbursementRecords
}