import { app } from "electron";
import { DATABASE_VERSION, beginTransaction, commitTransaction, rollbackTransaction } from "../configs";
import { VersionRepo } from "../repositories/version.repo";

export async function migrate() {
  try {
    // Begin Transaction
    beginTransaction();

    // Repositories
    const versionRepo = new VersionRepo();

    // Create version table if not exist
    await versionRepo.Table.createTable();

    // Migration Logic
    const currentDatabaseVersion = await versionRepo.getVersion();
    if (currentDatabaseVersion === undefined) {
      // Setup for new device
      await versionRepo.setVersion(DATABASE_VERSION);
    } else {
      // Setup for each new version
      await versionRepo.updateVersion(DATABASE_VERSION);
    }

    // Commit
    commitTransaction();
  } catch (error) {
    // Rollback and Quit
    rollbackTransaction();
    console.error(error);
    app.quit();
  }
}
