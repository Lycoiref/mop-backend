"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeRepairForm = void 0;
var faker_1 = require("@faker-js/faker");
var utils_1 = require("./utils");
function createFakeRepairForm() {
    var fakeRepairForm = {
        // deviceId 与 userId 由外键约束，因此不需要创建
        // deviceId: generatePositiveInt32(),
        // userId: generatePositiveInt32(),
        faultDesc: faker_1.faker.lorem.sentence(),
        faultPic: faker_1.faker.image.url(),
        doorTime: faker_1.faker.date.future(),
    };
    return fakeRepairForm;
}
var generateFakeRepairForm = function (num) {
    var fakeRepairFormData = (0, utils_1.generateFakeData)(createFakeRepairForm, num);
    return fakeRepairFormData;
};
exports.generateFakeRepairForm = generateFakeRepairForm;
