import { Setting } from "@/configs/types/database";
import { SettingTable } from "../tables/setting.table";
import { BaseRepo } from "./base.repo";

export class SettingRepo extends BaseRepo {
  public Table: SettingTable = new SettingTable();

  public async getSetting(): Promise<Setting | undefined> {
    const currentVersion = await this.getFirst<Setting>();
    return currentVersion;
  }
}
