import * as plugins from './smartserve.plugins';
import * as paths from './smartserve.paths';

export interface IEasyServerConstructorOptions {
  expressInstance?: plugins.smartexpress.Server;
  serveDir: string;
  injectReload: boolean;
  port?: number;
  watch?: boolean;
}

export class SmartServe {
  // static
  // nothing here yet

  // instance
  public options: IEasyServerConstructorOptions;
  public smartexpressInstance: plugins.smartexpress.Server;
  public smartchokInstance: plugins.smartchok.Smartchok;

  public lastReload: number = Date.now();
  public ended = false;
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
    // set the smartexpress instance
    this.smartexpressInstance =
      this.options.expressInstance ||
      new plugins.smartexpress.Server({
        port: this.options.port,
        forceSsl: false,
        cors: true
      });

    // add routes to the smartexpress instance
    this.smartexpressInstance.addRoute(
      '/smartserve/:request',
      new plugins.smartexpress.Handler('ALL', async (req, res) => {
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
            }
            res.write(this.lastReload.toString());
            res.end();
        }
      })
    );

    this.smartexpressInstance.addRoute(
      '/*',
      new plugins.smartexpress.HandlerStatic(this.options.serveDir, {
        responseModifier: async dataArg => {
          let fileString = dataArg.responseContent;
          if (plugins.path.parse(dataArg.path).ext === '.html') {
            const fileStringArray = fileString.split('<head>');
            if (this.options.injectReload && fileStringArray.length === 2) {
              fileStringArray[0] = `${
                fileStringArray[0]
              }<head><script async defer src="/smartserve/devtools"></script>`;
              fileString = fileStringArray.join('');
            } else if (this.options.injectReload) {
              console.log('Could not insert smartserve script');
            }
          }
          return fileString;
        }
      })
    );

    this.smartchokInstance = new plugins.smartchok.Smartchok([this.options.serveDir], {});
    if (this.options.watch) {
      await this.smartchokInstance.start();
      (await this.smartchokInstance.getObservableFor('change')).subscribe(() => {
        this.reload();
      });
    }

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

  public async stop() {
    this.ended = true;
    await this.smartexpressInstance.stop();
    await this.smartchokInstance.stop();
  }
}
