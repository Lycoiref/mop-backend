import { PrismaClient, User } from '@prisma/client';
import { generateFakeUser } from '../../mock';
import { UserWithoutId } from '../../types';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
  // 清空所有数据
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
  // 清空所有数据
  await prisma.user.deleteMany({});
});

describe('user CRUD tests', () => {

  beforeEach(async () => {
    // 在每个测试之前，清空用户表数据
    await prisma.user.deleteMany({});
  });

  test('should create a new user', async () => {
    const oldUser = generateFakeUser(1)[0]
    const newUser = await prisma.user.create({
      data: oldUser
    });

    expect(newUser.username).toBe(oldUser.username);
    expect(newUser.idcardcheck).toBe(oldUser.idcardcheck);
    expect(newUser.account).toBe(oldUser.account);
    expect(newUser.idcard).toBe(oldUser.idcard);
    expect(newUser.password).toBe(oldUser.password);
    expect(newUser.phone).toBe(oldUser.phone);
    expect(newUser.role).toBe(oldUser.role);
  });

  test('should get a user by its id', async () => {
    const oldUser: User = await prisma.user.create({
      data: generateFakeUser(1)[0]
    })

    const newUser: User | null = await prisma.user.findUnique({
      where: {
        id: oldUser.id
      }
    })


    if (newUser !== null) {
      expect(newUser.username).toBe(oldUser.username);
      expect(newUser.idcardcheck).toBe(oldUser.idcardcheck);
      expect(newUser.account).toBe(oldUser.account);
      expect(newUser.idcard).toBe(oldUser.idcard);
      expect(newUser.password).toBe(oldUser.password);
      expect(newUser.phone).toBe(oldUser.phone);
      expect(newUser.role).toBe(oldUser.role);
    } else {
      throw new Error("newUser shouldn't be null");
    }    
  })

  test('should get all users', async () => {
    let fakeUsers: Array<UserWithoutId> = generateFakeUser(2)
    await prisma.user.createMany({
      data: fakeUsers,
    });

    const users = await prisma.user.findMany();

    expect(users.length).toBe(2);
    expect(users[0].idcard).toBe(fakeUsers[0].idcard);
    expect(users[1].password).toBe(fakeUsers[1].password);
  });

  test('should update a user', async () => {
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
    expect(tmpUsers.length).toBe(1);

    await prisma.user.delete({
      where: { id: newUser.id },
    });

    const users = await prisma.user.findMany();

    expect(users.length).toBe(0);
  });
});
