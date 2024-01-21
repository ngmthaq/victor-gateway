import { app } from "electron";
import { DB_VERSION, DB_HELPERS } from "../configs";
import { VersionRepo } from "../repositories/version.repo";
import { SettingRepo } from "../repositories/setting.repo";

export async function migrate() {
  try {
    // Begin Transaction
    await DB_HELPERS.begin();

    // Repositories
    const versionRepo = new VersionRepo();
    const settingRepo = new SettingRepo();

    // Create table if not exist
    await versionRepo.Table.createTable();
    await settingRepo.Table.createTable();

    // Migration Logic
    const currentDatabaseVersion = await versionRepo.getVersion();
    if (currentDatabaseVersion === undefined) {
      // Setup for new device
      await versionRepo.insertVersion(DB_VERSION);
    } else {
      // Setup for each new version
      await versionRepo.updateVersion(DB_VERSION);
    }

    // Commit Transaction
    await DB_HELPERS.commit();
  } catch (error) {
    // Rollback Transaction and Quit
    await DB_HELPERS.rollback();
    console.error(error);
    app.quit();
  }
}
