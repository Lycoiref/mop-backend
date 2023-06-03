import { faker } from "@faker-js/faker";
import generateFakeData from './utils';

export const generateFakeRepairForm = () => {
  const fakeRepairForm = {
    device_id: faker.number.int(),
    user_id: faker.number.int(),
    fault_desc: faker.lorem.sentence(),
    fault_pic: faker.image.url(),
    door_time: faker.date.future(),
  };

  return fakeRepairForm;
}

// 生成假数据
const fakeRepairFormData = generateFakeData(generateFakeRepairForm, 10);

console.log(fakeRepairFormData);
