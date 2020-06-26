"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartServe = void 0;
const plugins = __importStar(require("./smartserve.plugins"));
const paths = __importStar(require("./smartserve.paths"));
class SmartServe {
    constructor(optionsArg) {
        this.serveDirHashSubject = new plugins.smartrx.rxjs.ReplaySubject(1);
        this.serveHash = '000000';
        this.lastReload = Date.now();
        this.ended = false;
        const standardOptions = {
            injectReload: true,
            port: 3000,
            serveDir: process.cwd(),
            watch: true
        };
        this.options = Object.assign(Object.assign({}, standardOptions), optionsArg);
    }
    /**
     * inits and starts the server
     */
    async start() {
        // set the smartexpress instance
        this.smartexpressInstance =
            this.options.expressInstance ||
                new plugins.smartexpress.Server({
                    port: this.options.port,
                    forceSsl: false,
                    cors: true
                });
        // add routes to the smartexpress instance
        this.smartexpressInstance.addRoute('/smartserve/:request', new plugins.smartexpress.Handler('ALL', async (req, res) => {
            switch (req.params.request) {
                case 'devtools':
                    res.setHeader('Content-Type', 'text/javascript');
                    res.status(200);
                    res.write(plugins.smartfile.fs.toStringSync(paths.bundlePath));
                    res.end();
                    break;
                case 'reloadcheck':
                    console.log('got request for reloadcheck');
                    res.setHeader('Content-Type', 'text/plain');
                    res.status(200);
                    if (this.ended) {
                        res.write('end');
                        res.end();
                        return;
                    }
                    res.write(this.lastReload.toString());
                    res.end();
            }
        }));
        this.smartexpressInstance.addRoute('/*', new plugins.smartexpress.HandlerStatic(this.options.serveDir, {
            responseModifier: async (responseArg) => {
                let fileString = responseArg.responseContent;
                if (plugins.path.parse(responseArg.path).ext === '.html') {
                    const fileStringArray = fileString.split('<head>');
                    if (this.options.injectReload && fileStringArray.length === 2) {
                        fileStringArray[0] = `${fileStringArray[0]}<head><script async defer src="/smartserve/devtools"></script>`;
                        fileString = fileStringArray.join('');
                    }
                    else if (this.options.injectReload) {
                        console.log('Could not insert smartserve script');
                    }
                }
                const headers = responseArg.headers;
                headers.appHash = this.serveHash;
                return {
                    headers,
                    path: responseArg.path,
                    responseContent: fileString
                };
            },
            serveIndexHtmlDefault: true
        }));
        this.smartchokInstance = new plugins.smartchok.Smartchok([this.options.serveDir], {});
        if (this.options.watch) {
            await this.smartchokInstance.start();
            (await this.smartchokInstance.getObservableFor('change')).subscribe(async () => {
                await this.createServeDirHash();
                this.reload();
            });
        }
        await this.createServeDirHash();
        if (!this.options.expressInstance) {
            await this.smartexpressInstance.start();
            plugins.smartopen.openUrl('http://testing.git.zone:3000');
        }
    }
    /**
     * reloads the page
     */
    async reload() {
        this.lastReload = Date.now();
    }
    async stop() {
        this.ended = true;
        await this.smartexpressInstance.stop();
        await this.smartchokInstance.stop();
    }
    async createServeDirHash() {
        const serveDirHash = await plugins.smartfile.fs.fileTreeToHash(this.options.serveDir, '**/*');
        this.serveHash = serveDirHash;
        console.log('Current ServeDir hash: ' + serveDirHash);
        this.serveDirHashSubject.next(serveDirHash);
    }
}
exports.SmartServe = SmartServe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzZXJ2ZS5jbGFzc2VzLnNtYXJ0c2VydmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydHNlcnZlLmNsYXNzZXMuc21hcnRzZXJ2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQWdEO0FBQ2hELDBEQUE0QztBQVU1QyxNQUFhLFVBQVU7SUFhckIsWUFBWSxVQUF5QztRQUw5Qyx3QkFBbUIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUN4RSxjQUFTLEdBQVcsUUFBUSxDQUFDO1FBRTdCLGVBQVUsR0FBVyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEMsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixNQUFNLGVBQWUsR0FBa0M7WUFDckQsWUFBWSxFQUFFLElBQUk7WUFDbEIsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUN2QixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxtQ0FDUCxlQUFlLEdBQ2YsVUFBVSxDQUNkLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsS0FBSztRQUNoQixnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLG9CQUFvQjtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWU7Z0JBQzVCLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7b0JBQzlCLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7b0JBQ3ZCLFFBQVEsRUFBRSxLQUFLO29CQUNmLElBQUksRUFBRSxJQUFJO2lCQUNYLENBQUMsQ0FBQztRQUVMLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUNoQyxzQkFBc0IsRUFDdEIsSUFBSSxP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