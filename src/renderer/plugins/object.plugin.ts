import lodash from "lodash";

/**
 * Check object is equal
 *
 * @param object1
 * @param object2
 * @returns boolean
 */
export function isEqual(object1: any, object2: any) {
  return lodash.isEqual(object1, object2);
}
