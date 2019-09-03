#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var yargs_1 = tslib_1.__importDefault(require("yargs"));
var __1 = require("..");
var postinstall_1 = require("./postinstall");
var argv = yargs_1["default"]
    .demandCommand(1)
    .command("postinstall" /* Postinstall */, 'Set this command to npm `postinstall` hook')
    .command("start" /* Start */, 'Start NodeCG')
    .strict().argv;
var command = argv._[0];
switch (command) {
    case "postinstall" /* Postinstall */:
        postinstall_1.postinstall();
        break;
    case "start" /* Start */:
        __1.start();
        break;
    default:
        console.error('Unexpected command:', command);
        process.exitCode = 1;
        break;
}
