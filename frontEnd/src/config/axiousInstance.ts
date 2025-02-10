import axios, { AxiosInstance } from "axios";
import queryClient from "./queryClient";
import { refreshTokenRequest } from "@/lib/api";

const URI = import.meta.env.VITE_BACKEND_URI;

if (!URI) {
  throw new Error("Missing VITE_BACKEND_URI environment variable");
}

const options = {
  baseURL: URI,
  withCredentials: true,
};

const API: AxiosInstance = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  async function (error) {
    if (!error.response) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;

    const { status, data } = error.response;
    if (
      status === 401 &&
      data.errorCode === "INVALID_ACCCESS_TOKEN" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshTokenRequest();
        return API(originalRequest);
      } catch (refreshTokenError) {
        queryClient.clear();
        throw refreshTokenError;
      }
    }
    return Promise.reject(error);
  }
);

export default API;
