/// <reference types="browser-sync" />
/// <reference types="q" />
import * as q from 'q';
import * as browserSync from 'browser-sync';
export declare class EasyServe {
    bsInstance: browserSync.BrowserSyncInstance;
    bsStarted: q.IPromise<any>;
    servingDirectory: string;
    servingPort: number;
    constructor(servingDirectoryArg: string, portArg: number);
    /**
     * inits and starts browserSync
     */
    start(): q.Promise<{}>;
    stop(): q.Promise<{}>;
}
