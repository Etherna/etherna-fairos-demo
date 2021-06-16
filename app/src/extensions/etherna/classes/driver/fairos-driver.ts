import DriverBase from "./driver-base";
import { safeTrailingSlash } from "./utils";

export default class FairosDriver implements DriverBase {
  host: string

  constructor() {
    this.host = safeTrailingSlash(process.env.REACT_APP_FAIROSHOST) + 'v0/'
  }

  getFileUrl(filename: string, path?: string) {
    return [
      safeTrailingSlash(this.host),
      safeTrailingSlash(path),
      filename
    ].join('')
  }
}