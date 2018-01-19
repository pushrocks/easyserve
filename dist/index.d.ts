/// <reference types="browser-sync" />
import * as browserSync from 'browser-sync';
export declare class EasyServe {
    bsInstance: browserSync.BrowserSyncInstance;
    private bsStartedDeferred;
    bsStarted: Promise<any>;
    servingDirectory: string;
    servingPort: number;
    constructor(servingDirectoryArg: string, portArg: number);
    /**
     * inits and starts browserSync
     */
    start(): Promise<{}>;
    stop(): Promise<void>;
}
