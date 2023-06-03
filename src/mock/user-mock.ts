import { faker } from "@faker-js/faker";

import generateFakeData from './utils';

export const generateFakeUser = () => {
  const fakeUser = {
    username: faker.internet.userName(),
    idcardcheck: faker.number.int(),
    account: faker.internet.userName(),
    idcard: faker.string.uuid(),
    password: faker.internet.password(),
    phone: faker.phone.imei(),
    role: faker.helpers.arrayElement(['admin', 'user']),
  };

  return fakeUser;
}

// 生成假数据
const fakeUserData = generateFakeData(generateFakeUser, 10);

console.log(fakeUserData);
