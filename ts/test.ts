/// <reference path="typings/tsd.d.ts" />
/// <reference path="./index.ts" />
var easyserve = require("./index.js");
var path = require("path");
easyserve(path.resolve("./test/"));