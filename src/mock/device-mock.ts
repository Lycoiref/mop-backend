import { faker } from '@faker-js/faker';
import generateFakeData from './utils';

// 生成虚拟用户数据
export const generateFakeDevice = () => {
    const deviceKind = faker.number.int()
    const deviceName = faker.lorem.word()
    const deviceAddress = faker.location.streetAddress()
    const deviceQrcode = faker.string.uuid()

  return {
    deviceKind,
    deviceName,
    deviceAddress,
    deviceQrcode
  };
};

const fakeDevices = generateFakeData(generateFakeDevice, 10)
console.log(fakeDevices)