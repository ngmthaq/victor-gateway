import { DB } from "../configs";
import { BaseTable } from "../tables/base.table";

export abstract class BaseRepo {
  protected abstract Table: BaseTable;

  public getLimitAndOffset(page: number, size: number): { limit: number; offset: number } {
    const offset = size * (page - 1);
    return { limit: size, offset: offset };
  }

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

  public async count(): Promise<number> {
    return new Promise((resolve, reject) => {
      DB.get<{ totals: number }>(`SELECT count(*) as totals FROM ${this.Table.tableName}`, (error, row) => {
        if (error) reject(error);
        resolve(row.totals);
      });
    });
  }

  public async paginate<T>(page: number, size: number): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const { limit, offset } = this.getLimitAndOffset(page, size);
      const statement = DB.prepare(`SELECT * FROM ${this.Table.tableName} LIMIT ${limit} OFFSET ${offset}`);
      statement.all<T>((error, rows) => {
        if (error) reject(error);
        resolve(rows);
      });
    });
  }
}
