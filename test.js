/// <reference path="typings/tsd.d.ts" />
var path, browserSync;
path = require("path");
browserSync = require("browser-sync").create();
module.exports = function (serveDirectory) {
    browserSync.init({
        snippetOptions: {
            rule: {
                match: /<head>/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        },
        server: {
            baseDir: serveDirectory
        },
        port: 8080
    });
};
/// <reference path="typings/tsd.d.ts" />
/// <reference path="./index.ts" />
var easyserve = require("./index.js");
var path = require("path");
easyserve(path.resolve("./test/"));
