"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeReimburse = void 0;
var faker_1 = require("@faker-js/faker");
var utils_1 = require("./utils");
function createFakeReimburse() {
    // 生成假数据
    var fakeReimbursementRecord = {
        applicantName: faker_1.faker.person.firstName(),
        seller: faker_1.faker.company.name(),
        taxPrice: parseInt(faker_1.faker.string.numeric()),
        billingDate: faker_1.faker.date.past(),
        status: Math.random() < 0.5,
        approver: faker_1.faker.person.firstName(),
    };
    return fakeReimbursementRecord;
}
var generateFakeReimburse = function (num) {
    var fakeReimbursementRecords = (0, utils_1.generateFakeData)(createFakeReimburse, num);
    return fakeReimbursementRecords;
};
exports.generateFakeReimburse = generateFakeReimburse;
