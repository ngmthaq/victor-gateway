import type { CookieAttributes } from "node_modules/@types/js-cookie";
import Cookie from "js-cookie";
import { isJsonString } from "./str.plugin";

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

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function getLocalStorage<T>(key: string, defaultValue?: T): T | undefined {
  const value: any = localStorage.getItem(key);
  if (value !== null && value !== undefined && isJsonString(value)) {
    const ref = JSON.parse(value);
    return ref.value;
  }
  return defaultValue || undefined;
}

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

export function removeSessionStorage(key: string) {
  sessionStorage.removeItem(key);
}

export function getSessionStorage<T>(key: string, defaultValue?: T): T | undefined {
  const value: any = sessionStorage.getItem(key);
  if (value !== null && value !== undefined && isJsonString(value)) {
    const ref = JSON.parse(value);
    return ref.value;
  }
  return defaultValue || undefined;
}

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

export function removeCookieStorage(key: string, options: CookieAttributes = { expires: 30 }) {
  Cookie.remove(key, options);
}

export function getCookieStorage<T>(key: string): T | undefined {
  const value: any = Cookie.get(key);
  if (value !== null && value !== undefined && isJsonString(value)) {
    const ref = JSON.parse(value);
    return ref.value;
  }
  return undefined;
}
