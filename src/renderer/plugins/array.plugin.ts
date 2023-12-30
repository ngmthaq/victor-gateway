/**
 * Create an array numbers
 *
 * @param number
 * @returns {Array<number>}
 */
export function createArrayFromNumber(number: number): Array<number> {
  const output = [];
  for (let index = 0; index < number; index++) {
    output.push(index);
  }
  return output;
}
