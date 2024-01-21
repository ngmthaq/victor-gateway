import { DatabaseColumnType, SettingColumns } from "@/configs/types/database";
import { BaseTable } from "./base.table";

export class SettingTable extends BaseTable {
  public tableName: string = "settings";

  public columns: Record<SettingColumns, DatabaseColumnType> = {
    username: {
      name: "username",
      type: "TEXT",
      attributes: "",
    },

    password: {
      name: "password",
      type: "TEXT",
      attributes: "",
    },

    personalKey: {
      name: "personalKey",
      type: "TEXT",
      attributes: "",
    },
  };
}
