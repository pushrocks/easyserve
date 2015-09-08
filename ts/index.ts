/// <reference path="typings/tsd.d.ts" />
var path, browserSync;

path = require("path");
browserSync = require("browser-sync").create();

module.exports = (serveDirectory:string) => {
    browserSync.init({
        snippetOptions: {
            rule: {
                match: /<head>/i,
                fn: function(snippet, match) {
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