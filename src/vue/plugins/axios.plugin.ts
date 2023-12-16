import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import humps from "humps";

export class Api {
  protected instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || null,
      timeout: import.meta.env.VITE_API_TIMEOUT || 30000,
    });
  }

  protected async request(
    url: string,
    method: string,
    params: any = {},
    data: any = {},
    configs: AxiosRequestConfig = {},
  ) {
    params = typeof params === "object" ? humps.decamelizeKeys(params) : params;
    data = typeof data === "object" ? humps.decamelizeKeys(data) : data;
    const requestConfigs: AxiosRequestConfig = { ...configs, url, method, params, data };
    const response = await this.instance.request(requestConfigs);
    response.data = typeof data === "object" ? humps.camelizeKeys(response.data) : response.data;
    return response;
  }

  public async get(url: string, params: any = {}, configs: AxiosRequestConfig = {}) {
    return this.request(url, "get".toUpperCase(), params, {}, configs);
  }

  public async post(url: string, data: any = {}, configs: AxiosRequestConfig = {}) {
    return this.request(url, "post".toUpperCase(), {}, data, configs);
  }

  public async put(url: string, data: any = {}, configs: AxiosRequestConfig = {}) {
    return this.request(url, "put".toUpperCase(), {}, data, configs);
  }

  public async patch(url: string, data: any = {}, configs: AxiosRequestConfig = {}) {
    return this.request(url, "patch".toUpperCase(), {}, data, configs);
  }

  public async delete(url: string, data: any = {}, configs: AxiosRequestConfig = {}) {
    return this.request(url, "delete".toUpperCase(), {}, data, configs);
  }

  public default() {
    this.instance.interceptors.request.clear();
    this.instance.interceptors.response.clear();
    this.instance.interceptors.request.use(
      (configs) => this.handleDefaultRequestSuccess(configs),
      (error) => this.handleDefaultRequestError(error),
    );
    this.instance.interceptors.response.use(
      (response) => this.handleDefaultResponseSuccess(response),
      (error) => this.handleDefaultResponseError(error),
    );
    return this;
  }

  protected handleDefaultRequestSuccess<C>(configs: InternalAxiosRequestConfig<C>) {
    return configs;
  }

  protected handleDefaultRequestError<C>(error: C) {
    return Promise.reject(error);
  }

  protected handleDefaultResponseSuccess(response: AxiosResponse) {
    return response;
  }

  protected handleDefaultResponseError(error: any) {
    return Promise.reject(error);
  }
}

export const api = new Api();
