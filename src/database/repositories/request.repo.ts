import { RequestTable } from "../tables/request.table";
import { BaseRepo } from "./base.repo";

export class RequestRepo extends BaseRepo {
  public Table: RequestTable = new RequestTable();
}
