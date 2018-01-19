import { tap, expect } from 'tapbundle'
import * as path from 'path'

import { EasyServe } from '../ts/index'

let testEasyServe: EasyServe
tap.test('should create a valid instance of EasyServe', async () => {
    testEasyServe = new EasyServe(__dirname, 8080)
    expect(testEasyServe).to.be.instanceOf(EasyServe)
})

tap.test('should start to serve files', async () => {
    await testEasyServe.start()
})

tap.test('should stop to serve files ', async (tools) => {
    await tools.delayFor(5000)
    await testEasyServe.stop()
})

tap.start()
