# easyserve

browser-sync in an easy to use TypeScript class

## Availabililty

[![npm](https://pushrocks.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/easyserve)
[![git](https://pushrocks.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/easyserve)
[![git](https://pushrocks.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/pushrocks/easyserve)
[![docs](https://pushrocks.gitlab.io/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/easyserve/)

## Status for master

[![build status](https://GitLab.com/pushrocks/easyserve/badges/master/build.svg)](https://GitLab.com/pushrocks/easyserve/commits/master)
[![coverage report](https://GitLab.com/pushrocks/easyserve/badges/master/coverage.svg)](https://GitLab.com/pushrocks/easyserve/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/easyserve.svg)](https://www.npmjs.com/package/easyserve)
[![Dependency Status](https://david-dm.org/pushrocks/easyserve.svg)](https://david-dm.org/pushrocks/easyserve)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/easyserve/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/easyserve/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/easyserve/badges/code.svg)](https://www.bithound.io/github/pushrocks/easyserve)
[![Known Vulnerabilities](https://snyk.io/test/npm/easyserve/badge.svg)](https://snyk.io/test/npm/easyserve)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage

Use TypeScript for best in class instellisense.

```javascript
import { EasyServe } from "easyserve";

let myEasyServe = new EasyServe("/some/path/to/webroot", 8080);
myEasyServe.start().then(() => {
  // this is executed when server is running guaranteed
  myEasyServe.stop(); // .stop() will work even if not waiting for server to be fully started
});

myEasyServe.reload(); // reloads all connected browsers of this instance
```

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
> | By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://push.rocks)
