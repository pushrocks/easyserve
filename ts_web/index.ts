export class ReloadChecker {
  
  constructor() {}

  public async reload () {
    // this looks a bit hacky, but apparently is the safest way to really reload stuff
    window.location = window.location;
  }
}
