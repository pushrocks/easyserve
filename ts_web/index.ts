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
    logger.log('ok', 'Reload response finished!');
    if (await response.text() === 'reload') {
      this.reload();
    }
  }
}

const reloadCheckInstance = new ReloadChecker();
reloadCheckInstance.start();
