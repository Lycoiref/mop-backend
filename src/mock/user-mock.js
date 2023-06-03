"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var utils_1 = require("./utils");
function generateFakeUser() {
    var fakeUser = {
        username: faker_1.faker.internet.userName(),
        idcardcheck: faker_1.faker.number.int(),
        account: faker_1.faker.internet.userName(),
        idcard: faker_1.faker.string.uuid(),
        password: faker_1.faker.internet.password(),
        phone: faker_1.faker.phone.imei(),
        role: faker_1.faker.helpers.arrayElement(['admin', 'user']),
    };
    return fakeUser;
}
// 生成假数据
var fakeUserData = (0, utils_1.default)(generateFakeUser, 10);
console.log(fakeUserData);
