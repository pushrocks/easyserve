import { logger } from './smartserve_web.logger';
logger.log('info', `SmartServe-Devtools initialized!`);

export class ReloadChecker {
  
  constructor() {}

  public async reload () {
    // this looks a bit hacky, but apparently is the safest way to really reload stuff
    window.location = window.location;
  }

  /**
   * starts the reload checker
   */
  public async start () {
    const response = await fetch('/smartserve/reloadcheck');
    if (await response.text() === 'reload') {
      logger.log('ok', 'triggering reload!');
      this.reload();
    } else {
      this.start();
    }
  }
}

const reloadCheckInstance = new ReloadChecker();
reloadCheckInstance.start();
