import type { AxiosRequestConfig } from "axios";
import type { UnwrapRef, Ref } from "vue";

export type UsePromiseStatusType = "idle" | "pending" | "rejected" | "fulfilled";

export type UsePromiseCallbackType<R> = (payloads, configs) => Promise<R>;

export type UsePromiseResponseType<R> = [
  Ref<UsePromiseStatusType>,
  Ref<UnwrapRef<R> | null>,
  any,
  (payloads: P, configs?: AxiosRequestConfig) => Promise<void>,
  (isAbort?: boolean) => void,
  () => void,
];
