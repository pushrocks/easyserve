import { tap, expect } from '@pushrocks/tapbundle';
import * as path from 'path';

import { SmartServe } from '../ts/index';

let testSmartServe: SmartServe;
tap.test('should create a valid instance of EasyServe', async () => {
  testSmartServe = new SmartServe({
    injectReload: true,
    portArg: 3000,
    serveDir: path.join(__dirname, './index.html'),
    watch: true
  });
  expect(testSmartServe).to.be.instanceOf(SmartServe);
});

tap.test('should start to serve files', async () => {
  await testSmartServe.start();
});

tap.test('should stop to serve files ', async tools => {
  await tools.delayFor(5000);
  await testSmartServe.stop();
});

tap.start();
