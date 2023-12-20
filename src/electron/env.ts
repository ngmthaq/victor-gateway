import { app, dialog } from "electron";
import dotenv from "dotenv";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { productName } from "~/package.json";

// Config dotenv
(async () => {
  try {
    const inputEnv = path.resolve(__dirname, "../../.env");
    const envBuffer = await readFile(inputEnv);
    const env = dotenv.parse(envBuffer);
    process.env = { ...process.env, ...env };
  } catch (error) {
    console.error(".env error", error);
    dialog.showErrorBox(productName, error?.message);
    app.quit();
  }
})();
