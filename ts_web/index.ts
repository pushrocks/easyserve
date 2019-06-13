import * as plugins from './smartserve_web.plugins';
import { logger } from './smartserve_web.logger';
logger.log('info', `SmartServe-Devtools initialized!`);

export class ReloadChecker {
  public lastReload: string;
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
    const responseText = await response.text();
    let reloadJustified = false;
    this.lastReload ? null : this.lastReload = responseText;
    this.lastReload !== responseText ? reloadJustified = true : null;
    if (reloadJustified) {
      this.reload();
    } else {
      await plugins.smartdelay.delayFor(1000);
      this.start();
    }
  }
}

const reloadCheckInstance = new ReloadChecker();
reloadCheckInstance.start();
