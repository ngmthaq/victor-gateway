import { app } from "electron";
import { DB_VERSION, DB_HELPERS } from "../configs";
import Repositories from "../repositories/all.repo";

export async function migrate() {
  try {
    // Begin Transaction
    await DB_HELPERS.begin();

    // Create table if not exist
    await Repositories.VersionRepo.Table.createTable();
    await Repositories.SettingRepo.Table.createTable();
    await Repositories.RequestRepo.Table.createTable();
    await Repositories.ResponseRepo.Table.createTable();

    // Migration Logic
    const currentDatabaseVersion = await Repositories.VersionRepo.getVersion();
    if (currentDatabaseVersion === undefined) {
      // Setup for new device
      await Repositories.VersionRepo.insertVersion(DB_VERSION);
    } else {
      // Setup for each new version
      await Repositories.VersionRepo.updateVersion(DB_VERSION);
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
