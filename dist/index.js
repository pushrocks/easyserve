"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const smartq = require("smartq");
const browserSync = require("browser-sync");
class EasyServe {
    constructor(servingDirectoryArg, portArg) {
        this.bsInstance = null;
        this.bsStartedDeferred = smartq.defer();
        this.bsStarted = this.bsStartedDeferred.promise;
        this.servingDirectory = servingDirectoryArg;
        this.servingPort = portArg;
    }
    /**
     * inits and starts browserSync
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            let done = smartq.defer();
            if (!this.bsInstance) {
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
                }, () => {
                    done.resolve();
                    this.bsStartedDeferred.resolve();
                });
            }
            return yield done.promise;
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bsStarted;
            this.bsInstance.pause();
            this.bsInstance.exit();
        });
    }
}
exports.EasyServe = EasyServe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQWdDO0FBRWhDLDRDQUEyQztBQUUzQztJQU9FLFlBQVksbUJBQTJCLEVBQUUsT0FBZTtRQU54RCxlQUFVLEdBQW9DLElBQUksQ0FBQTtRQUMxQyxzQkFBaUIsR0FBeUIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pFLGNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBS3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQTtRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQTtJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDRyxLQUFLOztZQUNULElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtnQkFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBQ25CLGNBQWMsRUFBRTt3QkFDZCxJQUFJLEVBQUU7NEJBQ0osS0FBSyxFQUFFLFNBQVM7NEJBQ2hCLEVBQUUsRUFBRSxVQUFVLE9BQU8sRUFBRSxLQUFLO2dDQUMxQixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTs0QkFDeEIsQ0FBQzt5QkFDRjtxQkFDRjtvQkFDRCxNQUFNLEVBQUU7d0JBQ04sT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7cUJBQy9CO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsV0FBVztpQkFDdkIsRUFBRSxHQUFHLEVBQUU7b0JBQ04sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO29CQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtnQkFDbEMsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDO1lBQ0QsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUMzQixDQUFDO0tBQUE7SUFFSyxJQUFJOztZQUNSLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQTtZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDeEIsQ0FBQztLQUFBO0NBQ0Y7QUE3Q0QsOEJBNkNDIn0=