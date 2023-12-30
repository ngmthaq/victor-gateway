import type { AxiosRequestConfig } from "axios";
import type { UsePromiseCallbackType, UsePromiseResponseType, UsePromiseStatusType } from "@/configs/types/hooks";
import { ref } from "vue";
import { CanceledError } from "axios";

/**
 * Custom hook to handle API promise
 *
 * @param callback
 * @returns methods
 */
export function usePromise<R>(callback: UsePromiseCallbackType<R>): UsePromiseResponseType<R> {
  const abortController = ref<AbortController>(new AbortController());
  const data = ref<R | null>(null);
  const error = ref<any | null>(null);
  const status = ref<UsePromiseStatusType>("idle");

  async function fetch<P>(payloads: P, configs: AxiosRequestConfig = {}) {
    try {
      status.value = "pending";
      const response: any = await callback(payloads, { ...configs, signal: abortController.value.signal });
      if (window.electron.env.mode() === "development") console.log(response);
      data.value = response;
      error.value = null;
      status.value = "fulfilled";
    } catch (e: any) {
      if (window.electron.env.mode() === "development") console.error(e);
      if (e instanceof CanceledError) {
        status.value = "idle";
      } else {
        data.value = null;
        error.value = e;
        status.value = "rejected";
      }
    }
  }

  function abort() {
    abortController.value.abort();
    abortController.value = new AbortController();
  }

  function reset(isAbort = false) {
    if (isAbort) abort();
    data.value = null;
    error.value = null;
    status.value = "idle";
  }

  return [status, data, error, fetch, reset, abort];
}
