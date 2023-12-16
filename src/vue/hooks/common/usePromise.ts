import type { AxiosRequestConfig } from "axios";
import type { UsePromiseCallback, UsePromiseResponse, UsePromiseStatus } from "@/configs/types/hooks";
import { ref } from "vue";
import { CanceledError } from "axios";

export function usePromise<R>(callback: UsePromiseCallback<R>): UsePromiseResponse<R> {
  const abortController = ref<AbortController>(new AbortController());
  const data = ref<R | null>(null);
  const error = ref<any | null>(null);
  const status = ref<UsePromiseStatus>("idle");

  async function fetch<P>(payloads: P, configs: AxiosRequestConfig = {}) {
    try {
      status.value = "pending";
      const response: any = await callback(payloads, { ...configs, signal: abortController.value.signal });
      if (import.meta.env.DEV) console.log(response);
      data.value = response;
      error.value = null;
      status.value = "fulfilled";
    } catch (e: any) {
      if (import.meta.env.DEV) console.error(e);
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
