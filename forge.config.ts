import type { ForgeConfig } from "@electron-forge/shared-types";
import path from "path";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { VitePlugin } from "@electron-forge/plugin-vite";
import { PublisherGithub } from "@electron-forge/publisher-github";
import { productName, name } from "./package.json";

const icon = path.resolve(__dirname, "./src/assets/img/app-icon");
const icoIcon = path.resolve(__dirname, "./src/assets/img/app-icon.ico");
const pngIcon = path.resolve(__dirname, "./src/assets/img/app-icon.png");
const icnsIcon = path.resolve(__dirname, "./src/assets/img/app-icon.icns");

const config: ForgeConfig = {
  packagerConfig: {
    icon: icon,
    protocols: [
      {
        name: productName,
        schemes: [name],
      },
    ],
  },
  rebuildConfig: {
    force: true,
  },
  makers: [
    new MakerZIP({}, ["darwin"]),
    new MakerSquirrel({
      setupIcon: icoIcon,
    }),
    new MakerDMG({
      icon: icnsIcon,
    }),
    new MakerRpm({
      options: {
        icon: pngIcon,
      },
    }),
    new MakerDeb({
      options: {
        icon: pngIcon,
        mimeType: ["x-scheme-handler/" + name],
      },
    }),
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "src/main/index.ts",
          config: "vite.main.config.ts",
        },
        {
          entry: "src/main/preload.ts",
          config: "vite.preload.config.ts",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),
  ],
  publishers: [
    new PublisherGithub({
      repository: {
        owner: "ngmthaq",
        name: "vue-electron",
      },
    }),
  ],
};

export default config;
