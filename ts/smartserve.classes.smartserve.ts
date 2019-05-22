import * as plugins from './smartserve.plugins';
import * as paths from './smartserve.paths';

export interface IEasyServerConstructorOptions {
  serveDir: string;
  watch: boolean;
  injectReload: boolean;
  port?: number;
}

export class SmartServe {
  // static
  public static getHandler() {};

  // instance
  public options: IEasyServerConstructorOptions;
  smartexpressInstance: plugins.smartexpress.Server;

  public waitForReloadDeferred = plugins.smartpromise.defer();

  constructor(optionsArg: IEasyServerConstructorOptions) {
    const standardOptions: IEasyServerConstructorOptions = {
      injectReload: true,
      port: 3000,
      serveDir: process.cwd(),
      watch: true
    };
    this.options = {
      ...standardOptions,
      ...optionsArg
    };
  }

  /**
   * inits and starts the server
   */
  public async start() {
    this.smartexpressInstance = new plugins.smartexpress.Server({
      port: this.options.port,
      forceSsl: false,
      cors: true
    });

    this.smartexpressInstance.addRoute('/smartserve/:request', new plugins.smartexpress.Handler('ALL', async (req, res) => {
      switch (req.params.request) {
        case 'devtools':
          res.setHeader('Content-Type', 'text/javascript');
          res.status(200);
          res.send(plugins.smartfile.fs.toStringSync(paths.bundlePath));
          res.end();
          break;
        case 'reloadcheck':
          console.log('got request for reloadcheck');
          res.setHeader('Content-Type', 'text/plain');
          res.status(200);
          
          let keepAlive = true;
          const keepAliveFunction = async () => {
            while(keepAlive) {
              res.write('');
              await plugins.smartdelay.delayFor(1000);
            }
          };
          keepAliveFunction();
          await this.waitForReloadDeferred.promise;
          keepAlive = false;
          console.log('send reload command!');
          this.waitForReloadDeferred = plugins.smartpromise.defer();
          res.write('reload');
          res.end();

      } 
    }))
    this.smartexpressInstance.addRoute(
      '/*',
      new plugins.smartexpress.HandlerStatic(this.options.serveDir, {
        responseModifier: async (dataArg) => {
          let fileString = dataArg.responseContent;
          if (plugins.path.parse(dataArg.path).ext === '.html') {
            const fileStringArray = fileString.split('<head>');
            if (fileStringArray.length === 2) {
              fileStringArray[0] = `${fileStringArray[0]}<head><script src="/smartserve/devtools"></script>`;
              fileString = fileStringArray.join('');
            } else {
              console.log('Could not insert smartserve script');
            }
          }
          return fileString;
        }
      })
    );
    await this.smartexpressInstance.start();
    plugins.smartopen.openUrl('http://testing.git.zone:3000');
  }

  /**
   * reloads the page
   */
  async reload () {
    this.waitForReloadDeferred.resolve();
  }

  public async stop() {
    await this.smartexpressInstance.stop();
    this.waitForReloadDeferred.resolve();
  }
}
