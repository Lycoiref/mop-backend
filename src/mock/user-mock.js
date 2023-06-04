"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeUser = void 0;
var faker_1 = require("@faker-js/faker");
var utils_1 = require("./utils");
function createFakeUser() {
    var fakeUser = {
        username: faker_1.faker.internet.userName(),
        idcardcheck: (0, utils_1.generatePositiveInt32)(),
        account: faker_1.faker.internet.userName(),
        idcard: faker_1.faker.string.uuid(),
        password: faker_1.faker.internet.password(),
        phone: faker_1.faker.phone.imei(),
        role: faker_1.faker.helpers.arrayElement(['admin', 'user']),
    };
    return fakeUser;
}
var generateFakeUser = function (num) {
    var fakeUserData = (0, utils_1.generateFakeData)(createFakeUser, num);
    return fakeUserData;
};
exports.generateFakeUser = generateFakeUser;
