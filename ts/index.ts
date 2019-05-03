import * as plugins from './easyserve.plugins';

export interface IEasyServerConstructorOptions {
  serveDir: string;
  watch: boolean;
  injectReload: boolean;
  portArg?: number;
}

export class SmartServe {
  public options: IEasyServerConstructorOptions;
  smartexpressInstance: plugins.smartexpress.Server;

  constructor(optionsArg: IEasyServerConstructorOptions) {
    const standardOptions: IEasyServerConstructorOptions = {
      injectReload: true,
      portArg: 3000,
      serveDir: process.cwd(),
      watch: true
    };
    this.options = {
      ...standardOptions,
      ...optionsArg
    };
  }

  /**
   * inits and starts browserSync
   */
  async start() {}

  async stop() {}
}
