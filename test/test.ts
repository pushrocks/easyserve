import { tap, expect } from '@pushrocks/tapbundle';
import * as path from 'path';

import { SmartServe } from '../ts/index';

let testSmartServe: SmartServe;
tap.test('should create a valid instance of EasyServe', async () => {
  testSmartServe = new SmartServe({
    injectReload: true,
    port: 3000,
    serveDir: path.join(__dirname),
    watch: true
  });
  expect(testSmartServe).to.be.instanceOf(SmartServe);
});

tap.test('should start to serve files', async tools => {
  await testSmartServe.start();
  await tools.delayFor(1000);
});

tap.test('should stop to serve files ', async tools => {
  await tools.delayFor(5000);
  await testSmartServe.stop();
});

tap.start();
