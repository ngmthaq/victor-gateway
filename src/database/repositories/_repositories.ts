import { RequestRepo } from "./request.repo";
import { ResponseRepo } from "./response.repo";
import { SettingRepo } from "./setting.repo";
import { VersionRepo } from "./version.repo";

const repositories = {
  VersionRepo: new VersionRepo(),
  SettingRepo: new SettingRepo(),
  RequestRepo: new RequestRepo(),
  ResponseRepo: new ResponseRepo(),
};

export default repositories;
