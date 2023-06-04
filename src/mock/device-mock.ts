import { faker } from '@faker-js/faker';
import { generateFakeData, generatePositiveInt32 } from './utils';
import { DeviceWithoutId } from '../types';

function createDevice(): DeviceWithoutId {
  const deviceKind = generatePositiveInt32()
  const deviceName = faker.lorem.word()
  const deviceAddress = faker.location.streetAddress()
  const deviceQrcode = faker.string.uuid()

  return {
    deviceKind,
    deviceName,
    deviceAddress,
    deviceQrcode
  };
}

// 生成虚拟用户数据
export const generateFakeDevice = (num: number) => {
  const fakeDevices = generateFakeData(createDevice, num)
  return fakeDevices
};