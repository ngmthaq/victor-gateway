import type { DatabaseColumnType, ResponseColumns } from "@/configs/types/database";
import { BaseTable } from "./base.table";

export class ResponseTable extends BaseTable {
  public tableName: string = "responses";

  public columns: Record<ResponseColumns, DatabaseColumnType> = {
    uid: {
      name: "uid",
      type: "VARCHAR(255)",
      attributes: "",
    },

    requestUid: {
      name: "requestUid",
      type: "VARCHAR(255)",
      attributes: "",
    },

    masterKey: {
      name: "masterKey",
      type: "VARCHAR(255)",
      attributes: "",
    },

    data: {
      name: "data",
      type: "TEXT",
      attributes: "",
    },

    status: {
      name: "status",
      type: "INTEGER",
      attributes: "",
    },

    statusText: {
      name: "statusText",
      type: "VARCHAR(255)",
      attributes: "",
    },

    headers: {
      name: "headers",
      type: "TEXT",
      attributes: "",
    },

    createdAt: {
      name: "createdAt",
      type: "BIGINT",
      attributes: "",
    },
  };
}
