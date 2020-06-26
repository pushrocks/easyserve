import * as plugins from './smartserve.plugins';
export interface IEasyServerConstructorOptions {
    expressInstance?: plugins.smartexpress.Server;
    serveDir: string;
    injectReload: boolean;
    port?: number;
    watch?: boolean;
}
export declare class SmartServe {
    options: IEasyServerConstructorOptions;
    smartexpressInstance: plugins.smartexpress.Server;
    smartchokInstance: plugins.smartchok.Smartchok;
    serveDirHashSubject: plugins.smartrx.rxjs.ReplaySubject<string>;
    serveHash: string;
    lastReload: number;
    ended: boolean;
    constructor(optionsArg: IEasyServerConstructorOptions);
    /**
     * inits and starts the server
     */
    start(): Promise<void>;
    /**
     * reloads the page
     */
    reload(): Promise<void>;
    stop(): Promise<void>;
    createServeDirHash(): Promise<void>;
}
