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
  isInternet: boolean;
};

export type ResponseColumns =
  | "uid"
  | "requestUid"
  | "masterKey"
  | "data"
  | "status"
  | "statusText"
  | "headers"
  | "createdAt";
export type Response = {
  uid: string;
  requestUid: string;
  masterKey: string;
  data: Record<string, string>;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  createdAt: number;
};

export type RequestColumns =
  | "uid"
  | "masterKey"
  | "name"
  | "url"
  | "method"
  | "headers"
  | "params"
  | "data"
  | "timeout"
  | "createdAt"
  | "updatedAt";
export type Request = {
  uid: string;
  masterKey: string;
  name: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  data: Record<string, string>;
  timeout: number;
  createdAt: number;
  updatedAt: number;
};
export type RequestWithResponse = Request & {
  response?: Response;
};
