"use strict";
require("typings-test");
const should = require("should");
const index_js_1 = require("../dist/index.js");
describe('easyserve', function () {
    let testEasyServe;
    it('should create a valid instance of EasyServe', function () {
        testEasyServe = new index_js_1.EasyServe(__dirname, 8080);
        should(testEasyServe).be.instanceOf(index_js_1.EasyServe);
    });
    it('should start to serve files', function (done) {
        this.timeout(10000);
        testEasyServe.start().then(() => {
            done();
        });
    });
    it('should stop to serve files ', function (done) {
        this.timeout(5000);
        setTimeout(() => {
            testEasyServe.stop().then(() => {
                done();
            }, 4000);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQixpQ0FBZ0M7QUFHaEMsK0NBQTRDO0FBRTVDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFDbEIsSUFBSSxhQUF3QixDQUFBO0lBQzVCLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtRQUM5QyxhQUFhLEdBQUcsSUFBSSxvQkFBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM5QyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBUyxDQUFDLENBQUE7SUFDbEQsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxJQUFJO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQztZQUN2QixJQUFJLEVBQUUsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxJQUFJO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbEIsVUFBVSxDQUFDO1lBQ1AsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDdEIsSUFBSSxFQUFFLENBQUE7WUFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDWixDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==