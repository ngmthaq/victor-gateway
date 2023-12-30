import dayjs from "dayjs";

/**
 * Get current datetime
 *
 * @param format
 * @returns string
 */
export function getCurrentDateTime(format: string) {
  return dayjs().format(format);
}

/**
 * Get current datetime in ISO8601 format
 *
 * @returns string
 */
export function getCurrentISO8601() {
  return dayjs().format();
}

/**
 * Get current date in YYYY/MM/DD format
 *
 * @returns string
 */
export function getCurrentYMD() {
  return dayjs().format("YYYY/MM/DD");
}

/**
 * Get current date in DD/MM/YYYY format
 *
 * @returns string
 */
export function getCurrentDMY() {
  return dayjs().format("DD/MM/YYYY");
}

/**
 * Get current datetime in YYYY/MM/DD HH:mm:ss format
 *
 * @returns string
 */
export function getCurrentYMDHIS() {
  return dayjs().format("YYYY/MM/DD HH:mm:ss");
}

/**
 * Get current datetime in DD/MM/YYYY HH:mm:ss format
 *
 * @returns string
 */
export function getCurrentDMYHIS() {
  return dayjs().format("DD/MM/YYYY HH:mm:ss");
}

/**
 * Get current time in HH:mm:ss format
 *
 * @returns string
 */
export function getCurrentHIS() {
  return dayjs().format("HH:mm:ss");
}

/**
 * Get current time in milliseconds
 *
 * @returns number
 */
export function getCurrentMilliseconds() {
  return dayjs().valueOf();
}

/**
 * Get current time in seconds
 *
 * @returns number
 */
export function getCurrentSeconds() {
  return dayjs().unix();
}

/**
 * Get last day of current month
 *
 * @returns number
 */
export function getLastDayOfCurrentMonth() {
  return dayjs().daysInMonth();
}
