"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var utils_1 = require("./utils");
// 生成虚拟用户数据
var generateFakeDevice = function () {
    var deviceKind = faker_1.faker.number.int();
    var deviceName = faker_1.faker.random.word();
    var deviceAddress = faker_1.faker.address.streetAddress();
    var deviceQrcode = faker_1.faker.string.uuid();
    return {
        deviceKind: deviceKind,
        deviceName: deviceName,
        deviceAddress: deviceAddress,
        deviceQrcode: deviceQrcode
    };
};
// 
var fakeDevices = (0, utils_1.default)(generateFakeDevice, 10);
console.log(fakeDevices);
