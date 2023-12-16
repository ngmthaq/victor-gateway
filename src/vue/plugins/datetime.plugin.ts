import dayjs from "dayjs";

export function getCurrentDateTime(format: string) {
  return dayjs().format(format);
}

export function getCurrentISO8601() {
  return dayjs().format();
}

export function getCurrentYMD() {
  return dayjs().format("YYYY/MM/DD");
}

export function getCurrentDMY() {
  return dayjs().format("DD/MM/YYYY");
}

export function getCurrentYMDHIS() {
  return dayjs().format("YYYY/MM/DD HH:mm:ss");
}

export function getCurrentDMYHIS() {
  return dayjs().format("DD/MM/YYYY HH:mm:ss");
}

export function getCurrentHIS() {
  return dayjs().format("HH:mm:ss");
}

export function getCurrentMilliseconds() {
  return dayjs().valueOf();
}

export function getCurrentSeconds() {
  return dayjs().unix();
}

export function getLastDayOfCurrentMonth() {
  return dayjs().daysInMonth();
}
