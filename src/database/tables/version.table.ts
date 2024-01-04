import { DatabaseColumnType } from "@/configs/types/database";
import BaseTable from "./base.table";

export type Version = {
  version: number;
};

export type VersionColumns = "version";

export default class VersionTable extends BaseTable {
  public tableName: string = "versions";

  public columns: Record<VersionColumns, DatabaseColumnType> = {
    version: {
      name: "version",
      type: "INTEGER",
      attributes: "",
    },
  };
}
