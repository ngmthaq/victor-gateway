import type { DatabaseColumnType, RequestColumns } from "@/configs/types/database";
import { BaseTable } from "./base.table";

export class RequestTable extends BaseTable {
  public tableName: string = "requests";

  public columns: Record<RequestColumns, DatabaseColumnType> = {
    uid: {
      name: "uid",
      type: "VARCHAR(255)",
      attributes: "",
    },

    masterKey: {
      name: "masterKey",
      type: "VARCHAR(255)",
      attributes: "",
    },

    name: {
      name: "name",
      type: "VARCHAR(255)",
      attributes: "",
    },

    url: {
      name: "url",
      type: "TEXT",
      attributes: "",
    },

    method: {
      name: "method",
      type: "VARCHAR(10)",
      attributes: "",
    },

    headers: {
      name: "headers",
      type: "TEXT",
      attributes: "",
    },

    params: {
      name: "params",
      type: "TEXT",
      attributes: "",
    },

    data: {
      name: "data",
      type: "TEXT",
      attributes: "",
    },

    timeout: {
      name: "timeout",
      type: "INTEGER",
      attributes: "",
    },

    createdAt: {
      name: "createdAt",
      type: "BIGINT",
      attributes: "",
    },

    updatedAt: {
      name: "updatedAt",
      type: "BIGINT",
      attributes: "",
    },
  };
}
