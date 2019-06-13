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
    const controller = new AbortController();
    let aborted = false;
    const response = await fetch('/smartserve/reloadcheck', {
      signal: controller.signal
    });

    window.onbeforeunload = event => {
      aborted = true;
      controller.abort();
    };

    if (!aborted && await response.text() === 'reload') {
      logger.log('ok', 'triggering reload!');
      this.reload();
    } else if (!aborted && !(await response.text() === 'end')) {
      this.start();
    }
  }
}

const reloadCheckInstance = new ReloadChecker();
reloadCheckInstance.start();
