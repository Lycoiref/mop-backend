"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeDevice = void 0;
var faker_1 = require("@faker-js/faker");
var utils_1 = require("./utils");
function createDevice() {
    var deviceKind = (0, utils_1.generatePositiveInt32)();
    var deviceName = faker_1.faker.lorem.word();
    var deviceAddress = faker_1.faker.location.streetAddress();
    var deviceQrcode = faker_1.faker.string.uuid();
    return {
        deviceKind: deviceKind,
        deviceName: deviceName,
        deviceAddress: deviceAddress,
        deviceQrcode: deviceQrcode
    };
}
// 生成虚拟用户数据
var generateFakeDevice = function (num) {
    var fakeDevices = (0, utils_1.generateFakeData)(createDevice, num);
    return fakeDevices;
};
exports.generateFakeDevice = generateFakeDevice;
