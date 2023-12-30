import { VersionRepo } from "@/database/repositories/version.repo";

export const localDatabase = {
  versionRepo: new VersionRepo(),
};
