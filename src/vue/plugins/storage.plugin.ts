import type { CookieAttributes } from "node_modules/@types/js-cookie";
import Cookie from "js-cookie";
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

/**
 * Get sessionStorage item
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 * @param key
 * @returns any
 */
export function getSessionStorage<T>(key: string): T | undefined {
  const value: any = sessionStorage.getItem(key);
  if (value !== null && value !== undefined && isJsonString(value)) {
    const ref = JSON.parse(value);
    return ref.value;
  }
  return undefined;
}

/**
 * Set Cookies item using js-cookie
 *
 * @see https://github.com/js-cookie/js-cookie#readme
 * @param key
 * @param value
 * @param options
 * @returns any
 */
export function setCookieStorage(key: string, value: any, options: CookieAttributes = { expires: 30 }) {
  try {
    const ref = { value: value };
    Cookie.set(key, JSON.stringify(ref), options);
    return value;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Remove Cookies item using js-cookie
 *
 * @see https://github.com/js-cookie/js-cookie#readme
 * @param key
 * @param options
 */
export function removeCookieStorage(key: string, options: CookieAttributes = { expires: 30 }) {
  Cookie.remove(key, options);
}

/**
 * Get Cookies item using js-cookie
 *
 * @see https://github.com/js-cookie/js-cookie#readme
 * @param key
 * @returns any
 */
export function getCookieStorage<T>(key: string): T | undefined {
  const value: any = Cookie.get(key);
  if (value !== null && value !== undefined && isJsonString(value)) {
    const ref = JSON.parse(value);
    return ref.value;
  }
  return undefined;
}
