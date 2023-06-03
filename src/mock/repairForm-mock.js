"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var utils_1 = require("./utils");
function generateFakeRepairForm() {
    var fakeRepairForm = {
        device_id: faker_1.faker.number.int(),
        user_id: faker_1.faker.number.int(),
        fault_desc: faker_1.faker.lorem.sentence(),
        fault_pic: faker_1.faker.image.imageUrl(),
        door_time: faker_1.faker.date.future(),
    };
    return fakeRepairForm;
}
// 生成假数据
var fakeRepairFormData = (0, utils_1.default)(generateFakeRepairForm, 10);
console.log(fakeRepairFormData);
