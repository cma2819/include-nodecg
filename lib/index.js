"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var util_1 = require("util");
var execa_1 = tslib_1.__importDefault(require("execa"));
var del_1 = tslib_1.__importDefault(require("del"));
var app_root_path_1 = tslib_1.__importDefault(require("app-root-path"));
var is_root_1 = tslib_1.__importDefault(require("is-root"));
var is_docker_1 = tslib_1.__importDefault(require("is-docker"));
var nodecgPath = app_root_path_1["default"].resolve('node_modules/nodecg');
fs_1["default"].readdirSync(nodecgPath);
var symlink = util_1.promisify(fs_1["default"].symlink);
var readdir = util_1.promisify(fs_1["default"].readdir);
var mkdir = util_1.promisify(fs_1["default"].mkdir);
exports.bundleName = app_root_path_1["default"].require('package.json').name;
exports.bowerInstall = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var nodecgDirFiles, shouldAllowRoot, bowerProcess;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, readdir(nodecgPath, { encoding: 'utf8' })];
            case 1:
                nodecgDirFiles = _a.sent();
                if (!nodecgDirFiles.includes('bower.json')) {
                    return [2 /*return*/];
                }
                shouldAllowRoot = is_docker_1["default"]() && is_root_1["default"]();
                bowerProcess = execa_1["default"].command(shouldAllowRoot
                    ? 'bower install --production --allow-root'
                    : 'bower install --production', { preferLocal: true, cwd: nodecgPath });
                bowerProcess.stderr.pipe(process.stderr);
                return [4 /*yield*/, bowerProcess];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.linkBundle = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var sourceBundlePath, error_1, bundlePath;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sourceBundlePath = app_root_path_1["default"].resolve('bundles');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 6]);
                return [4 /*yield*/, readdir(sourceBundlePath)];
            case 2:
                _a.sent();
                return [3 /*break*/, 6];
            case 3:
                error_1 = _a.sent();
                if (!(error_1.code === 'ENOENT')) return [3 /*break*/, 5];
                return [4 /*yield*/, mkdir(sourceBundlePath)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 6];
            case 6:
                bundlePath = path_1["default"].join(nodecgPath, 'bundles');
                return [4 /*yield*/, del_1["default"](bundlePath)];
            case 7:
                _a.sent();
                return [4 /*yield*/, symlink(path_1["default"].relative(path_1["default"].dirname(bundlePath), sourceBundlePath), bundlePath, 'dir')];
            case 8:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.linkCfg = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var sourceCfgPath, error_2, cfgPath;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sourceCfgPath = app_root_path_1["default"].resolve('cfg');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 7]);
                return [4 /*yield*/, readdir(sourceCfgPath)];
            case 2:
                _a.sent();
                return [3 /*break*/, 7];
            case 3:
                error_2 = _a.sent();
                if (!(error_2.code === 'ENOENT')) return [3 /*break*/, 5];
                return [4 /*yield*/, mkdir(sourceCfgPath)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5: throw error_2;
            case 6: return [3 /*break*/, 7];
            case 7:
                cfgPath = path_1["default"].join(nodecgPath, 'cfg');
                return [4 /*yield*/, del_1["default"](cfgPath)];
            case 8:
                _a.sent();
                return [4 /*yield*/, symlink(path_1["default"].relative(path_1["default"].dirname(cfgPath), sourceCfgPath), cfgPath, 'dir')];
            case 9:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.linkDb = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var sourceDbPath, error_3, dbPath;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sourceDbPath = app_root_path_1["default"].resolve('db');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 7]);
                return [4 /*yield*/, readdir(sourceDbPath)];
            case 2:
                _a.sent();
                return [3 /*break*/, 7];
            case 3:
                error_3 = _a.sent();
                if (!(error_3.code === 'ENOENT')) return [3 /*break*/, 5];
                return [4 /*yield*/, mkdir(sourceDbPath)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5: throw error_3;
            case 6: return [3 /*break*/, 7];
            case 7:
                dbPath = path_1["default"].join(nodecgPath, 'db');
                return [4 /*yield*/, del_1["default"](dbPath)];
            case 8:
                _a.sent();
                return [4 /*yield*/, symlink(path_1["default"].relative(path_1["default"].dirname(dbPath), sourceDbPath), dbPath, 'dir')];
            case 9:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.start = function () {
    require(nodecgPath);
};
