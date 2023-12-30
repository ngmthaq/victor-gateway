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
