import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { isClient } from "../lib/next";

export const apiInstance = axios.create({
  baseURL: isClient() ? "/api" : process.env.BASE_API_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;
