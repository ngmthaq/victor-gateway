import { Setting } from "@/configs/types/database";
import { BaseRepo } from "./base.repo";
import { SettingTable } from "../tables/setting.table";
import { DB } from "../configs";

export class SettingRepo extends BaseRepo {
  public Table: SettingTable = new SettingTable();

  public async getSetting(): Promise<Setting | undefined> {
    const currentVersion = await this.getFirst<Setting>();
    return currentVersion;
  }

  public async insertSetting(configs: Setting): Promise<void> {
    return new Promise((resolve, reject) => {
      const columns = Object.keys(this.Table.columns).join(",");
      const sql = `INSERT INTO ${this.Table.tableName} (${columns}) VALUES (?, ?, ?, ?)`;
      const statement = DB.prepare(sql, [configs.username, configs.password, configs.personalKey, configs.isInternet]);
      statement.run((error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }
}
