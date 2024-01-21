import path from "node:path";
import { verbose } from "sqlite3";
import { name } from "~/package.json";
import tables from "../tables/_tables";

export const DB_VERSION = 1;

export const DB_PATH = path.resolve(
  __dirname,
  process.env.NODE_ENV === "development" ? `../../${name}.db` : `./${name}.db`,
);

export const SQLITE3 = verbose();

export const DB = new SQLITE3.Database(DB_PATH);

export const DB_HELPERS = {
  begin: async function (): Promise<void> {
    return new Promise((resolve, reject) =>
      DB.exec("BEGIN TRANSACTION", (error) => {
        if (error) reject(error);
        resolve();
      }),
    );
  },

  commit: async function (): Promise<void> {
    return new Promise((resolve, reject) =>
      DB.exec("COMMIT", (error) => {
        if (error) reject(error);
        resolve();
      }),
    );
  },

  rollback: async function (): Promise<void> {
    return new Promise((resolve, reject) =>
      DB.exec("ROLLBACK", (error) => {
        if (error) reject(error);
        resolve();
      }),
    );
  },

  drop: async function (): Promise<void> {
    return new Promise((resolve, reject) => {
      DB.exec("PRAGMA foreign_keys = OFF", (error) => {
        if (error) reject(error);
        Promise.all(Object.values(tables).map((Table) => new Table().dropTable()))
          .then(() => {
            DB.exec("PRAGMA foreign_keys = ON", (error) => {
              if (error) reject(error);
              resolve();
            });
          })
          .catch((error1: any) => {
            DB.exec("PRAGMA foreign_keys = ON", (error2) => {
              reject({ error1, error2 });
            });
          });
      });
    });
  },
};
