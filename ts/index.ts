import * as plugins from './smartserve.plugins';

import { Watcher } from './smartserve.classes.watcher';

export interface IEasyServerConstructorOptions {
  serveDir: string;
  watch: boolean;
  injectReload: boolean;
  port?: number;
}

export class SmartServe {
  public options: IEasyServerConstructorOptions;
  smartexpressInstance: plugins.smartexpress.Server;
  watcher: Watcher;

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

    this.smartexpressInstance.addRoute(
      '/*',
      new plugins.smartexpress.HandlerStatic(this.options.serveDir)
    );
    await this.smartexpressInstance.start();
  }

  public async stop() {
    await this.smartexpressInstance.stop();
  }
}
