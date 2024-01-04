import { DatabaseColumnType } from "@/configs/types/database";
import { DB } from "@/database/configs";

export abstract class BaseTable {
  public abstract tableName: string;
  public abstract columns: Record<string, DatabaseColumnType>;

  public async createTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      const columns = Object.values(this.columns)
        .map((col) => `${col.name} ${col.type} ${col.attributes}`.trim())
        .join(", ");
      const sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${columns})`;
      const statement = DB.prepare(sql);
      statement.run((error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  public async dropTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      const sql = `DROP TABLE IF EXISTS ${this.tableName}`;
      const statement = DB.prepare(sql);
      statement.run((error: any) => {
        if (error) reject(error);
        resolve();
      });
    });
  }
}
