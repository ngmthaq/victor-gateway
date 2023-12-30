import { DB } from "../configs";
import { BaseTable } from "../tables/base.table";

export abstract class BaseRepo {
  protected abstract Table: BaseTable;

  public async getAll<T>(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const statement = DB.prepare(`SELECT * FROM ${this.Table.tableName}`);
      statement.all<T>((error, rows) => {
        if (error) reject(error);
        resolve(rows);
      });
    });
  }

  public async getFirst<T>(): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      const statement = DB.prepare(`SELECT * FROM ${this.Table.tableName} LIMIT 1`);
      statement.get<T>((error, row) => {
        if (error) reject(error);
        resolve(row);
      });
    });
  }
}
