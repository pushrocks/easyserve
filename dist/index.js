"use strict";
const q = require("q");
const browserSync = require("browser-sync");
class EasyServe {
    constructor(servingDirectoryArg, portArg) {
        this.bsInstance = null;
        this.bsStarted = null;
        this.servingDirectory = servingDirectoryArg;
        this.servingPort = portArg;
    }
    /**
     * inits and starts browserSync
     */
    start() {
        let done = q.defer();
        if (!this.bsInstance) {
            this.bsStarted = done.promise;
            this.bsInstance = browserSync.create();
            this.bsInstance.init({
                snippetOptions: {
                    rule: {
                        match: /<head>/i,
                        fn: function (snippet, match) {
                            return snippet + match;
                        }
                    }
                },
                server: {
                    baseDir: this.servingDirectory
                },
                port: this.servingPort
            });
        }
        this.bsInstance.emitter.on('init', () => {
            done.resolve();
        });
        return done.promise;
    }
    stop() {
        let done = q.defer();
        this.bsStarted.then(() => {
            this.bsInstance.exit();
            done.resolve();
        });
        return done.promise;
    }
}
exports.EasyServe = EasyServe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQXNCO0FBRXRCLDRDQUEyQztBQUUzQztJQU1JLFlBQVksbUJBQTJCLEVBQUUsT0FBZTtRQUx4RCxlQUFVLEdBQW9DLElBQUksQ0FBQTtRQUNsRCxjQUFTLEdBQW9CLElBQUksQ0FBQTtRQUs3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUE7UUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUE7SUFDOUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNELElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtZQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDakIsY0FBYyxFQUFFO29CQUNaLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsU0FBUzt3QkFDaEIsRUFBRSxFQUFFLFVBQVUsT0FBTyxFQUFFLEtBQUs7NEJBQ3hCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO3dCQUMxQixDQUFDO3FCQUNKO2lCQUNKO2dCQUNELE1BQU0sRUFBRTtvQkFDSixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtpQkFDakM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQ3pCLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztDQUNKO0FBaERELDhCQWdEQyJ9