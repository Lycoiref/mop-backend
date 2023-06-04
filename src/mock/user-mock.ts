import { faker } from "@faker-js/faker";

import { generateFakeData, generatePositiveInt32 } from './utils';
import { UserWithoutId } from "../types";

function createFakeUser(): UserWithoutId {
  const fakeUser = {
    username: faker.internet.userName(),
    idcardcheck: generatePositiveInt32(),
    account: faker.internet.userName(),
    idcard: faker.string.uuid(),
    password: faker.internet.password(),
    phone: faker.phone.imei(),
    role: faker.helpers.arrayElement(['admin', 'user']),
  };

  return fakeUser;
}

export const generateFakeUser = (num: number) => {
  const fakeUserData = generateFakeData(createFakeUser, num);
  return fakeUserData
}
