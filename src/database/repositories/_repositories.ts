import { SettingRepo } from "./setting.repo";
import { VersionRepo } from "./version.repo";

const repositories = { VersionRepo: new VersionRepo(), SettingRepo: new SettingRepo() };

export default repositories;
