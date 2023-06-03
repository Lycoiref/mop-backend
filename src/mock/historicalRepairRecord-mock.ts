import { faker } from '@faker-js/faker';


// 生成虚拟用户数据
const generateFakeUser = () => {
  const deviceName = faker.random.word()
  const repairPerson = faker.name.firstName()
  const repairAddress = faker.address.streetAddress()
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

// 使用 generateFakeUser 生成 10 个虚拟用户
const fakeUsers = [];
for (let i = 0; i < 10; i++) {
  const user = generateFakeUser();
  fakeUsers.push(user);
}

console.log(fakeUsers);
