import type { Version } from "../tables/version.table";
import { DB } from "../configs";
import VersionTable from "../tables/version.table";
import BaseRepo from "./base.repo";

export default class VersionRepo extends BaseRepo {
  public Table: VersionTable = new VersionTable();

  public async getVersion(): Promise<Version | undefined> {
    const currentVersion = await this.getFirst<Version>();
    return currentVersion;
  }

  public async updateVersion(version: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${this.Table.tableName} SET ${this.Table.columns.version.name} = ?`;
      DB.run(sql, [version], (_: any, error: any) => {
        if (error) reject(error);
        resolve(version);
      });
    });
  }

  public async setVersion(version: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${this.Table.tableName} (${this.Table.columns.version.name}) VALUES (?)`;
      DB.run(sql, [version], (_: any, error: any) => {
        if (error) reject(error);
        resolve(version);
      });
    });
  }
}
