# Victor Desktop

## Requirement

1. Node.js [v18.16.1](https://nodejs.org/en/blog/release/v18.16.1) or later
2. Install Yarn global `npm install -g yarn`

## Scripts

Run Development:

```sh
yarn dev
```

Build For Production:

```sh
yarn build
```

Format & Lint:

```sh
yarn format && yarn lint
```

## For rebuild native deps (sqlite3)
1. Install the node-gyp global `npm install -g node-gyp`
2. Install latest [Visual Studio Community and Desktop Development](https://visualstudio.microsoft.com/vs/community/) with `C++ extension`
3. Install latest [Python](https://www.python.org/downloads/)
4. Using `npm config edit` then add 2 lines below in the end of file:
   - `npm config set msvs_version 2019`
   - `npm config set msbuild_path "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe"`

**NOTE**: If `npm config set` failed, using `npm config edit` then adding `msvs_version={version}` & `msbuild_path={path/to/file}` in the file. [See more](https://stackoverflow.com/questions/75647270/node-gyp-msvs-version-is-not-a-valid-npm-option).

**NOTE**: `msbuild_path` maybe not correct. You should check the location of `MSBuild.exe` file by yourself.

## Related

1. Electron Forge: https://www.electronforge.io/
2. Vite: https://vitejs.dev/guide/
3. Typescript: https://www.typescriptlang.org/docs/
4. Electron Forge + Vite + TypeScript Template: https://www.electronforge.io/templates/vite-+-typescript
5. Better-sqlite3 troubleshooting installation: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/troubleshooting.md
