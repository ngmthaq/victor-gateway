export type DatabaseColumnType = {
  name: string;
  type: string;
  attributes: string;
};

export type VersionColumns = "version";
export type Version = {
  version: number;
};

export type SettingColumns = "username" | "password" | "personalKey" | "isInternet";
export type Setting = {
  username: string;
  password: string;
  personalKey: string;
};
