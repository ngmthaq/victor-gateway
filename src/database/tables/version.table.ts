import { DatabaseColumnType, VersionColumns } from "@/configs/types/database";
import { BaseTable } from "./base.table";

export class VersionTable extends BaseTable {
  public tableName: string = "versions";

  public columns: Record<VersionColumns, DatabaseColumnType> = {
    version: {
      name: "version",
      type: "INTEGER",
      attributes: "",
    },
  };
}
