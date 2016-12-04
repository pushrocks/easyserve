import 'typings-test'
import * as should from 'should'
import * as path

import { EasyServe } from '../dist/index.js'

describe('easyserve', function () {
    let testEasyServe: EasyServe
    it('should create a valid instance of EasyServe', function () {
        testEasyServe = new EasyServe(__dirname, 8080)
        should(testEasyServe).be.instanceOf(EasyServe)
    })

    it('should start to serve files', function (done) {
        this.timeout(10000)
        testEasyServe.start().then(() => {
            done()
        })
    })
    it('should stop to serve files ', function (done) {
        this.timeout(5000)
        setTimeout(() => {
            testEasyServe.stop().then(() => {
                done()
            }, 4000)
        })

    })
})
