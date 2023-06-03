import { faker } from "@faker-js/faker";
import generateFakeData from './utils';

export const generateFakeReimburse = () => {
    // 生成假数据
    const fakeReimbursementRecords = {
      applicant_name: faker.person.firstName(),
      seller: faker.company.name(),
      tax_price: faker.string.numeric(),
      billing_date: faker.date.past(),
      status: Math.random() < 0.5,
      approver: faker.person.firstName(),
    }

    return fakeReimbursementRecords
}

// 使用 generateFakeUser 生成 10 个虚拟用户
const fakeReimbursementRecords = generateFakeData(generateFakeReimburse, 10)

console.log(fakeReimbursementRecords);
