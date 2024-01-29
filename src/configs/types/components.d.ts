export type ToastType = {
  id?: string;
  message: string;
  variant: "primary" | "warning" | "danger" | "success" | "info";
  status?: "idle" | "opened" | "closed";
};

export type NotificationPermissionType = {
  time: number;
  granted: boolean;
};

export type SystemThemeModeType = "light" | "dark";

export type AppTableHeaderType<H> = {
  key: H;
  title?: string;
  i18n?: string;
};

export type AppActionType<A> = {
  key: A;
  icon: string;
  title?: string;
  i18n?: string;
};

export type AppTableType<H, R, A> = {
  headers: AppTableHeaderType<H>[];
  rows: R[];
  actions?: AppActionType<A>[];
  wCheckbox?: boolean;
  wAddRow?: boolean;
  disable?: boolean;
};
