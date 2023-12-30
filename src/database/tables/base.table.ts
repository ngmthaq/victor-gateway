import { DatabaseColumnType } from "@/configs/types/database";
import { DB } from "@/database/configs";

export abstract class BaseTable {
  public abstract tableName: string;
  public abstract columns: Record<string, DatabaseColumnType>;

  public async createTable(): Promise<any> {
    return new Promise((resolve, reject) => {
      const columns = Object.values(this.columns)
        .map((col) => `${col.name} ${col.type} ${col.attributes}`.trim())
        .join(", ");

      DB.run(`CREATE TABLE IF NOT EXISTS ${this.tableName} (${columns})`, (result: any, error: any) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }
}
