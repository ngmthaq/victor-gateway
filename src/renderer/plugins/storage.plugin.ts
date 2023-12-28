import { name } from "~/package.json";

/**
 * Set localStorage item
 *
 * @see https://github.com/sindresorhus/electron-store?tab=readme-ov-file#electron-store
 * @param key
 * @param value
 * @returns any
 */
export async function setLocalStorage<T>(key: string, value: T): Promise<T | undefined> {
  try {
    key = `${name}:${key}`;
    await window.electron.localStorage.set(key, value);
    if (window.electron.env.mode() === "development") console.log("setLocalStorage", { key, value });
    return value;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Remove localStorage item
 *
 * @see https://github.com/sindresorhus/electron-store?tab=readme-ov-file#electron-store
 * @param key
 */
export async function removeLocalStorage(key: string) {
  key = `${name}:${key}`;
  await window.electron.localStorage.remove(key);
  if (window.electron.env.mode() === "development") console.log("removeLocalStorage", { key });
}

/**
 * Get localStorage item
 *
 * @see https://github.com/sindresorhus/electron-store?tab=readme-ov-file#electron-store
 * @param key
 * @returns any
 */
export async function getLocalStorage<T>(key: string): Promise<T | undefined> {
  key = `${name}:${key}`;
  const value: T = await window.electron.localStorage.get(key);
  if (window.electron.env.mode() === "development") console.log("getLocalStorage", { key, value });
  return value;
}
