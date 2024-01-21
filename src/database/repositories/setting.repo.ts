import { SettingTable } from "../tables/setting.table";
import { BaseRepo } from "./base.repo";

export class SettingRepo extends BaseRepo {
  public Table: SettingTable = new SettingTable();
}
