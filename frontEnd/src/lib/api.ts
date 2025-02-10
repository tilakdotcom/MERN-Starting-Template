import API from "@/config/axiousInstance";
import {
  LoginData,
  ResetPasswordData,
  SignupData,
} from "@/types/apiRequestTypes";
import { TSession } from "@/types/session";
import { Data } from "@/types/user";

export const loginRequest = async (data: LoginData) => {
  return API.post("/auth/login", data);
};

export const signupRequest = async (data: SignupData) => {
  return API.post("/auth/register", data);
};

export const verifyEmailRequest = async (code: string) => {
  return API.get(`/auth/verify-email/${code}`);
};

export const forgotPasswordRequest = async (email: string) => {
  return API.post("/auth/forgot-password", { email });
};

export const resetPasswordRequest = async (data: ResetPasswordData) => {
  return API.patch("/auth/reset-password", data);
};

export const logoutRequest = () => {
  return API.get("/auth/logout");
};

export const userRequest = ():Promise<Data> => {
  return API.get("/user");
};

export const sessionRequest = async (): Promise<TSession[]> => {
  return await API.get("/session");
};

export const deleteSessionRequest = async (id: string) => {
  return await API.delete(`/session/${id}`);
};
