import { isJsonString } from "./str.plugin";

/**
 * Set localStorage item
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * @param key
 * @param value
 * @returns any
 */
export function setLocalStorage(key: string, value: any) {
  try {
    const ref = { value: value };
    localStorage.setItem(key, JSON.stringify(ref));
    return value;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Remove localStorage item
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * @param key
 */
export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}

/**
 * Get localStorage item
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * @param key
 * @returns any
 */
export function getLocalStorage<T>(key: string): T | undefined {
  const value: any = localStorage.getItem(key);
  if (value !== null && value !== undefined && isJsonString(value)) {
    const ref = JSON.parse(value);
    return ref.value;
  }
  return undefined;
}

/**
 * Set sessionStorage item
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 * @param key
 * @param value
 * @returns any
 */
export function setSessionStorage(key: string, value: any) {
  try {
    const ref = { value: value };
    sessionStorage.setItem(key, JSON.stringify(ref));
    return value;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Remove sessionStorage item
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 * @param key
 */
export function removeSessionStorage(key: string) {
  sessionStorage.removeItem(key);
}
