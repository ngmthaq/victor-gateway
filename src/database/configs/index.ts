import path from "node:path";
import { verbose } from "sqlite3";
import { name } from "~/package.json";

export const DATABASE_VERSION = 1;

export const DATABASE_PATH = path.resolve(
  __dirname,
  process.env.NODE_ENV === "development" ? `../../${name}.db` : `./${name}.db`,
);

export const SQLITE3 = verbose();

export const DB = new SQLITE3.Database(DATABASE_PATH);

export const beginTransaction = () => DB.exec("BEGIN TRANSACTION");

export const commitTransaction = () => DB.exec("COMMIT");

export const rollbackTransaction = () => DB.exec("ROLLBACK");
