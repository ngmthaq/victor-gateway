import { getCurrentMilliseconds } from "@/vue/plugins/datetime.plugin";

export abstract class BaseModel {
  public _milliseconds: number;

  public constructor() {
    this._milliseconds = getCurrentMilliseconds();
  }
}
