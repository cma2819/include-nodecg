"use strict";
exports.__esModule = true;
var __1 = require("..");
exports.postinstall = function () {
    __1.bowerInstall()["catch"](function (error) {
        console.error('Failed to run bower install', error.stack);
        process.exitCode = 1;
    });
    __1.linkBundle()["catch"](function (error) {
        console.error('Failed to link bundle directory', error.stack);
        process.exitCode = 1;
    });
    __1.linkCfg()["catch"](function (error) {
        console.error('Failed to link cfg directory', error.stack);
        process.exitCode = 1;
    });
    __1.linkDb()["catch"](function (error) {
        console.error('Failed to link db directory', error.stack);
        process.exitCode = 1;
    });
};
