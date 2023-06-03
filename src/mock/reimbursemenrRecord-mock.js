"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var utils_1 = require("./utils");
var generateReimburse = function () {
    // 生成假数据
    var fakeReimbursementRecords = {
        applicant_name: faker_1.faker.person.firstName(),
        seller: faker_1.faker.company.name(),
        tax_price: faker_1.faker.string.numeric(),
        billing_date: faker_1.faker.date.past(),
        status: Math.random() < 0.5,
        approver: faker_1.faker.person.firstName(),
    };
    return fakeReimbursementRecords;
};
// 使用 generateFakeUser 生成 10 个虚拟用户
var fakeReimbursementRecords = (0, utils_1.default)(generateReimburse, 10);
console.log(fakeReimbursementRecords);
