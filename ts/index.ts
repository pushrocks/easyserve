import * as q from 'q'
import * as path from 'path'
import * as browserSync from 'browser-sync'

export class EasyServe {
    bsInstance: browserSync.BrowserSyncInstance = null
    bsStarted: q.IPromise<any> = null
    servingDirectory: string
    servingPort: number

    constructor(servingDirectoryArg: string, portArg: number) {
        this.servingDirectory = servingDirectoryArg
        this.servingPort = portArg
    }

    /**
     * inits and starts browserSync
     */
    start() {
        let done = q.defer()
        if (!this.bsInstance) {
            this.bsStarted = done.promise
            this.bsInstance = browserSync.create()
            this.bsInstance.init({
                snippetOptions: {
                    rule: {
                        match: /<head>/i,
                        fn: function (snippet, match) {
                            return snippet + match
                        }
                    }
                },
                server: {
                    baseDir: this.servingDirectory
                },
                port: this.servingPort
            })
        }
        this.bsInstance.emitter.on('init', () => {
            done.resolve()
        })
        return done.promise
    }

    stop() {
        let done = q.defer()
        this.bsStarted.then(() => {
            this.bsInstance.exit()
            done.resolve()
        })
        return done.promise
    }
}
