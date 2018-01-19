import * as smartq from "smartq";
import * as path from "path";
import * as browserSync from "browser-sync";

export class EasyServe {
  bsInstance: browserSync.BrowserSyncInstance = null;
  private bsStartedDeferred: smartq.Deferred<any> = smartq.defer();
  bsStarted = this.bsStartedDeferred.promise;
  servingDirectory: string;
  servingPort: number;

  constructor(servingDirectoryArg: string, portArg: number) {
    this.servingDirectory = servingDirectoryArg;
    this.servingPort = portArg;
  }

  /**
   * inits and starts browserSync
   */
  async start() {
    let done = smartq.defer();
    if (!this.bsInstance) {
      this.bsInstance = browserSync.create();
      this.bsInstance.init(
        {
          snippetOptions: {
            rule: {
              match: /<head>/i,
              fn: function(snippet, match) {
                return snippet + match;
              }
            }
          },
          server: {
            baseDir: this.servingDirectory
          },
          port: this.servingPort
        },
        () => {
          done.resolve();
          this.bsStartedDeferred.resolve();
        }
      );
    }
    return await done.promise;
  }

  async stop() {
    await this.bsStarted;
    this.bsInstance.pause();
    this.bsInstance.exit();
  }
}
