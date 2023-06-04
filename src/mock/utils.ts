import { faker } from "@faker-js/faker";

export const generateFakeData: Function = (fn: Function, num: number): Array<object> => {
  let arr = []
  for (let i = 0; i < num; i++) {
    const fakeData = fn();
    arr.push(fakeData);
  }
  return arr
}

export const generatePositiveInt32 = () => faker.number.int({ min: 0, max: 2147483647 })