"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
// 生成虚拟用户数据
var generateFakeUser = function () {
    var deviceName = faker_1.faker.random.word();
    var repairPerson = faker_1.faker.name.firstName();
    var repairAddress = faker_1.faker.address.streetAddress();
    var repairReason = faker_1.faker.lorem.sentence();
    var commentStatus = Math.random() < 0.5;
    return {
        deviceName: deviceName,
        repairPerson: repairPerson,
        repairAddress: repairAddress,
        repairReason: repairReason,
        commentStatus: commentStatus
    };
};
// 使用 generateFakeUser 生成 10 个虚拟用户
var fakeUsers = [];
for (var i = 0; i < 10; i++) {
    var user = generateFakeUser();
    fakeUsers.push(user);
}
console.log(fakeUsers);
