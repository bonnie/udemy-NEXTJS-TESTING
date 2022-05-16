import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {};
export const baseURL =
  process.env.NODE_ENV === "test"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL;

config.baseURL = baseURL;

export const axiosInstance = axios.create(config);
