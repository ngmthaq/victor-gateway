import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import humps from "humps";
import { getLocalStorage } from "./storage.plugin";
import { LOCAL_STORAGE_KEYS } from "@/configs/constants/app.const";

/**
 * Api logic base on Axios
 */
export class Api {
  protected instance: AxiosInstance;

  public constructor() {
    this.getInstance();
  }

  protected async getInstance() {
    const baseURL = await window.electron.env.get("ELECTRON_PUBLIC_API_BASE_URL");
    const timeout = await window.electron.env.get("ELECTRON_PUBLIC_API_TIMEOUT");
    this.instance = axios.create({ baseURL: baseURL || null, timeout: parseInt(timeout || "30000") });
  }

  /**
   * Handle default request success interceptor
   *
   * @param {InternalAxiosRequestConfig} configs
   * @returns configs
   */
  protected async handleDefaultRequestSuccess<C>(configs: InternalAxiosRequestConfig<C>) {
    const accessToken = await getLocalStorage<string>(LOCAL_STORAGE_KEYS.accessToken);
    if (accessToken) configs.headers.Authorization = "Bearer " + accessToken;
    return configs;
  }

  /**
   * Handle default request error interceptor
   *
   * @param {any} error
   * @returns error
   */
  protected handleDefaultRequestError<C>(error: C) {
    return Promise.reject(error);
  }

  /**
   * Handle default response success interceptor
   *
   * @param {AxiosResponse} response
   * @returns response
   */
  protected handleDefaultResponseSuccess(response: AxiosResponse) {
    return response;
  }

  /**
   * Handle toCamel response success interceptor
   *
   * @param {AxiosResponse} response
   * @returns response
   */
  protected handleToCamelResponseSuccess(response: AxiosResponse) {
    if (typeof response.data === "object") response.data = humps.camelizeKeys(response.data);
    return response;
  }

  /**
   * Handle default response error interceptor
   *
   * @param {any} error
   * @returns error
   */
  protected handleDefaultResponseError(error: any) {
    return Promise.reject(error);
  }

  /**
   * Common API request logic
   *
   * @param url
   * @param method
   * @param params
   * @param data
   * @param configs
   * @returns response
   */
  protected async request(
    url: string,
    method: string,
    params: any = {},
    data: any = {},
    configs: AxiosRequestConfig = {},
  ) {
    const requestConfigs: AxiosRequestConfig = { ...configs, url, method, params, data };
    const response = await this.instance.request(requestConfigs);
    return response;
  }

  /**
   * Request with GET method
   *
   * @param url
   * @param params
   * @param configs
   * @returns response
   */
  public async get(url: string, params: any = {}, configs: AxiosRequestConfig = {}) {
    return this.request(url, "get".toUpperCase(), params, {}, configs);
  }

  /**
   * Request with POST method
   *
   * @param url
   * @param data
   * @param configs
   * @returns response
   */
  public async post(url: string, data: any = {}, configs: AxiosRequestConfig = {}) {
    return this.request(url, "post".toUpperCase(), {}, data, configs);
  }

  /**
   * Request with PUT method
   *
   * @param url
   * @param data
   * @param configs
   * @returns response
   */
  public async put(url: string, data: any = {}, configs: AxiosRequestConfig = {}) {
    return this.request(url, "put".toUpperCase(), {}, data, configs);
  }

  /**
   * Request with PATCH method
   *
   * @param url
   * @param data
   * @param configs
   * @returns response
   */
  public async patch(url: string, data: any = {}, configs: AxiosRequestConfig = {}) {
    return this.request(url, "patch".toUpperCase(), {}, data, configs);
  }

  /**
   * Request with DELETE method
   *
   * @param url
   * @param data
   * @param configs
   * @returns response
   */
  public async delete(url: string, data: any = {}, configs: AxiosRequestConfig = {}) {
    return this.request(url, "delete".toUpperCase(), {}, data, configs);
  }

  /**
   * Default interceptors
   *
   * @returns this
   */
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

  /**
   * toCamel interceptors
   *
   * @returns this
   */
  public toCamel() {
    this.instance.interceptors.request.clear();
    this.instance.interceptors.response.clear();
    this.instance.interceptors.request.use(
      (configs) => this.handleDefaultRequestSuccess(configs),
      (error) => this.handleDefaultRequestError(error),
    );
    this.instance.interceptors.response.use(
      (response) => this.handleToCamelResponseSuccess(response),
      (error) => this.handleDefaultResponseError(error),
    );
    return this;
  }
}

export const api = new Api();
