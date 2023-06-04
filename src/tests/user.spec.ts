import { PrismaClient, User } from '@prisma/client';
import { generateFakeUser } from '../mock';
import { UserWithoutId } from '../types';


const prisma = new PrismaClient();

let fakeUser: UserWithoutId

beforeAll(async () => {
  await prisma.$connect();
  // 先清空所有数据
  await prisma.user.deleteMany({});
  fakeUser = generateFakeUser(1)[0]
  console.log(fakeUser)
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('user CRUD tests', () => {
  test.concurrent('should create a new user', async () => {
    const newUser = await prisma.user.create({
      data: fakeUser
    });

    expect(newUser.username).toBe(fakeUser.username);
    expect(newUser.idcardcheck).toBe(fakeUser.idcardcheck);
    expect(newUser.account).toBe(fakeUser.account);
    expect(newUser.idcard).toBe(fakeUser.idcard);
    expect(newUser.password).toBe(fakeUser.password);
    expect(newUser.phone).toBe(fakeUser.phone);
    expect(newUser.role).toBe(fakeUser.role);
  });

  test.concurrent('should get all users', async () => {
    let fakeUsers: Array<UserWithoutId> = generateFakeUser(2)
    await prisma.user.createMany({
      data: fakeUsers,
    });

    const users = await prisma.user.findMany();

    expect(users.length).toBe(3);
    expect(users[0].username).toBe(fakeUser.username);
    expect(users[1].idcard).toBe(fakeUsers[0].idcard);
    expect(users[2].password).toBe(fakeUsers[1].password);
  });

  test.concurrent('should update a user', async () => {
    let newFakeUser = generateFakeUser(1)[0]
    const newUser = await prisma.user.create({
      data: newFakeUser,
    });

    const updatedUser = await prisma.user.update({
      where: { id: newUser.id },
      data: { username: 'New Name' },
    });

    expect(updatedUser.username).toBe('New Name');
  });

  test('should delete a user', async () => {
    let newFakeUser = generateFakeUser(1)[0]
    const newUser = await prisma.user.create({
      data: newFakeUser,
    });

    const tmpUsers = await prisma.user.findMany();
    expect(tmpUsers.length).toBe(5);

    await prisma.user.delete({
      where: { id: newUser.id },
    });

    const users = await prisma.user.findMany();

    expect(users.length).toBe(4);
  });
});
