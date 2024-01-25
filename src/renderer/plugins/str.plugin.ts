/**
 * Get random string
 *
 * @param length
 * @returns string
 */
export function randomStr(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

/**
 * Check is JSON string
 *
 * @param string
 * @returns boolean
 */
export function isJsonString(string: any): boolean {
  try {
    JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Generate UUID
 *
 * @returns string
 */
export function generateUUID() {
  // Timestamp
  let d = new Date().getTime();
  // Time in microseconds since page-load or 0 if unsupported
  let d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    // Random number between 0 and 16
    let r = Math.random() * 16;
    if (d > 0) {
      // Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      // Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function convertSearchParamStringToObject(urlSearchParams: string) {
  return Object.fromEntries(new URLSearchParams(urlSearchParams).entries());
}

export function convertSearchParamObjectToString(urlSearchParams: Record<string, string>) {
  return new URLSearchParams(urlSearchParams).toString();
}
