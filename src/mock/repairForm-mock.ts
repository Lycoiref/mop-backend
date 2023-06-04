import { faker } from "@faker-js/faker";
import { generateFakeData, generatePositiveInt32 } from './utils';
import { RepairFormWithoutIds } from "../types";

function createFakeRepairForm(): RepairFormWithoutIds {
  const fakeRepairForm = {
    // deviceId 与 userId 由外键约束，因此不需要创建
    // deviceId: generatePositiveInt32(),
    // userId: generatePositiveInt32(),
    faultDesc: faker.lorem.sentence(),
    faultPic: faker.image.url(),
    doorTime: faker.date.future(),
  };

  return fakeRepairForm;
}

export const generateFakeRepairForm = (num: number) => {
  const fakeRepairFormData = generateFakeData(createFakeRepairForm, num);
  return fakeRepairFormData
}

