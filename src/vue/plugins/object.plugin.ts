import lodash from "lodash";

export function isEqual(object1: any, object2: any) {
  return lodash.isEqual(object1, object2);
}
