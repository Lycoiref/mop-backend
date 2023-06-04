"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePositiveInt32 = exports.generateFakeData = void 0;
var faker_1 = require("@faker-js/faker");
var generateFakeData = function (fn, num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        var fakeData = fn();
        arr.push(fakeData);
    }
    return arr;
};
exports.generateFakeData = generateFakeData;
var generatePositiveInt32 = function () { return faker_1.faker.number.int({ min: 0, max: 2147483647 }); };
exports.generatePositiveInt32 = generatePositiveInt32;
