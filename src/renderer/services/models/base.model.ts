import { getCurrentMilliseconds } from "@/renderer/plugins/datetime.plugin";

export abstract class BaseModel {
  public _milliseconds: number;

  public constructor() {
    this._milliseconds = getCurrentMilliseconds();
  }
}
