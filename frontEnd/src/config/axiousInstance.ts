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
    const originalRequest = error.congif;
    const { status, data } = error.response;
    console.log("error in response", error);
    if (
      status === 401 &&
      data.errorCode === "INVALID_ACCCESS_TOKEN" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log("i am inside the wrong state ");
        await refreshTokenRequest();
        return API(originalRequest);
      } catch (refreshTokenError) {
        queryClient.clear();
        console.log("error in refresh token request", refreshTokenError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
