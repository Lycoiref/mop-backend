"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var utils_1 = require("./utils");
// 生成虚拟用户数据
var generateFakeHistoricalRepairRecord = function () {
    var deviceName = faker_1.faker.lorem.word();
    var repairPerson = faker_1.faker.person.firstName();
    var repairAddress = faker_1.faker.location.streetAddress();
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
var fakeHistoricalRepairRecords = (0, utils_1.default)(generateFakeHistoricalRepairRecord, 10);
console.log(fakeHistoricalRepairRecords);
