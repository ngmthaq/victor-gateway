import { ResponseTable } from "../tables/response.table";
import { BaseRepo } from "./base.repo";

export class ResponseRepo extends BaseRepo {
  public Table: ResponseTable = new ResponseTable();
}
