import type { AxiosRequestConfig } from "axios";
import type { UnwrapRef, Ref } from "vue";

export type UsePromiseStatus = "idle" | "pending" | "rejected" | "fulfilled";

export type UsePromiseCallback<R> = (payloads, configs) => Promise<R>;

export type UsePromiseResponse<R> = [
  Ref<UsePromiseStatus>,
  Ref<UnwrapRef<R> | null>,
  any,
  (payloads: P, configs?: AxiosRequestConfig) => Promise<void>,
  (isAbort?: boolean) => void,
  () => void,
];
