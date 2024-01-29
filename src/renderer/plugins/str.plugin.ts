/**
 * Get random string
 *
 * @param length
 * @returns string
 */
export function randomStr(length: number): string {
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
export function generateUUID(): string {
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

/**
 * Convert search params string to object
 *
 * @param urlSearchParams
 * @returns
 */
export function convertSearchParamStringToObject(urlSearchParams: string): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(urlSearchParams).entries());
}

/**
 * Convert search params string to array
 *
 * @param urlSearchParams
 * @returns
 */
export function convertSearchParamStringToArray(urlSearchParams: string): Array<{ key: string; value: string }> {
  const params = convertSearchParamStringToObject(urlSearchParams);
  return Object.entries(params).map(([key, value]) => ({ key, value }));
}

/**
 * Convert search param object to string
 *
 * @param urlSearchParams
 * @returns
 */
export function convertSearchParamObjectToString(urlSearchParams: Record<string, string>): string {
  return new URLSearchParams(urlSearchParams).toString();
}

/**
 * Convert search param array to string
 *
 * @param urlSearchParams
 * @returns
 */
export function convertSearchParamArrayToString(urlSearchParams: Array<{ key: string; value: string }>): string {
  return new URLSearchParams(
    urlSearchParams.reduce((paramObject: any, currentParam) => {
      paramObject[currentParam.key] = currentParam.value;
      return paramObject;
    }, {}),
  ).toString();
}
